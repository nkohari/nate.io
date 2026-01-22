---
title: More on Thread-Safe Invocation
date: 2007-08-14T19:41:00
state: archived
type: essay
format: instructional
category: dotnet
---

A few days ago, [I wrote](/writing/archived/thread-safe-event-handlers) about a simple trick for creating thread-safe wrappers for event handlers in WinForms controls. I've discovered an even simpler approach that is much more general-purpose:

```csharp
public static class ThreadSafe
{
  public static void Invoke(ISynchronizeInvoke context, MethodInvoker method)
  {
    if (context.InvokeRequired)
      context.Invoke(method);
    else
      method();
  }
}
```

Then, in your control, you can define methods like this:

```csharp
public class MyForm : Form
{
  public void SetMessage(string message)
  {
    ThreadSafe.Invoke(this, delegate {
      this.lblMessage.Text = message;
    });
  }
}
```

Through the magic of variable capturing with anonymous methods, you don't need to pass the arguments into your inner method (the delegate that you're passing to the Invoke method). This also means that the Invoke method can be used to protect methods with any signature. Be aware, though, that the captured variables are read-only in the inner context. (More information about captured variables and the difference between lexical closures in C# and Ruby is available [here](http://blogs.msdn.com/abhinaba/archive/2005/10/18/482180.aspx).)

I haven't given this too much testing so far, but it seems to work!
