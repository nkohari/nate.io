---
title: Interop Insanity
date: 2006-07-28 19:48:00
category: dotnet
---

<span class='drop-cap'>One of the projects</span> I'm currently working on is a WinForms application which interacts with some ActiveX controls via COM interop. One of the requirements of the WinForms app is that it be able to export the current view from the ActiveX controls to Microsoft Excel. So, no problem... each of the ActiveX controls has a method on it which copies the current view to the clipboard, and then via the Microsoft Office Interop libraries, I paste the information into a spreadsheet. Except one of the ActiveX controls doesn't have the copy-to-clipboard functionality. Fortunately, it does have a function that creates an EMF image file on disk. No problem, I figured... I'll just write a method in my .NET application that uses the ActiveX control to create a temporary EMF file, then loads it from disk and copies it to the clipboard.

I scribbled in the 10 lines or so of code required to execute this workaround, fired up the debugger, and clicked the export button. Instead of a shiny Excel worksheet, I was presented with an exception:

> Current thread must be set to single thread apartment (STA) mode before OLE calls can be made. Ensure that your Main function has `STAThreadAttribute` marked on it.

Crap. So what's going on here? The secret is that the `Clipboard` class in .NET still requires COM interop to execute the OLE call necessary to move information to the Windows clipboard. I didn't see this problem when calling the copy-to-clipboard functions on the ActiveX controls, since they were written in unmanaged code and didn't need to cross any managed/unmanaged boundary to deal with OLE. What confused me is that my entire application is designed to work with COM interop anyway, so I'd already set it to run in single thread apartment mode. What's the problem?

After some digging, I found [an article on C# Corner](http://www.c-sharpcorner.com/UploadFile/Ashish1/ThreadPool11052005132510PM/ThreadPool.aspx?ArticleID=a6242284-28a0-4029-911d-da59e5e86b62) that contained a line that I really didn't want to see:

> ...all `ThreadPool` threads are in the multithreaded apartment...

Double crap. In accordance with good interface design strategies, the Excel export feature is done in the background using a ThreadPool worker thread. Using the `ThreadPool` is a great low-effort way of spawning background processes, but I'd designed myself into a corner on this one. You can't (or at least Thou Shalt Not) change the information on a `ThreadPool` thread, since technically you don't own them, and they can be reused. And, since some exports take several seconds to run, I couldn't execute the Excel export code in the interface thread without hanging it for a long period of time.

So, in the end, I worked around it by using `Control.Invoke()` to call the function that does the actual copy-to-clipboard work from the background worker thread. Usually, this call is used to avoid violating the One Rule (Thou Shalt Not update an interface via any thread other than the thread that created it). However, this use allows me to interop with the ActiveX component from inside the STA thread -- while still running the bulk of the export code in the background. This lets me keep the interface responsive and lets the cancel button work, but let me escape re-writing my thread model.