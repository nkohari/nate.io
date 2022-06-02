---
title: Error Messages and the "Try Again Later" Syndrome
date: 2007-08-25T22:03:00
state: archived
type: instructional
category: dotnet
---

{% lead-in %}When your application communicates with the user{% /lead-in %}, it should do so in a way that is helpful. One of the most important times that software communicates with the user is when an error occurs. This can be a very delicate situation, because the user is unlikely to be pleased that their request was denied. There is an art to error messages that is sadly lacking in most software.

Error messages should never:

1. Give too little information.
2. Give too much information, unnecessarily confusing the user.
3. Provide no solution to the problem.
4. Make the user so angry that he/she smashes the monitor.

For example, take this, one of my favorite error message from Windows XP:

{% image src="try-again-later.webp" alt="A screenshot of a dialog from Windows explaining that a USB device can't be ejected and to try again later" /%}

I see this message about 50% of the time when I try to "safely remove" my portable WD Passport hard drive. Every time I see this message, it makes me want to drive to Redmond and start ~~dealing out ass-whippings~~ give everyone a stern talking-to. Simply put, this message exemplifies everything that's wrong with error messages. If it would tell me what application was locking the file on the disk, I would shut it down. I would even be happy to kill it with the task manager. Sadly, I get no hints. I'm sure this error message was easy to write, but it's no more useful than the "lazy programmers" [haiku error message](http://archive.salon.com/21st/chal/1998/02/10chal2.html) by Charlie Gibbs:

> Errors have occurred.
> We won't tell you where or why.
> Lazy programmers.

Error messages are important for normal applications, but _nowhere are they more important than in software libraries_. With [Ninject](http://ninject.org/), I've gone through great pains to make the exception messages as useful as possible. Here's an example error message, in this case if you try to activate a service that has a circular reference with another service. (Note that the web layout might cause odd word wrapping. Trust me that it's formatted a little more cleanly. :)

```
Ninject.Core.ActivationException: Error activating CircularMockA:
Circular dependencies detected between constructors. Consider using property injection and implementing IInitializable instead.
Using default self-binding of CircularMockA (via StandardProvider)
  declared by SampleModule.Load() at SampleModule.cs:85
Activation path:
  3) passive injection of service CircularMockA into parameter mockA on constructor of type CircularMockB
     using default self-binding of CircularMockA (via StandardProvider)
     declared by SampleModule.Load() at SampleModule.cs:85
  2) passive injection of service CircularMockB into parameter mockB on constructor of type CircularMockB
     using default self-binding of CircularMockB (via StandardProvider)
     declared by SampleModule.Load() at SampleModule.cs:86
  1) active request for CircularMockA
     from Program.Main() at Program.cs:91
     using default self-binding of CircularMockA (via StandardProvider)
     declared by SampleModule.Load() at SampleModule.cs:85
```

This is a good error message. It clearly describes what happened, and gives a possible solution. It directs the user back to the exact line number where the error occurred (which is sometimes lost when exceptions get wrapped). It then goes so far as to show _every step in the activation process_, starting with the first time the user asked Ninject for something --- the active request, shown last. That way, if the user doesn't quite understand how activation works in Ninject, they should still be able to understand what the framework is doing. This is _in addition to the stack trace_ that is available with all exceptions in .NET.

If I wanted to pattern my exception message around the one from the Safely Remove Hardware applet, it would look more like this:

```
System.Exception: Couldn't complete request. Try again later.
```

There are some libraries out there that have _fantastic_ error messages. The [Castle Project](http://www.castleproject.org/) (particularly [MonoRail](http://www.castleproject.org/monorail/index.html)) and [Guice](http://code.google.com/p/google-guice/) come to mind. However, some libraries that are otherwise great (NHibernate, I'm looking at you) have some terrible error messages.

I'm guilty of this too. One of the first applications I wrote when I started programming professionally was a PDF generator, written in C++. It was designed as an executable, and controlled by command-line parameters. This utility was embedded in other systems, primarily in a Linux environment, so we decided to use shell-return codes to indicate if there was a problem with the generation of the PDF. Sadly, we ran out of time before we implemented the error code system. To this day, the application returns one of three codes:

- `-1`: There was a problem with configuration.
- `0`: The PDF was successfully generated.
- `1`: There was some sort of error generating the PDF.

Once the utility was configured, its configuration wouldn't generally change, so 99% of errors just return **1**. We were creative enough, though, to include a log file, which could be configured to dump the entire contents of the PDF document in a debug-type display. It was even output in HTML, with some JavaScript to expand and collapse the giant tree in which it was displayed. Unfortunately, there wasn't any real level-filtering of the log... it was either _on_ or _off_. So, if you tried to generate a 200 page PDF, your log file would be somewhere around 300MB of HTML. Try loading _that_ in Internet Explorer and clicking the "expand all" button... :)

My point of all this rambling is this: errors happen, and reporting them correctly is a vital part of any piece of software. If you're going to spend the time to write a killer application, or a killer library, make sure you spend time to deliver proper error messages to your users. As a good exercise, show your error message to a user who understands how your application works and ask: can you explain what the problem is by reading this? If the answer is no, it's time to go back to the drawing board. It's tempting to just say "shit's broke, try again later", but you'll pay for it eventually.
