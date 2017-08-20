---
title: Ninject 2 Reaches Beta!
subtitle: Sometimes it makes sense to go back to the drawing board.
date: 2009-02-26 22:01:00
category: ninject
song: spotify:track:5U3qiJCXKCJ40Nf6tkI7Sq
---

<p class='banner'>
Since I published this post, I've moved the Ninject 2 source to Github. Both the downloads available here and the experimental branch in Subversion is outdated and will be removed eventually. Read more <a href='/2009/ninject-github-crazy-delicious'>here</a>.
</p>

<span class='drop-cap'>A month or so ago</span>, I started a spike of a new version of Ninject to test out some ideas that have been floating around in my head. I fully intended to throw it away and integrate what I’d learned into the existing Ninject codebase -- but gradually the spike grew into what I’m now calling Ninject 2, which I’m proud to say has reached beta status!

Ninject 2 is essentially a rewrite of the original codebase, but that’s not to suggest that anything is particularly wrong with the code that went into Ninject 1.x. When I started writing Ninject in early 2007, I was targeting .NET 2.0 and didn’t have the fancy toys that I have now -- namely LINQ and expression trees. Ninject 2 takes full advantage of LINQ, and I’ve actually jokingly referred to it as “LINQ to IoC”.

Also, I felt that some parts of Ninject 1.x were over-designed, so the development of Ninject 2 has been driven by an obsession with simplicity. To give you an idea of how much simpler Ninject 2 is, the trunk build of Ninject 1.x weighs in at 177KB, and Ninject 2 is just about 80KB.

I’m going to be blogging about the design of Ninject 2 and the differences between it and Ninject 1.x quite a bit over the next few weeks, but here’s a quick overview:

_Things that are in Ninject 2 that were not in Ninject 1.x:_

* **Cache-and-collect lifecycle management**: Rather than using binding behaviors, Ninject 2 uses a scoping system and leverages the garbage collector to reclaim instances. I’m very excited about this improvement, and it deserves a post unto itself to explain it.
* **Multi-injection**: The kernel in Ninject 2 now has `GetAll<T>()` methods, and supports injection of multiple targets with types `IEnumerable<T>`, `List<T>`, and arrays of `T`.
* **Constrained resolution**: Rather than just declaring conditional bindings, constraining predicates can now flow _into_ a resolution request from the point of injection. This creates a very powerful push/pull system for resolution, which also deserves its own post. :)
* **Common Service Locator support**: Because of multi-injection, Ninject 2 now has full support for the CSL.*   **Optional modules**: You can now register bindings directly on the kernel; modules are optional. If you register bindings in a module, and then unload the bindings, the bindings will be un-registered.
* **Automatic module scanning**: Ninject 2 can scan directories for assemblies that contain modules, and load them into the kernel.
* **Simplified extension model**: Internally, Ninject 2 relies on an inversion of control container of its own, reducing factory bloat and making extension of the core much simpler.
* **Mono support**: I haven’t had a chance to test this very well, but it’s something I want to make sure Ninject 2 has.

_Things that were in Ninject 1.x that are not in Ninject 2:_

* **Support for .NET 2.0**: Since Ninject 2 relies on LINQ and expression trees, .NET 2.0 support is now no longer possible.
* **Field injection**: Ninject 2’s injection is now driven by expression trees, and in .NET 3.5 there is no way to set field values with an expression tree. Since this is a bad practice anyway, I decided to cut it.
* **Private member injection**: Again, not supported by expression trees, and a bad practice, so it has been cut.*   **Behavior attributes**: Since behaviors have been cut and replaced by GC-driven scopes, attributes like `[Singleton]` no longer make sense. I _may_ re-add these if people scream loud enough.
* **Logging infrastructure**: Cut because it wasn’t really useful anyway. Ninject doesn’t generate logging messages of its own anymore, but I’m looking into alternative sources of introspection.
* **AOP/Interception:** This has been removed from the core for simplicity.
* **Compact framework support**: This is missing from the beta, but I may re-add it for the official release.

A few notes:

* The core namespace is now just `Ninject` instead of `Ninject.Core`.
* The default scope is now singleton rather than transient.
* Some extensions are missing (Messaging, in particular). They may re-appear before release.

Ninject 2 also has new constructor selection semantics:

1. If a constructor has an `[Inject]` attribute, it is used. If multiple constructors have an `[Inject]` attribute, the behavior is undefined.
2. If no constructors have an `[Inject]` attribute, Ninject will select the one with the _most parameters_.
3. If no constructors are defined, Ninject will select the default parameterless constructor.

Right now, the source is in an [experimental branch](http://ninject.googlecode.com/svn/experiments/ninject2/) on the Ninject subversion repository, but it will soon be moving to the trunk. You can also download the various builds here.

*   [.NET 3.5 binaries](http://ninject.org/assets/dist/ninject-2.0-beta1-release-net-3.5.zip)
*   [Silverlight 2.0 binaries](http://ninject.org/assets/dist/ninject-2.0-beta1-release-silverlight-2.0.zip)
*   [Mono 2.0 binaries](http://ninject.org/assets/dist/ninject-2.0-beta1-release-mono-2.0.zip)
*   [Source](http://ninject.org/assets/dist/ninject-2.0-beta1-source.zip)

I’m interested in all feedback (good and bad), so please let me know what you think!
