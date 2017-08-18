---
title: EventHandler Extension Method
date: 2009-02-09 08:44:00
category: dotnet
---

<span class='drop-cap'>I just wrote</span> just wrote an interesting extension method, and thought I’d share it. If you’re using the `EventHandler<T>` delegate that was introduced back in .NET framework 2.0, this method might come in handy:

```csharp
public static class ExtensionsForEventHandler
{
  public static void Raise<T>(this EventHandler<T> handler, object sender, T args)
    where T : EventArgs
  {
    EventHandler<T> evt = handler;
    if (evt != null) evt(sender, args);
  }
}
```

This helps you avoid having to repeat the boilerplate code that goes along with the typical event-firing pattern. With this extension method, you can do this instead:

```csharp
public class StuffDoer
{
  public event EventHandler<StuffEventArgs> StuffHappened;

  public void DoStuff()
  {
    StuffHappened.Raise(this, new StuffEventArgs());
  }
}
```

Since extension methods can be called on references that are actually null, this will work even if no listeners have attached to the `StuffHappened` method.

I’m all about syntactic sugar, and extension methods provide an easy way to improve the readability of your code without too much hassle. (And you _are_ writing your code so it’s easier for others to read, right? :)
