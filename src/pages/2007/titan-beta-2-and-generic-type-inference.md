---
title: Titan Beta 2 and Generic Type Inference
date: 2007-06-18 06:57:00
category: ninject
---

<span class='drop-cap'>I've been busier</span> than usual for the past few weeks, which probably has something to do with me letting my blog be half-broken for a good two weeks or so before fixing it. Then this past week we just landed a major new project at work, and I'm going to wear two hats: architect and project manager. Exciting, but as you might imagine, I've been busy for the past few days. :)

In spite of that, I've been scrounging some time to work on the Beta 2 path for Titan. One of the primary things that I'd like to support before getting around to release is _generic type inference_. Basically, generic type inference lets you bind a generic service type definition, such as `IService<T>`, to a generic implementation type definition, such as `ServiceImpl<T>`. Then, when you asked Titan for an `IService<string>`, you'd get a `ServiceImpl<string>`, and if you asked for an `IService<Foo>`, you'd get a `ServiceImpl<Foo>`. This (obviously) can greatly simplify your modules' binding definitions. Windsor has this, but I originally felt that it was one of those features that landed on the short side of the 80/20 rule, and left it out to make the system simpler.

Specifically, leaving out generic type inference made it so the concrete implementation type for a given binding would be known before activation, which in turn meant that binding directives could be collected by the Binder before an instance of the service was actually activated. Because of this, Titan could fail faster if there was a problem with the way the bindings were declared. Also, I had the idea that binding declarations could be serialized and cached to persistent storage (like a file) to speed subsequent executions of the application.

Like I said, I was convinced that this was something I could sacrifice for simplicity's sake. Since the beginning, I've seen Titan's niche as being ultra-lightweight, in contrast to Spring.NET and Windsor's bulk. Titan could never compete in terms of features, but I think that there's a vacuum in the "market", so to speak, for dependency injection in small ("non-enterprise") applications.

Speaking of small applications, I plan to create .NET Compact Framework 2.0 build of Titan for use in a project at work. It'll have to use reflection-based injectors rather than the lightweight delegate system that's available in the standard build, because there's no `DynamicMethod` support in .NETCF, but otherwise it should be a direct port. Another thing I'm planning for Beta 2 is improved MSBuild support, to target multiple platforms at once.

Anyhow, as I continued to work with Titan, this binding decision turned out to be more of a limitation than a feature. I had inadvertently tightly coupled the service type and the implementation type (from Titan's perspective). That is, once the binding for a given service type was registered, the implementation type was fixed in perpetuity -- at least in a context that matched the binding's condition.

To get around this limitation, Beta 2 will delay the collection of binding directives until the binding's provider actually creates an instance of the type. The directives will then be cached, so the type won't be re-analyzed for services with transient behavior. There will be a new `GenericProvider` to supplement the `StandardProvider`, that can do generic type inference.

I'm also working to pull the binding API out of the kernel itself using the Builder pattern. This means that instead of:

```csharp
kernel.Bind<IService, ServiceImpl>(If.InjectionPoint.Tag.EqualTo("foo"));
```

You'll write (tentatively):

```csharp
Bind<IService>().To<ServiceImpl>().When.InjectionPoint.Tag.EqualTo("foo");
```

There'll also be a couple of other changes, which are intended to let you work with types that you can't modify:

1. You'll be able to specify the behavior of the service when declaring the binding, which will override any behaviors declared via attributes.
2. You won't have to mark a constructor with `[Inject]`, if there is either a default parameterless constructor, or just a single constructor period. (I was tempted to get into heuristics like Castle's MicroKernel has, but I opted out of it because there's no deterministic way to figure out which constructor will be called.)
3. I _might_ add auto-wiring support as a kernel option, so Titan will automagically try to figure out what you want injected. Again, I'm not a fan of this because I think you should be able to look at your type definition and understand what Titan's going to do.

If you're a glutton for punishment, there's a Beta 2 branch in Subversion:

[http://titan-ioc.googlecode.com/svn/branches/beta2](http://titan-ioc.googlecode.com/svn/branches/beta2)

Be forewarned though, that this is even less stable than usual, since I'm making daily changes to it. If you're looking to try out Titan, you might be better suited to work with the trunk build instead. That's available at:

[http://titan-ioc.googlecode.com/svn/trunk](http://titan-ioc.googlecode.com/svn/trunk)</p> <p>If you're interested in learning more about Titan, check out:

* Google Code Page: [http://code.google.com/p/titan-ioc/](http://code.google.com/p/titan-ioc/)
* Users Group: [http://groups.google.com/group/titan-ioc-users](http://groups.google.com/group/titan-ioc-users)
* Developers Group: [http://groups.google.com/group/titan-ioc-dev](http://groups.google.com/group/titan-ioc-dev)

I'm still working on the manual, but since Beta 2 is going to be significantly different, I've been working more with the code than the docs. Bad developer! As always, if you have questions or ideas on ways to improve Titan, by all means post them to the Users Group.