---
title: 'Cricket: Late-Binding to COM Components'
date: 2006-08-32T16:48:00
state: archived
type: essay
format: instructional
category: open source
---

{% lead-in %}I haven't posted any updates{% /lead-in %} for awhile... things have been a whirlwind for the past couple of weeks. I've switched jobs, and am now working at [Merge eMed](http://www.merge-emed.com/), a software company that specializes in radiology software. I left CTI for various reasons, but it was definitely the right time to move on, and I'm excited about my new position with Merge.

Instead of blogging, I've been spending my nights (to the frustration of my wife!) working on **Cricket**, a library written in C# 2.0 that leverages the .NET remoting layer to allow dynamic late-binding to COM components. It's based on [an idea by Omar al Zabir](http://www.codeproject.com/csharp/safecomwrapper.asp), which I've re-implemented and extended a bit. The concept is excellent, and I hope with some work I can turn it into a solid open-source project.

The basic reason for Cricket's existence is that the interop facilities in .NET, while impressive, are a bit lacking. Your code can only communicate with native COM components via a runtime-callable wrapper (RCW), which lives in an interop assembly (IA). Even if the interfaces you're using on the COM components are the same for all versions of the application, the IA is still version-specific. Anyone that's ever tried to write managed code that interops with Microsoft Office will feel my pain; for example, if you want to write code that will work against Office 2000 and later, you have to actually install Office 2000 on your development machine and code against it. If you write against an IA generated against the COM libraries of Office 2003, it won't work on any earlier versions, even if you sign a waiver that says you promise to only use the functionality provided by the earlier versions, or if you sacrifice a goat to the dark COM overlords.

Another problem with interop is the inability to use the [Dispose Pattern](http://thecoadletter.com/article/0,1410,29365,00.html) to free the unmanaged COM resources without introducing some sort of managing object or shim. This can lead to really irritating problems. For example, if you interop with Microsoft Excel, but you forget to call `Marshal.FinalReleaseComObject()` to reset the CLR's reference count to zero, you'll create a "zombified" Excel process that refuses to die even if you offer to let it eat the brains of your company's entire marketing department. The only "real" solution is to wrap the COM objects in a shim class that implements `IDisposable` and releases the COM references in its `Dispose()` method. This leads to a whole bunch of `using` blocks and a lot of ugly code.

Cricket fixes these problems by extending the mind-bending [RealProxy](http://msdn2.microsoft.com/en-us/library/system.runtime.remoting.proxies.realproxy.aspx) class to create a customized proxy class that intercepts method calls sent to COM objects. More information will be coming once I release Cricket upon an unsuspecting public, but for now if you'd like to know more I encourage you to read Omar's Code Project article and snag his source code to take a closer look.

Within a few days, I plan to release an alpha version of the library as open-source --- probably LGPL, but maybe something more trendy. :) My next task is to replace the reliance on the remoting layer with a code-generation framework based on SRE (`System.Reflection.Emit`) --- particularly for easier support for COM events. Right now, you have to write a custom event sink for each class which implements the COM event interface that you want to work with, and you have to muck with proxying the arguments to the events and so forth. It works, but it could be much simpler if I can get it to gen the code on-the-fly.
