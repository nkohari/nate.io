---
title: Conventions-Based Binding
date: 2008-07-06 22:03:00
category: ninject
---

<span class='drop-cap'>In episode six</span> of the [ALT.NET podcast](http://altnetpodcast.com/episodes/6-more-di-and-ioc), Brad Wilson mentioned that we've only just touched the tip of the iceberg when it comes to dependency injection. He lamented that the existing frameworks have a configuration-based mindset, where you're forced to wire your application's components up in a very declarative fashion. He said he would prefer to see a DI framework that would allow you to favor convention over configuration.

This is a great idea, and it started the gears turning in my mind. Going with a more conventions-based mindset will let you wire your application up without the use of attributes, which helps to keep infrastructure concerns from cluttering your codebase. After [an interesting question](http://groups.google.com/group/ninject/browse_thread/thread/c1651d006494a484) was posted to the Ninject user group, it occurred to me that Ninject supports a "conventions over configuration" mindset already.

For example, let's say you have two sources for configuration in your application, a `LocalConfigurationSource` that loads configuration information from a local file, and a `RemoteConfigurationSource` that loads configuration from a remote database. Services that depend on configuration information will need one or the other of these services to set up configuration. Let's say you have a consuming service that loads some of its configuration from the local source, and some from the remote source:

```csharp
public class Service {
  public Service(IConfigurationSource remoteConfig, IConfigurationSource localSource) {
    //...
  }
}
```

In order to get Ninject to resolve these dependencies and call this constructor, you will need to declare bindings that differentiate between the two implementations of `IConfigurationService`. If you favor a declarative approach, you could create `[Remote]` and `Local` attributes, and use them to decorate the individual constructor arguments:

```csharp
public class Service {
  public Service([Remote] IConfigurationSource remoteConfig, [Local] IConfigurationSource localSource) {
    //...
  }
}
```

Then your bindings would look like this:

```csharp
Bind<IConfigurationSource>().To<RemoteConfigurationSource>()
  .WhereTargetHas<RemoteAttribute>();
Bind<IConfigurationSource>().To<LocalConfigurationSource>()
  .WhereTargetHas<LocalAttribute>();
```

However, if you'd rather not have to put the attributes in your constructor, you can rely on a conventions-based approach instead. For example, you can create a rule that says that if you want an instance of `RemoteConfigurationSource`, your argument has to begin with "remote", and if you want an instance of `LocalConfigurationSource`, it has to begin with "local". To do this, you would create bindings like this:

```csharp
Bind<IConfigurationSource>().To<RemoteConfigurationSource>()
  .Only(When.Context.Target.Name.BeginsWith("remote"));
Bind<IConfigurationSource>().To<LocalConfigurationSource>()
  .Only(When.Context.Target.Name.BeginsWith("local"));
```

By using these bindings, your consuming service could have a constructor with no attributes, as shown in the first code example.

I've added an [additional page](http://dojo.ninject.org/wiki/display/NINJECT/Conventions-Based+Binding) to the Ninject dojo describing these ideas, and I'd like to hear some feedback. If you have ideas on how to improve upon this, I'd be very interested to hear them!
