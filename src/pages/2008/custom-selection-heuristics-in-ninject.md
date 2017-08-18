---
title: Custom Selection Heuristics in Ninject
date: 2008-10-14 05:50:00
category: ninject
---

<span class='drop-cap'>I haven't blogged</span> about Ninject for awhile, but that doesn't mean that the project is entirely dormant. :) Version 1.5 will be coming out relatively soon, but I wanted to give a preview of a new feature that I think is pretty damn cool. It's currently available in the [Subversion trunk](http://ninject.googlecode.com/svn/trunk/) if you'd like to flex the bytes yourself.

Every dependency injection framework needs to have some sort of convention or marker to indicate _dependencies_ -- spots where the framework should resolve a value to inject. When I originally wrote Ninject, I made the decision to use `[Inject]` attributes as this marker. In fact, I still advocate the use of attributes to indicate dependencies, because I like the declarative nature. I've found that even if you don't completely understand Ninject, or dependency injection in general, using attributes at least indicates that a value comes from somewhere. It can be a great _conversation starter_ -- something you put in your code that when another developer sees it, it makes them ask questions.

Anyhow, I've found that the reliance on attributes was a major turnoff to other people. Ninject has always been (and will remain) [opinionated software](http://gettingreal.37signals.com/ch04_Make_Opinionated_Software.php), but I'll always add flexibility as long as I'm not compromising the core goals of ease of use and efficiency. As a result, I've been building in more control over these _selection heuristics_ -- the conditions that Ninject uses to test members of a type to determine which should be considered injectable members. The first step of this was to create the auto wiring extension, which alters the heuristic to determine whether a binding exists for a given member's type -- and if so, it will inject it.

Ninject 1.5 builds on this idea by moving to a _collection_ of heuristics rather than just one. Now, when Ninject examines a member on a type to determine if it should be injected, it evaluates all of the related heuristics, and if any of them match, the member will be injected. There are now also two levels of heuristics:

1. **Global heuristics**: As the name suggests, these apply to all bindings. You set them directly on the newly-created `IMemberSelector` component.
2. **Binding-level heuristics**: These are set directly on a specific binding, so you can set up your own conventions for a specific type.

When examining a member, the member is first tested with the global heuristics, and then with the binding-level heuristics for the binding that is being used to activate the instance.

Heuristics are specific to the type of member they inspect. The types of members that Ninject considers are constructors, properties, methods, and fields, and each has a matching type of heuristic. When a property is considered for injection, Ninject will only test it using all applicable `IHeuristic<PropertyInfo>`s, but won't consider `IHeuristic<ConstructorInfo>`s, for example.

The easiest way to control heuristics _en masse_ is by defining your own `IMemberSelector`. By default, Ninject uses the `StandardMemberSelector`, which registers heuristics that look for the `[Inject]` attribute on the members -- or, if you've overridden the attribute via `KernelOptions`, it will examine that. However, if you prefer a more conventions-based approach, you can use the `ConventionMemberSelector`:

```csharp
public class OurKillerAppMemberSelector : ConventionMemberSelector
{
  public override DeclareHeuristics()
  {
    InjectProperties(When.Property.Name.StartsWith("Foo"));
    InjectConstructors(When.Constructor.HasAttribute<MarkAttribute>());
    InjectMethods(m => m.Name.Length < 4);
  }
}
```

This will cause all properties beginning with _Foo_, and all constructors with the (fictional) `[Mark]` attribute to be injected. Methods with names less than 4 characters will also be injected, as as you can see, you can specify conditions using lambdas (predicates) instead of using the conditional infrastructure.

If you want finer-grained control over your selection heuristics, you can also declare them on individual bindings as I said before:

```csharp
Bind<IService>().To<ServiceImpl>()
  .InjectConstructors(c => c.Arguments.Length == 1)
  .InjectMethods(When.Method.Name == "Prepare")
  .InjectProperties(p => p.Name.EndsWith("Service"))
```

In this situation, when Ninject activates an instance of `ServiceImpl`, it will call the constructor on the type declared with one argument. It will then call the method called _Prepare_ (resolving values for each of the method's arguments), and resolve and inject values into each property whose name ends in _Service_.

Hopefully now you can see why I'm so excited about the new selection heuristics in Ninject. Out of the box, Ninject will continue to rely on the `[Inject]` attribute for simplicity, but you now have an incredible amount of flexibility in setting up your application, your way.
