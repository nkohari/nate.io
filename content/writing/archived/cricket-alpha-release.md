---
title: Cricket Alpha Release!
date: 2006-09-12T14:43:00
state: archived
type: instructional
category: open source
---

<span class="drop-cap">I set up</span> a [Subversion repository](http://svn.enkari.com/cricket/) for Cricket, my open-source (LGPL) library which allows late-binding to COM components. I've made some significant changes since the last time I blogged about it (some of which don't work), and I figured I might as well make it public in the hopes that I can get some useful feedback. (And maybe someone can tell me why native code can't seem to make calls on SRE-generated managed code, even when it's marked `ComVisible`?)

So what the hell _is_ it? Honestly, that's not an easy question to answer, and even a more difficult answer to understand if you haven't felt the pain of writing managed .NET code that interoperates with old legacy components. As I discussed in my [last post about Cricket](/2006/cricket-late-binding-to-com-components), the library exists for two primary reasons, which I'll go into deeper detail about now.

## Version Skew

Traditional early-bound COM interop requires the generation of an _interop assembly_ (IA) which houses the definition of a _runtime callable wrapper_ (RCW). The RCW exposes a managed interface to the native object, and marshals the information between managed an unmanaged code seamlessly. Visual Studio (or tlbimp.exe) is capable of reading the type library definition file (TLB) of the COM component and automagically spitting out the IA. Sounds great, right? Actually, 90% of the time it works fine, and is a very clean solution.

The further you move from the beaten path, though, the darker the clouds get. It starts when you write a killer .NET application that interops with Microsoft Excel to create [buzzword bingo](http://en.wikipedia.org/wiki/Buzzword_bingo) cards to use in meetings. You send it to all your friends in the office, and they love it. Then, being the altruistic individual that you are, you decide to better the world and release your application upon an unsuspecting public. Word gets around, you get dugg, and a bajillion copies of your app are downloaded. That's when the fun stops. See, you wrote your application against the Office 2003 interop assemblies, and it doesn't work if the user has any other version installed. If your end-user works in a backwards company that hasn't upgraded software since 2000 (probably where buzzword bingo would be more likely to be played), they'll get an unfriendly crash message instead of a hilarious bingo card.

Because of all the problems Microsoft ran into with [DLL hell](http://en.wikipedia.org/wiki/Dll_hell), they created .NET to be very version-aware. As a result, the version of an object is _actually part of its name_, and an object of version 1.0 is **not** the same as an object of version 1.1, even if the API is exactly the same. (Actually, if you generate two different interop assemblies from the same COM library, the classes in the IAs are not compatible, even though their definitions are exactly the same. This leads to "solutions" like Microsoft's evil, evil Office XP Primary Interop Assemblies, which require that if you want .NET interoperability with Office XP, you just run this batch file which stuffs a bunch of assemblies into your GAC, and sacrifice 3 virgins on an onyx altar, and the Dark Lords of Unmanaged Code will allow you to speak to their domain. But I digress!) Microsoft's actual suggested solution to this problem (I kid you not) is to install the earliest version of Office that you want to support on your development machine and build against it. The theory is that the Microsoft-released PIAs will be backward-compatible... except no PIAs exist for versions before Office XP. If you want to support anything earlier, there's no way to do it unless you _release a version of your program specific to each version of Office_. Since you have to have the actual version of Office installed to build against it, this (you guessed it) requires one development machine for each version of Office you want to support. Blech.

## Disposal? We Don't Have No Stinking Disposal

The .NET framework supports garbage collection, which means that objects don't need to be explicitly destroyed when an application is finished with them. It also means that there's no deterministic way to know when an object will be cleaned up. This generally isn't _too_ big of a hassle when you're only dealing with managed code, but when you start crossing the dreaded interop boundary you can get into some serious trouble. For example, check out the following code written against Excel 2003's PIAs:

```csharp
using Microsoft.Office.Interop.Excel;

public static void Main(string[] args)
{
  ApplicationClass excel;
  Workbook workbook;
  Worksheet sheet;

  // Create an instance of Excel.
  excel = new ApplicationClass();

  // Create a new workbook, with a new sheet.
  workbook = excel.Workbooks.Add(Missing.Value);
  sheet = workbook.Sheets.Add(Missing.Value, Missing.Value, Missing.Value, Missing.Value);

  // Set some range values.
  sheet.get_Range("A1", "A1").set_Value(Missing.Type, "=B1");

  // Give the user control of the Excel process and exit.
  excel.Visible = excel.UserControl = true;
}
```

Looks okay, right? Wrong. If your program crashes before it exits, the COM references won't be cleaned up properly. To really ensure that the unmanaged resources are cleaned up correctly, you have to call the static method `Marshal.FinalReleaseComObject()` (or loop over `Marshal.ReleaseComObject()` in 1.1) in order to set the reference count to zero and signify that the object has been released. If you don't do that, and your program terminates "uncleanly", the Excel process won't follow suit --- it will get zombified and will hang around forever waiting for its references to be released.

Normally, in this case the best practice is related to something called the _Dispose Pattern_, which provides deterministic destruction of classes that handle unmanaged resources. It involves implementing an interface called `IDisposable` which provides a standardized means for releasing resources. I won't go into further detail about this here; [Google it](http://www.google.com/search?q=dispose+pattern) if you're not familiar. Unfortunately, your IA was auto-generated, and it has to mimic the native component exactly. That means you can't implement the `IDisposable` interface on your COM references, so you're still stuck with manually calling a `Marshal` method to release your references. This also means that you're out of luck when it comes to syntactical sugar like `using {}` blocks and the like.

Instead, the cleanest way to get this to work is to create a bunch of wrapper classes that handle the disposal. Unfortunately, when you write `sheet.get_Range().set_Value()`, you're actually creating a native `Range` object, which has to be released. This means that you have to start writing your C# like you wrote C++, defining everything as a local variable and with `Marshal` calls being equivalent to `delete` statements.

## Cricket: A Solution to a Real Problem

The Cricket library solves these problems in traditional COM interop. As I've mentioned before (and will continue to mention, because credit is very much due), it's based on a fantastic [CodeProject article](http://www.codeproject.com/csharp/safecomwrapper.asp) created by Omar al Zabir with help on COM event support from Richard Deeming. I've re-implemented it to make it (in my opinion) more usable, and have ported it to C# 2.0. Cricket allows you to develop against _any version_ of a COM component as long as you only interact with the interface that is available on the version that is actually available at run-time. It accomplishes this through _late binding_, which defines only the interface that will be used at compile-time, and defers determining which actual objects will be operated on until run-time. Cricket also automatically implements `IDisposable` on all of your native objects, allowing you to release their references simply by calling `Dispose()`, or through sugary goodness like `using {}` blocks. (It also allows you to be lazy and not clean anything up, and it will release any outstanding references when the COM objects are _finalized_, or actually destroyed by the garbage collector.)

To use Cricket, you first define an _actor interface_ for your COM component. This interface must define some subset of the API of the COM component that you want to interop with. The actor interface is decorated with an attribute that defines the version-independent progid of the COM component it represents. Then, in your managed code, you make a call to `ComActivator.CreateInstance()` to instantiate your COM component, and work with it using the methods available in the actor interface. Here is same code written above, but using Cricket. (Note: this assumes the use of the actor interfaces defined in the `Enkari.Cricket.Office.Excel` namespace, which define a very small subset of Excel's actual functionality --- just enough for testing. I will be fully implementing it as time permits, but you can use your own interface definitions just as easily.)

```csharp
using Enkari.Cricket;
using Enkari.Cricket.Office.Excel;

public static void Main(string[] args)
{
  ExcelApplication excel;
  Workbook workbook;
  Worksheet sheet;

  // Create an instance of Excel.
  excel = ComActivator.CreateInstance<ExcelApplication>();

  // Create a new workbook, with a new sheet.
  workbook = excel.Workbooks.Add(Missing.Value);
  sheet = workbook.Sheets.Add(Missing.Value, Missing.Value, Missing.Value, Missing.Value);

  // Set some range values.
  sheet["A1", "A1"].SetValue(Type.Missing, "=B1");

  // Give the user control of the Excel process and exit.
  excel.Visible = excel.UserControl = true;

  // I can dispose the objects when I'm done with them, or let the finalizer deal with it instead.
  excel.Dispose();
}
```

As you can see, the code is very similar to the PIA example, except for the `ComActivator` call instead of the direct constructor call. The types I'm working with, `ExcelApplication`, `Workbook`, `Worksheet`, etc. are defined as interfaces implementing `IComActor`. The `ExcelApplication` interface is decorated with a `ReflectProgIdAttribute`, like this:

```csharp
namespace Enkari.Cricket.Office.Excel
{
  [ReflectProgId("Excel.Application")]
  public interface ExcelApplication : IComActor, IExcelEvents
  {
     // ...
  }
}
```

The string "Excel.Application" defines the _version-independent progid_ of Microsoft Excel. During the call to `ComActivator.CreateInstance()`, the library makes a call to `Type.GetTypeFromProgId()` to resolve the actual COM type that should be instantiated. This allows your .NET application to bind against any COM object that implements the defined interface, no matter what version.

More formalized documentation for Cricket is coming soon. In the meantime, grab the latest code [from subversion](http://svn.enkari.com/cricket) and have a look around. Feel free to email me with questions. Be forewarned, COM events don't work in the current build... I'm still trying to get the new SRE dynamic implementation of the event sinks to work. (If you know why they don't, please save me the hassle of figuring it out and tell me! :)
