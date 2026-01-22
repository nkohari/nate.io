---
title: Defending Dependency Injection
date: 2007-08-16T19:07:00
state: archived
type: essay
format: instructional
category: dotnet
---

{% lead-in %}A few days ago{% /lead-in %}, I read [an article](http://scruffylookingcatherder.com/archive/2007/08/07/dependency-injection.aspx) by Jacob Proffitt about dependency injection. In the article, Jacob questions whether there are real benefits of dependency injection (DI) above and beyond additional testability. I challenged his stance in a comment, and he replied. I highly suggest that you read the article and the comments, because he's posing a very good question.

First, a couple of definitions, in case you're not familiar:

1. [Cohesion](http://en.wikipedia.org/wiki/Cohesion_%28computer_science%29) is the measure of semantic similarity between the code in a given logical segment. Highly-cohesive code is better code. (See also the [Single Responsibility Principle](http://en.wikipedia.org/wiki/Single_responsibility_principle), the optimal level of cohesion in object-oriented software.)
2. [Coupling](http://en.wikipedia.org/wiki/Coupling_%28computer_science%29) is the measure of how much a given logical segment of code relies on other segments. Loosely-coupled code is better code.

Essentially, Jacob asserts that dependency injection raises the coupling in your code by pushing the need to understand dependencies of a given type outside of the type itself. As he says:

> How can you say that dependency injection...creates loosely coupled units that can be reused easily when the whole _point_ of DI is to require the caller to provide the callee's needs? That's an increase in coupling by any reasonable assessment.

This was _precisely_ my first thought when I was originally exposed to the idea of dependency injection, because it goes directly against what we've been taught about object-oriented programming. The principle of encapsulation, one of the pillars of object-oriented design, states that if information doesn't need to be exposed publicly from a class, it should be hidden from any code that consumes it. Encapsulation of data and logic is great, because it reduces the surface area of your classes, making it easier to understand how they work, and more difficult to break them. Here's the secret that makes dependency injection worthwhile:

_When it comes to dependencies, encapsulation is **bad**_.

Consider the following code:

```csharp
public abstract class Engine { ... }
public class V6Engine : Engine { ... }

public class Car
{
  private readonly Engine _engine;
  public Car()
  {
    _engine = new V6Engine();
  }
}

public class Program
{
  public static void Main()
  {
    // Car will always have a V6 engine.
    Car car = new Car();
  }
}
```

There's nothing "wrong" with this code. It works fine, and shows good use of polymorphism. But your `Car` type, by definition, will always have a V6 engine. But what happens if you need to create a car with a four-cylinder engine? You have to modify the implementation of the `Car` type. What if it was implemented by a third party and you don't have the source?

Contrast the previous snippet with this one:

```csharp
public abstract class Engine { ... }
public class V6Engine : Engine { ... }

public class Car
{
  private readonly Engine _engine;
  public Car(Engine engine)
  {
    _engine = engine;
  }
}

public class Program
{
  public static void Main()
  {
    Car v6car = new Car(new V6Engine());
    Car acuraTsx = new Car(new VTECEngine());
  }
}
```

Now we can create all sorts of cars with all sorts of engines. If you're a GoF fan, this is actually the Strategy pattern. Dependency injection (in my perspective) is basically the Strategy pattern used _en masse_.

However, as Jacob has pointed out, all we've done is pushed the requirement for creating an `Engine` out into the code that consumes our `Car` class. Jacob is 100% correct in saying that this increases your coupling. Now, instead of `Car` being the only type coupled to `Engine`, both `Car` and `Program` are essentially coupled to `Engine`, _because to create a `Car`, you must first create an `Engine`_.

This is why dependency injection frameworks like [Ninject](http://ninject.org/), [Castle Windsor](http://castleproject.org/), and [StructureMap](http://structuremap.sourceforge.com/) exist: they fix this coupling problem by washing your code clean of the dependency resolution logic. In addition, they provide a deterministic point, in code or a mapping file, that describes how the types in your code are wired together.

This leads me to my assertion that dependency injection leads to creating loosely-coupled and highly-cohesive code. Once you start writing code that relies on a DI framework, the cost required to wire objects together falls to next to zero. As a consequence, hitting the goal of Single Responsibility becomes exponentially simpler. Put another way, _you are less likely to leave cross-cutting logic in a type where it doesn't belong_. Your `MessagingService` needs configuration? No problem, write a `ConfigurationService` and add a dependency to it. Better yet, make your `MessagingService` dependent on an `IConfigurationService` interface, and then later when you're reading configuration from a database rather than an XML file, you won't have to go through each of your services and rewrite their configuration logic.

Jacob also asks why we don't just use a Factory pattern (much like the provider model in ADO.NET, which he uses as an example in his article). Factory patterns are great for small implementations, but like dependency-injection-by-hand it can get extremely cumbersome in larger projects. Abstract Factories are unwieldy at best, and relying on a bunch of static Factory Methods (to steal a phrase from [Bob Lee](http://crazybob.org/)) gives your code "static cling" --- static methods are the ultimate in concreteness, and make it vastly more difficult to alter your code.

I mentioned in the comment on his article that I saw the "light" when it came to dependency injection, and Jacob asked me to share the light with him. Here it is: _simply put, dependency injection makes your code easier to change._ That's why it's so popular in Agile crowds, whose whole software development practice is geared around quick alterations in path.

Is it a silver bullet? No. Is it the only way to make code easy to change? No. Is it the best way? Maybe not. But it's the best I've seen so far.
