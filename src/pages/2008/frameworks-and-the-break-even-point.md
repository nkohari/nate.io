---
title: Frameworks and the Break-Even Point
date: 2008-04-02 17:14:00
category: ninject
---

<span class='drop-cap'>I read</span> [a good post](http://www.rosscode.com/blog/index.php?title=dependency_injection_with_a_framework) by Joel Ross the other day. In the post, Joel implements a simple project using Castle Windsor to drive dependency injection. In [one of the comments](http://www.rosscode.com/blog/index.php?title=dependency_injection_with_a_framework&more=1&c=1&tb=1&pb=1#c8141), [Matt Blodgett](http://www.mattblodgett.com/) says that it seems like it takes a lot of code to implement, and that the code isn't pretty. Naturally, I figured I'd use this an opportunity to point out the advantages of Ninject's fluent interface vs. XML configuration. :)

The way I see it, every framework library has a cost that you have to pay up-front in order to use the library in your code. This cost might be in a learning curve, a performance penalty, or the fact that you have to write some boilerplate code to make the library work its magic. Typically, the argument is that by paying this up-front cost, you get a benefit that's significantly larger. This creates a _break-even point_, where you make up for the "debt" you paid to use the library, and start becoming more effective because of it. The best libraries are the ones that keep the up-front cost as low as possible, so you reach your break-even point faster. Libraries that accomplish this goal can be used in significantly smaller projects, because it becomes easier to justify the up-front cost if you know that you're going to quickly begin to see benefits in terms of efficiency.

Ninject was written to support enterprise applications, but aims to treat small projects as first-class citizens. To that end, I've gone to great pains to try to keep things simple in simple situations, and mask any complexity required for advanced scenarios from everyday use. Here's the same example that Joel presented, written with Ninject.

First, the `User` class:

```csharp
public class User {
  public IServiceApi Service { get; private set; }
  public string UserName { get; private set; }

  [Inject]
  public User(string userName, IServiceApi service) {
    UserName = userName;
    Service = service;
  }

  public void SendMessageTo(string message) {
    Service.SendMessage(String.Format("@{0} - {1}", UserName, message));
  }
}
```

One caveat: I typically try not to combine service logic with my domain model, and so I wouldn't put the `IServiceApi` dependency directly in the `User` class. Not that there's anything _wrong_ with this, but it means that you have to activate every `User` that you load in your application via the DI framework, and that can interfere with scalability. It also makes activating the `User` a little bit more difficult, as you'll see below.

Next, rather than creating the XML configuration to wire up the components, we create a module, and bind the `IServiceApi` interface to the `TwitterApi` implementation:

```csharp
public class TwitterModule : StandardModule {
  public override void Load() {
    Bind<IServiceApi>().To<TwitterApi>();
  }
}
```

(You could also add a self-binding for `User`, but you don't have to since it's a concrete type.) Maybe it's just me, but those 4 lines of code (complete with IntelliSense!) are much simpler than the 20 or so lines of XML. You're using a big powerful IDE, so why not take advantage of it to set up your DI framework?

Lastly, we need to load the module into a kernel and activate our `User`. Because of our userName parameter, we need to do a "hybrid" activation by passing a transient parameter to the `Get()` method. (This is what I meant about separating the domain model from the service model. It lets you avoid things like this.)

```csharp
public static class Program {
  public static void Main() {
    IKernel kernel = new StandardKernel(new TwitterModule());
    User user = kernel.Get<User>(
      With.Parameters.ConstructorArgument("userName", "RossCode")
    );
    user.SendMessageTo("test");
  }
}
```

You could also just make the `User`'s `UserName` property writable, and set it after activating the object.

Now, this is a pretty simple example, and I'd say we still haven't reached the break-even point with Ninject. However, if we had a couple more services like `IServiceApi`, each implementation of which had its own dependencies, the power of DI would start to make itself apparent. For example, consider the following scenario:

1. Our `TwitterApi` depends on a `TwitterWebService`.
2. We add a `JabberApi` which depends on a `JabberClient`.
3. We add a `SmtpApi` which depends on a `SmtpClient`, which depends on an `EmailMessageFactory`.

Assuming `JabberClient`, `SmtpClient`, and `EmailMessageFactory` are all concrete types, your existing application could support all of these new features without adding anything new to your type bindings. (This is because Ninject will automatically create "self-binding" when it encounters concrete dependencies.) You could then easily flip between the different options by altering the binding between `IServiceApi` and one of your `*Api` classes. Also, since your module is executable code like anything else, you could make it more intelligent, reading configuration files, command line parameters, or even a database to determine which messaging service implementation should be used.

The flexibility that inversion of control brings to your application benefits you the first time you need to add additional features, or make changes on the fly. Sometimes it's difficult to understand what the benefit is by reading example code, and it takes some time to get used to writing your code to work with DI. It's well worth the up-front cost though!
