---
title: Thread Safe Event Handlers
date: 2007-08-04 20:11:00
category: dotnet
---

<span class='drop-cap'>I really need</span> a full post soon, because a whole bunch of stuff is happening with [Ninject](http://ninject.org/) (neé Titan). Unfortunately (for my blog at least), we just started our first sprint for a new project that I'm leading at my day job, so at least until it stabilizes my time is going to be pretty well filled. I came up with something that seems pretty useful, though, so I wanted to share it.

There's a rule in Windows development often jokingly referred to as _The One Rule_. Basically, it says that you cannot modify any part of the user interface from any threads other than the user interface thread. This is due to the way Windows handles messaging, which gets into message pumps and all sorts of other fun low-level stuff that I don't understand enough to get into here. :) In order to create responsive user interfaces, though, we have to do most of the work in background threads. This means that eventually, the background threads will need to tell the interface to update itself to inform the user of any changes.

.NET has provided a resolution to this apparent contradiction via `Control.Invoke()`. The pattern typically goes like this:

```csharp
public class SampleForm : Form
{
  public SampleForm()
  {
    Worker worker = new Worker();
    worker.ImportantEvent += HandleImportantEvent;
  }

  private void HandleImportantEvent(object sender, ImportantEventArgs e)
  {
    if (this.InvokeRequired)
    {
      this.Invoke(HandleImportantEvent, sender, e);
      return;
    }

    // Update the user interface to show an important event happened.
  }
}
```

The block at the beginning of the event handler protects the interface from being erroneously updated by checking the control's `InvokeRequired` property. If it's true, instead of actually executing the method directly, it calls `Invoke()`, which essentially queues the method call in the Windows message queue for later execution.

This works great, but it's a real pain to have that block in every method that could feasibly be called from another thread. It's easy to forget, too, with dire consequences: at least until .NET 2.0, this caused your application to lock up with no error messages at all. (Version 2.0 solves this by throwing an exception if you violate the One Rule.) Using the magic of anonymous methods, you could do this instead:

```csharp
public class SampleForm : Form
{
  public SampleForm()
  {
    Worker worker = new Worker();
    worker.ImportantEvent += ThreadSafe.EventHandler<ImportantEventArgs>(this, HandleImportantEvent);
  }

  private void HandleImportantEvent(object sender, ImportantEventArgs e)
  {
    // Update the user interface to show an important event happened.
  }
}
```

The magic happens in the `ThreadSafe` static class:</p>

```csharp
public static class ThreadSafe
{
  public static EventHandler<T> EventHandler<T>(Control context, EventHandler<T> handler)
    where T : EventArgs
  {
    return delegate(object sender, T args)
    {
      if (context.InvokeRequired)
        context.Invoke(handler, sender, args);
      else 
        handler(sender, args);
    };
  }
}
```

This will wrap your real event handler with an anonymous method that takes care of the `Control.Invoke()` if necessary. Note that you can only use this type with event handlers of the form `EventHandler<T>`, but you should be using that anyway... :)
