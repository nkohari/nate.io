---
title: Cache-and-Collect Lifecycle Management
subtitle: Ninject 2 tries a new solution to an old problem.
date: 2009-03-08T03:41:00
state: archived
type: essay
format: instructional
category: ninject
song: spotify:track:0iUano4euaiUETVUd1u0cx
---

_Warning: unless you’re interested in the nuances of lifecycle management in inversion of control systems, this post might make your eyes glaze over. However, if you’re interested in new solutions to old, difficult problems, read on. :)_

{% lead-in %}One of the most{% /lead-in %} important features of any inversion of control framework is the re-use of instances within certain scopes. For example, you might define that a certain service is a _singleton_, that is, only a single instance of it may exist throughout your application, or you might mark it as _one-per-request_, meaning one instance of it would be created for each web request that your application receives.

As it is with most important features, lifecycle management is a complex problem, and one that’s very difficult to get correct. In Ninject 1, I assumed that this complexity was inevitable, and implemented a system of behaviors (`SingletonBehavior`, `OnePerRequestBehavior`, and so on). While this solution worked, it was difficult to customize and prone to errors.

Ninject 2 introduces a feature that I’ve been working on for awhile, which I’m calling _cache-and-collect_ lifecycle management. Instead of creating a “manager” that controls the re-use of instances (like behaviors in Ninject 1), Ninject 2 associates all instances with a “scope” object. This object is just a POCO --- that is, it doesn’t need to know anything about Ninject or that it’s involved in lifecycle management.

Ninject 2 ships with the same four standard scopes (transient, singleton, one-per-thread, and one-per-request) that were available in Ninject 1. When Ninject receives a request, it has a callback associated with it that returns the scoping object for the request. The following table shows the correlation between the binding syntax and the callback that is used:

| Binding Syntax       | Object returned from scope callback     |
| -------------------- | --------------------------------------- |
| `InTransientScope()` | _n/a_                                   |
| `InSingletonScope()` | the kernel itself                       |
| `InThreadScope()`    | `System.Threading.Thread.CurrentThread` |
| `InRequestScope()`   | `System.Web.HttpContext.Current`        |
| `InScope(callback)`  | Whatever `callback()` returns (custom)  |

At this point, an example might help. Assume that you have a service `IFoo`, that is bound to request scope. When the first request occurs for `IFoo`, the scope callback returns the `HttpContext` for the current web request, and the resulting instance of `IFoo` is associated with it. If any subsequent requests for `IFoo` are made within the same web request, the same instance is returned. However, if a request for `IFoo` is received from a thread handing a _different_ web request, the scope callback will return a _different_ `HttpContext` object, resulting in a new instance of `IFoo` being activated and returned.

For each request that results in the creation of a new instance, the instance is associated with the object that is returned from the request’s scope callback. If the request has no scope callback (as in the case of transient services), no association takes place and Ninject will return a new instance for each request.

From there, the rules of cache-and-collect are simple:

1. If the callback for a subsequent request returns an object that already has an instance of the requested type associated with it, it is re-used. (Assuming it was activated via the _same binding_.)
2. When the scoping object is garbage collected, all instances associated with it are deactivated via Ninject.

Rule 2 was a kind of tricky to implement. The garbage collector doesn’t fire any events when it’s run, and while you can register for callbacks when it’s executed, you have to mess with the settings on the runtime itself to get it to work. As a result, I had to get a little creative, and use a timer and `WeakReferences` to poll the GC to see when it is run. If you’re interested in the solution, you can [see it here](http://ninject.googlecode.com/svn/experiments/ninject2/src/Ninject/Activation/Caching/GarbageCollectionCachePruner.cs). Basically, every second, Ninject checks to see if the GC has run, and if so, it prunes its internal cache, deactivating any instances whose scopes have been collected.

Remember that _you can use any object_ as a scope through the custom InScope() binding syntax. This is intended to replace the use of container hierarchies, which is a common pattern in other dependency injection frameworks, but something I refuse to implement in Ninject because of the complexity that comes with it.

Note that with cache-and-collect, instances are _not guaranteed_ to be deactivated immediately when the scope terminates. For example, instances activated in request scope will not be collected immediately at the end of web request, but when the HttpContext that was used to control the web request is garbage collected, the instances associated with it will be deactivated. However, they are guaranteed to _eventually_ be disposed.

This just means that the normal rules apply to objects that hold scarce resources like file handles and database connections --- either don’t couple the lifespan of the scarce resource to the lifespan of the object that holds it, or dispose of the holding object when you’re done with it!

Ninject does provide a way to get deterministic deactivation of your instances for custom scopes, if you’re willing to give up the POCO-ness if the scoping object. If your scope callback returns an object that implements `INotifyWhenDisposed` (an interface from Ninject), Ninject will immediately deactivate any instances associated with the object when you call object’s Dispose() method.

There’s one final way of handling scope in Ninject2, through _activation blocks_. Blocks are a way to override the scope that was declared on a binding, and instead associate the activated instances with the block itself. Since the activation block that is returned implements `INotifyWhenDisposed`, any instances activated via the block are immediately deactivated when the block is disposed. The block object implements all of the same methods available on the kernel itself --- such as Get() --- but instead of executing them, it simply delegates any requset it receives to the kernel that created it.

Here’s an example of using an activation block:

```csharp
IKernel kernel = ...;
using (var block = kernel.BeginBlock()) {
  var foo = block.Get<IFoo>();
  var bar = block.Get<IBar>();
}
```

When your code hits the end of the `using()` block, the activation block is disposed, causing foo and bar to be deactivated. Note that you aren’t required to use activation blocks within `using()` constructs; as long as you hold an instance of the block and don’t dispose it, you can continue to activate instances through it and they will be associated with the block. Then when you’re done, dispose of the block, and your instances will be deactivated.

This is a problem that has been nagging me for a long time, and I’m pretty excited about this solution. If you have any feedback, or want to poke holes in the idea, by all means let me know!
