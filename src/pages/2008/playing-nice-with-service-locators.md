---
title: Playing Nice With Service Locators
subtitle: An easy way to start using a dependency injection framework.
date: 2008-06-19 22:08:00
category: ninject
---

<span class='drop-cap'>When I introduce</span> dependency injection to developers, I often receive the complaint that it's not significantly better than the [service locator](http://martinfowler.com/articles/injection.html#UsingAServiceLocator) pattern. The main disadvantage of a service locator is that you're required to couple all of the services in your application to the service locator in order for them to resolve their dependencies. By using a DI framework instead, you can keep your services very loosely-coupled.

However, there are some advantages of the service locator pattern. In particular, it's much easier to implement _hybrid activation_ -- when some of the values in a constructor are provided by the consuming code, and some are provided by the framework. Hybrid activation is common in situations where you don't need (or want) your DI framework to control the instantiation behavior of the type, but you still want to be able to resolve dependencies that are required for the instance.

In Ninject, hybrid activation is possible through the use of context parameters, which allow you to provide values for specific constructor arguments when you request the instance. However, context parameters can only be used for _active requests_ -- that is, calls to the kernel's `Get()` method. If you often call `Get()` on the kernel, you're using it as a service locator anyway.

The reality is, there's nothing inherently wrong with using a service locator -- when used in the right way, it can greatly simplify your code. I don't think that service locator and dependency injection are mutually exclusive; in fact, I've found that it can actually be very effective when used _in conjunction_ with a dependency injection framework like Ninject.

For example, let's say you have an `EventWatcher` service that listens for a named event on an `IMessageBroker`, reads event information from the message, and triggers a specified callback. The implementation of such a service might look like this:

```csharp
public class EventWatcher<T> {
  public EventWatcher(string eventName, Action<T> callback, IMessageBroker messageBroker) {
    //...
  }
}
```

You can't easily activate a service like this using the Ninject kernel (at least without using context parameters), since the first two constructor arguments have to be supplied from the consuming code, and only the third is actually a dependency that should be activated via the kernel.

However, let's introduce a simple service locator, which just delegates activation requests to a Ninject kernel:

```csharp
public static class ServiceLocator {
  private static IKernel _kernel;
  public static void Initialize(IKernel kernel) {
    _kernel = kernel;
  }
  public static T Get<T>() {
    return _kernel.Get<T>();
  }
  public static object Get(Type type) {
    return _kernel.Get(type);
  }
}
```

Then, when we initially create our kernel, we just have to pass it to the `Initialize()` method of the `ServiceLocator`:

```csharp
public static class Program {
  public static void Main() {
    using (var kernel = new StandardKernel(...)) {
      ServiceLocator.Initialize(kernel);
      //...
    }
  }
}
```

Using the service locator, we can alter our implementation of `EventWatcher` to make it easy to pass in the event name and callback method arguments, while still leaving it flexible enough to swap out the implementation of `IMessageBroker`. This is particularly useful for testability, since you can easily swap in a mock implementation of `IMessageBroker` in your tests.

```csharp
public class EventWatcher<T> {
  public EventWatcher(string eventName, Action<T> callback)
    : this(eventName, callback, ServiceLocator.Get<IMessageBroker>())
  { }
  [Inject]
  public EventWatcher(string eventName, Action<T> callback, IMessageBroker messageBroker) {
    //...
  }
}
```

As you can see, if the more limited constructor is called, the `EventWatcher` asks the `ServiceLocator` to resolve the instance that should be used. Notice also that I've still kept the `[Inject]` attribute on the second constructor, in case you want to activate the type using the kernel and context variables.

While this is a useful technique in limited use, it's important to be careful how much you rely on it. Remember that every time you use a service locator instead of dependency injection, you're coupling your type to the service locator -- and since it's a static method call, it's coupled just about as tightly as you can get. Again, though, taken in small doses, this technique can actually simplify your code and make it much more flexible.
