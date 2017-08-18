---
title: Attributes? We Don't Need No Stinkin' Attributes
date: 2008-06-09 23:51:00
category: ninject
---

<span class='drop-cap'>Ninject will reach 1.0</span> later this month. As the project has gained traction, I've received a common complaint concerning the use of the `[Inject]` attribute to decorate dependencies. Ninject was originally designed to match my own tastes, and I don't personally mind the attribute in this case. The common argument against attributes is that it hurts the readability of your code, but I would suggest that in this case it actually improves its readability by making it more declarative. At a minimum, it says "this value comes from somewhere special," so even if there are other developers working with your codebase that don't entirely understand dependency injection, the use of `[Inject]` is enough to get them asking questions.

However, while I would consider Ninject to be [opinionated software](http://gettingreal.37signals.com/ch04_Make_Opinionated_Software.php), I also want to make sure it's useful to people with differing tastes, as long as I can do so without sacrificing the common case. To that end, I've been working to make it easier to dodge the attribute requirement. There are actually four different ways of avoiding the use of `[Inject]`, depending on the level of control you want over your codebase. Note that this article describes features available in the subverison trunk, which will become version 1.0 with very few modifications, but most are not available in RC1. However, I do my utmost to make sure that the trunk build of Ninject remains stable, and I am currently using it in production applications without trouble.

## 1. Use Automatic Constructor Injection

The first, and easiest way to avoid the attribute is to use automatic constructor injection. If a type only has a single constructor, Ninject will attempt to inject it regardless of whether or not it is decorated with an `[Inject]` attribute. Therefore, if you're willing to accept the limitation of only using constructor injection, you can avoid using `[Inject]` anywhere in your code.

## 2. Use a Custom Injection Attribute

If it's not the requirement of the attribute that bothers you, but the fact that it means you have to have a dependency on `Ninject.Core` throughout your code, you can customize the attribute that Ninject will look for to inject dependencies. This is done via `KernelOptions`. For example:

```csharp
public class MyInjectAttribute : Attribute {}

public static class Program {
  public static void Main() {
    var options = new KernelOptions { InjectAttributeType = typeof(MyInjectAttribute) };
    var kernel = new StandardKernel(options, ...);
  }
}
```

Now, rather than decorating your dependencies with `[Inject]`, you instead use `[MyInject]`, and avoid the dependency on `Ninject.Core`. If you use optional dependencies, you can override the `[Optional]` attribute in this way as well.

## 3. Use the Auto-Wiring Extension

A recent addition to Ninject is `Ninject.Extensions.AutoWiring`, which provides a way to inject dependencies without ever needing to decorate them with attributes. Instead, which dependencies that are injected will be based on what bindings you register with the kernel. When a type is activated, Ninject will do the following things:

1. It will find a constructor on the type whose parameters all have types for which bindings are registered. If there are multiple constructors available, it will select the one with the _most_ parameters with bindings defined.
2. Similar logic will be applied to methods -- if the type defines methods whose parameters all have valid bindings defined, dependencies will be resolved for the arguments and the methods will be called.
3. Finally, all properties and fields will be considered as well. If their types have bindings defined, they will be injected.

To use auto-wiring, you just need to load the `AutoWiringModule` into your kernel, and the extension re-wires the kernel components as necessary. A couple caveats:

1. Auto-wiring does not work with implicit self-binding, so you will have to explicitly register self-bindings for all of your types to get Ninject to resolve them.
2. As you might imagine, auto-wiring will slow down activation. However, it's unlikely you'll notice a change in performance unless you're activating millions of instances via Ninject -- and if you are, you might want to rethink your design. :)

## 4. Roll Your Own Heuristics

Ninject is designed to be ultra-customizable. The core is built around a collection of kernel components, which the kernel orchestrates in order to activate types, resolve dependencies, and do all the fun stuff that you've come to love from Ninject. My latest work leading up to 1.0 has been to adjust the model of Ninject to favor composition more over inheritance (a good design principle in general, by the way). Ninject ships with a collection of standard implementations of components, but you are free to remove them and replace them with your own custom implementations. Since most of the components are very granular, this is easier than it may seem... all you need to do is create a type that implements one of the components' interfaces, and connect them to your kernel.

There are four components, called _selection heuristics_, that can be replaced to customize which members are chosen for injection. As you might imagine, they are:

1. `IConstructorHeuristic`
2. `IPropertyHeuristic`
3. `IMethodHeuristic`
4. `IFieldHeuristic`

You may replace any or all of these to take full control over which members are injected. If you'd like to see an example of how to implement your own selection heuristics, take a glance at the code for the auto-wiring extension. (All the extension does is plug in its own selection heuristics when you load the `AutoWiringModule`.)

As always, if you have questions about any of this, feel free to email me at nkohari at gmail dot com or find me on [Twitter](http://twitter.com/nkohari), and I'd be happy to help!
