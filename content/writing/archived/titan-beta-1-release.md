---
title: Titan Beta 1 Release
date: 2007-05-08T05:31:00
state: archived
type: essay
format: instructional
category: ninject
---

{% lead-in %}It's finally done!{% /lead-in %} A few days ago, I made the initial release of my first serious open-source effort, Titan.

Titan is an inversion of control container for .NET applications that takes a slightly different approach than existing containers. Rather than using externalized configuration stored in XML files, Titan examines types via reflection and uses a small set of attributes to alter their instantiation behavior. Titan is ultra-lightweight, meaning it can be used in even very small projects, but is also extraordinarily powerful through its support for _contextual binding_. Titan draws inspiration from several existing projects, including [Guice](http://code.google.com/p/google-guice/), the [Castle Project](http://www.castleproject.org/) and [ObjectBuilder](http://codeplex.com/ObjectBuilder). It's not my intent to compete with these projects, but rather to provide an alternate take on the same goals. For those not familiar with inversion of control, the shorthand is the Hollywood principle: "don't call us, we'll call you." Essentially, it is a way of organizing your class hierarchy to make your application more cohesive, loosely-coupled, and easily testable.

Titan allows developers to organize an application into a collection of independent modules, which are joined through the use of a "kernel". Rather than creating instances of objects directly via the `new` operator, the application instead requests them from the kernel, either actively by calling a `Get()` method, or passively via the `[Inject]` attribute.

A quick-and-dirty example might help. Consider the problem of formatting messages in some abstract way, and sending them to some abstract endpoint. First, let's define a service that we can send the messages to:

```csharp
public interface IMessageService
{
  void Send(string message);
}
```

Then, we need a type that can format the messages:

```csharp
public interface IMessageFormatter
{
  string Format(string message);
}
```

Now that we have the two abstract pieces of the puzzle, let's create a client type that our application can use to send formatted messages using these two types:

```csharp
public class MessageClient
{
  private IMessageFormatter _formatter;
  private IMessageService _service;

  public MessageClient(IMessageFormatter formatter, IMessageService service)
  {
    _formatter = formatter;
    _service = service;
  }

  public void SendFormattedMessage(string message)
  {
    _service.Send(_formatter.Format(message));
  }
}
```

As you can see, the `MessageClient` expects two dependencies to be injected via its constructor: an `IMessageFormatter`, and an `IMessageService`. It then uses these dependencies to satisfy the implementation of `SendFormattedMessage()`. Alright, so we have an interface defined for our formatter and service, but we still need some concrete definitions. Here's a simple formatter that just returns the string as all uppercase:

```csharp
public class UppercaseMessageFormatter : IMessageFormatter
{
  public string Format(string message)
  {
    return message.ToUpper();
  }
}
```

And then, assuming we have some way of sending the message as an SMS, here's an implementation of a message service:

```csharp
public class SmsMessageService : IMessageService
{
  public void Send(string message) { ... }
}
```

So, now we have concrete implementations of all of the pieces of our application. How do we glue them together? Dependency injection can be done by hand, without the use of a container like Titan. For example:

```csharp
public static class Program
{
  public static void Main(string[] args)
  {
    MessageClient client = new MessageClient(new UppercaseFormatter(), new SmsMessageService());
    client.SendFormattedMessage("Hello, world!");
  }
}
```

This is also known as the _strategy pattern_. By injecting the formatter and service instances, we are altering the way in which our `MessageClient` executes its task. Then, if we ever want to change how it works --- say, send messages to an `EmailMessageService` instead, we can alter the injection rather than rewriting the internals of the client itself. This also means that we don't even really need the source code for `MessageClient` --- meaning a third party could also alter its behavior as well.

What happens, though, if the formatter or service has a dependency? And what if those dependencies have dependencies of their own? If we have to wire up the whole object graph manually, injection by hand can quickly become cumbersome. This is where inversion of control containers come into play, by automatically figuring out how to resolve dependencies to build the entire object graph.

Titan in particular uses a concept called _binding_, in which a service type is associated with a process by which instances of the type should be _activated_ (created and injected). To use Titan, we can decorate our `MessageClient` class with an `[Inject]` attribute:

```csharp
public class MessageClient
{
  private IMessageFormatter _formatter;
  private IMessageService _service;

  [Inject]
  public MessageClient(IMessageFormatter formatter, IMessageService service)
  {
    _formatter = formatter;
    _service = service;
  }

  public void SendFormattedMessage(string message)
  {
    _service.Send(_formatter.Format(message));
  }
}
```

Then, we define a module that sets up our type bindings:

```csharp
public class MessageModule : IModule
{
  public void Load(IKernel kernel)
  {
    kernel.Bind<IMessageFormatter, UppercaseMessageFormatter>();
    kernel.Bind<IMessageService, SmsMessageService>();
  }
}
```

Here's what our application looks like now:

```csharp
public static class Program
{
  public static void Main(string[] args)
  {
    IKernel kernel = new StandardKernel(new MessageModule());
    MessageClient client = kernel.Get<MessageClient>();
    client.SendFormattedMessage("Hello, world!");
  }
}
```

In this example, the application creates a new Titan kernel, which loads the `MessageModule`, which in turn declares bindings for the formatter and the service. The application then requests an instance of the `MessageClient` class from the kernel. The resulting instance of `MessageClient` is injected with an instance of `UppercaseFormatter` and an instance of `SmsMessageService`. Obviously, that was more code than we wrote earlier. Remember, though, if the formatter or service types have external dependencies of their own (including dependencies in other modules), the Titan kernel will resolve and inject them automatically.

Notice also that there was no explicit binding declared for `MessageClient`. This is a feature of Titan called _implicit self-bindings_. If you request a type that has no explicit bindings, but is self-bindable (i.e. is not abstract, and is not an interface), Titan will create a binding from the type "to itself" --- meaning it will activate an instance of the class that was requested. (Binding is a somewhat complex topic, so if this doesn't make sense, don't worry. I just wanted to point out why I could get away without defining a binding for `MessageClient`.)

Titan can do all sorts of other fun stuff. For example, we could decorate our `UppercaseFormatter` class with a `[Singleton]` attribute, and then all requests for `IMessageFormatter` would re-use the same instance of it. (Another behavior attribute is `[OnePerThread]`, which, as the name sounds, causes only one instance of the type to exist per thread in the application.

So far, the features I've described are also available using the other projects that I listed at the beginning of the article. However, these projects all resolve bindings by the use of a key. For example, ObjectBuilder uses a key composed of the type of the object being created and an optional string identifier. Guice, by comparison, uses the requested type and a Java annotation to resolve the binding. As I mentioned earlier, Titan introduces an advanced feature called _contextual binding_, in which a different concrete type is used for a given service in different situations. At each level of injection, the Titan kernel is aware of what it is doing, and is able to use that information to alter its injection strategies.

Titan's contextual binding system is controlled by `ICondition` objects, which can be created via a powerful EDSL (embedded domain-specific language). For example, consider our previous system, but assume that sometimes we want to send messages via SMS, and other times we want to send them via email. We could accomplish this via conditional binding by defining two attribute types, `SmsAttribute` and `EmailAttribute`, and altering our `MessageModule` like so:

```csharp
public class MessageModule : IModule
{
  public void Load(IKernel kernel)
  {
    kernel.Bind<IMessageFormatter, UppercaseMessageFormatter>();
    kernel.Bind<IMessageService, SmsMessageService>(If.Member.HasAttribute(typeof(SmsAttribute)));
    kernel.Bind<IMessageService, EmailMessageService>(If.Member.HasAttribute(typeof(EmailAttribute)));
  }
}
```

Then, if the member being injected is decorated with `[Email]`, the kernel will inject an `EmailMessageService`, and if the member is decorated with `[Sms]`, the kernel will inject an `SmsMessageService`. You might say this example is very Guicey. :)

Titan's contextual binding system is ridiculously powerful though. Here are some (contrived) examples:

```csharp
If.InjectionPoint.Type.Namespace.BeginsWith("Titan.Kernel")
If.Service.Assembly.Version.Build.GreaterThanOrEqualTo(3210)
If.Time.DayOfWeek.EqualTo(DayOfWeek.Tuesday)
If.Member.Type.Assembly.LoadedFromGAC
If.Service.Assembly.Location.BeginsWith(@"C:\Projects")
```

Obviously, a lot of these are ridiculous, and you probably wouldn't use some of the edge cases shown here. I only mean to point out the power of the EDSL (the implementation of which is a post unto itself). You can also forgo the ESDL entirely and define your own custom conditions by implementing the `ICondition` interface.

So, that's a quick rundown of what I've been working on for the past few months. I've now switched gears and am working to develop documentation. In the meantime, if you'd like to tinker, check out these links:

- [Google Code Site](http://code.google.com/p/titan-ioc/)
- [Subversion Repository](http://titan-ioc.googlecode.com/svn/trunk/)
