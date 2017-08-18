---
title: Ninject Release Candidate 1
date: 2008-03-26 04:45:00
category: ninject
---

<span class='drop-cap'>I've been busy</span> the past few evenings adding some features to Ninject to move it towards the impending 1.0 release. I've written about a few of them before, but here's a quick breakdown of the changes.

## Transient Parameters

Previously mentioned [here](http://kohari.org/2008/03/12/ninject-lives/) and [here](http://kohari.org/2008/03/13/context-variables-in-ninject/), transient parameters provide a means to manipulate the activation process for active requests to the kernel's `Get()` method. Since I previously wrote about them, I've rewritten the internals to generalize them. Now, you create custom parameters using the `IParameter` interface, and extensions or your bindings can read them and alter the activation process.

## Aspect-Oriented Programming (Interceptors)

I [briefly talked about this](http://kohari.org/2008/03/15/ninject-and-aop/) before also. Since dependency injection frameworks like Ninject already control object instantiation, it's natural to add the ability to intercept method calls on the generated instances. I'd flirted with adding support in the past, but I was wary of spending the effort to write a large proxy-generation system. I was also concerned about bloating the core library, since not everyone will use interception.

Finally, I settled on "outsourcing" the hard part -- proxy generation -- to already-existing libraries like [LinFu.DynamicProxy](http://code.google.com/p/linfu/) and [Castle DynamicProxy2](http://castleproject.org/dynamicproxy/index.html). The actual interception system is baked into `Ninject.Core`, but in order to actually use it you have to use one of these libraries and the corresponding integration extension. (You can also create your own integration, of course!)

There are two ways to define interceptors in Ninject: **static** and **dynamic**. Static interceptors are related to a single method, and are declared via attributes. The main attribute is `InterceptAttribute`, which can be used directly or extended to clean up the code. You can tag either a single method with an interception attribute, in which case only that method will be intercepted -- or you can put the tag on the class itself, which will cause _all_ methods on the type to be intercepted.

With Ninject's history of fancy fluent interfaces, though, that's way too boring. Naturally, I had to up the ante a bit, with what I call _dynamic interceptors_. These are defined kind of like bindings, in a module's `Load()` method. If you've used the conditional binding system, you're familiar with fluent interface rooted in the `When` class, that can be used to create binding conditions. Well, my super-secret plan has now been un-veiled; the same fluent interface can also be used to define dynamic interceptors.

There's now a new method, like `Bind()`, available in modules, called `Intercept()`. This means that if you want to define dynamic interceptors, you can do things like this:

```csharp
Intercept<CacheInterceptor>(When.Request.Method.ReturnType.EqualTo(typeof(int)));
Intercept<CountInterceptor>(When.Request.Method.Name.StartsWith("F"));
```

As you might guess, the first registration will cause all method calls to any objects activated via the kernel to be intercepted by a `CacheInterceptor`. The second registration causes all methods starting with the letter "F" to be passed through a `CountInterceptor`. Naturally, these are contrived examples, but you can see the power available to you.

One more cool feature ties together the two fluent interfaces in a very interesting (at least to me!) way. If you do:

```csharp
When.Request.Context
```

You can actually write conditions against the activation context (`IContext`) that the object that is being intercepted was activated in! (Whew. That's a mouthful.) This means you can make interception decisions based on a type's activation plan, or even transient parameters passed to the `Get()` method.

**NOTE!** This also means there's a breaking change in the conditional binding system. Anywhere you were using `When`, you will now have to replace with `When.Context`. Sorry, I've been trying very hard to avoid breaking changes, but this one was necessary.

The new AOP support in Ninject deserves its own blog post (or series of blog posts). It's one of my favorite new features, and I'll continue to write about it as time goes on.

## New Tracking Component and Scopes

I've refactored instance tracking, used for deterministic disposal, out of the kernel itself and into a new `ITracker` kernel component. I've also introduced a new scope system, which you can use for more fine-grained control over deterministic disposal:

```csharp
IKernel kernel = ...;
using (kernel.BeginScope())
{
  IService service = kernel.Get<IService>();
}
```

The `BeginScope()` method returns an `IScope` object, which is disposable. As long as a scope is active, any instances that are created are registered in it. When the `IScope` is disposed, all instances that were created therein are passed to the kernel's `Release()` method.

## Extension Model

One of the driving forces of Ninject has been to keep the core library as slim as possible. This has resulted in a lot of additional assemblies, and until this point there hasn't been a natural way to load them into the kernel. The new extension model uses the concept of Ninject modules as a plug-in architecture. For example, the pub/sub messaging system, which used to live in `Ninject.Messaging`, is now in `Ninject.Extensions.MessageBroker`. To use it, all you have to do is add the `MessageBrokerModule` to your kernel:</p>

```csharp
IKernel kernel = new StandardKernel(new MessageBrokerModule(), ...);
```

As more extensions are created, they will typically exposure an `IModule` that can be loaded into a kernel to extend it with the functionality provided by the extension.

## Cleanup and Minor Enhancements

I'm starting to revamp parts of the code to take advantage of the syntax improvements available in C# 3.0 -- particularly lambda methods rather than anonymous delegates. I've also spent some time moving some things around in the solution to get it more organized, including tinkering with namespaces to limit the types that are exposed to code that consumes Ninject and its extensions. I've also provided a strong-name key and signed all of the assemblies to allow them to be used in scenarios that require it.

I'm sure there's a bunch of other things that I've added, but those are the ones that I can remember at the moment. If you'd like to tinker with Ninject, there's a new build available on the [project website](http://ninject.org/), or you can check out the latest version from the [trunk](http://ninject.googlecode.com/svn/trunk) and build it yourself. I'd like to hear what everyone has to say about the new features. I'm targeting June for a final 1.0 release, and I'd like to know what you think is missing before we can call it the big one-oh.
