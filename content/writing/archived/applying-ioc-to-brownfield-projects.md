---
title: Applying IoC to Brownfield Projects
subtitle: Gradually moving towards a better architecture.
date: 2008-06-21T20:19:00
state: archived
type: instructional
category: dotnet
---

There's a [good discussion](http://tech.groups.yahoo.com/group/altdotnet/message/10434) going on in the ALT.NET mailing list about the steps of learning to use a dependency injection framework. The topic got the cylinders firing in my brain about a question I've been asked before: how can inversion of control be applied to _brownfield_ projects --- that is, legacy applications that have been around forever?

First off, understand that inversion of control is something that needs to be designed into your software. It's much more difficult to come in after the software has already been designed and try to inject inversion of control into the mix. That being said, it's certainly possible. Following [Chad Myers'](http://www.lostechies.com/blogs/chad_myers/) lead of creating a list of phases, here's my suggestion for the process:

1. Create a service locator backed by your favorite DI framework --- which, of course, should be Ninject! ;) In my [last post](/2008/playing-nice-with-service-locators), I explained how to accomplish this with Ninject, but the same idea can be applied to other DI frameworks just as easily.
2. Find all instances of _the problem of creation_ --- where dependencies are being created from within the implementation of the types that depend on them --- and replace them with calls to your service locator.
3. Remove all lifecycle concerns (artifacts of instantiation behaviors) from your types. For example, if you've got the Singleton pattern with the traditional `MyService.Instance` construct, **get rid of it** and start using the framework instead.
4. Increase your application's _cohesion_. Find classes that violate the Single Responsibility Principle and break them into multiple classes to get better separation of concerns.
5. Decrease your application's _coupling_. Within reason, follow the Interface Segregation Principle and replace any interactions between concrete types with interfaces.
6. Gradually shift from your reliance on the service locator to the dependency injection framework itself. Typically, this can be done by exposing the dependencies of a type on the type's constructor, and using the framework to resolve and inject them. This will decouple your types from your service locator, and unlock some of the more powerful features of the framework.

The most important thing to remember is that dependency injection is a mindset. You have to let it alter the way you write your code to be successful at using it. Also, as you start to rely on it as a pattern, you will see it start to spread and "infect" your codebase. As long as it still feels natural to work with, this is a _good thing_, because it means you're achieving success in making your application more flexible. Trust the framework and let it help you do your job!
