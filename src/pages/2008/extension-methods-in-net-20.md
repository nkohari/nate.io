---
title: Extension Methods in .NET 2.0
subtitle: A quick hack if you can't use .NET 3.5 yet.
date: 2008-04-05 17:25:00
category: dotnet
---

<span class='drop-cap'>One of my favorite</span> new features of C# 3.0 are extension methods. However, for some projects I'm not willing or able to target version 3.5 of the .NET framework. Up until today I thought that this meant I was out of luck in terms of being able to use extension methods, until [Scott Hanselman's post](http://www.hanselman.com/blog/HowDoExtensionMethodsWorkAndWhyWasANewCLRNotRequired.aspx) about them got the gears turning in my head.

If you try to add an extension method in a project that targets version 2.0 of the .NET framework, you'll get an error saying you have to reference `System.Core`. However, the error is misleading. Extension methods are just normal static methods tagged with the `[Extension]` attribute. This attribute is actually just added by the compiler behind the scenes. In .NET 3.5, it lives in System.Core, but if you define your own attribute like this:

```csharp
namespace System.Runtime.CompilerServices
{
  [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = false)]
  public class ExtensionAttribute : Attribute
  {
  }
}
```

Your extension methods will suddenly spring to life! After testing, I realized I'm [not the first one](http://www.codethinked.com/post/2008/02/Using-Extension-Methods-in-net-20.aspx) to figure this out, but it's definitely something I'll keep in my bag of tricks.
