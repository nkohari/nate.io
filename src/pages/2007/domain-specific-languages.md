---
title: Domain-Specific Languages
date: 2007-06-19 04:23:00
category: dotnet
---

<span class='drop-cap'>I just read</span> [this post](http://codebetter.com/blogs/jeremy.miller/archive/2007/06/17/a-train-of-thought-june-17-2007-edition.aspx) from Jeremy Miller, and was happy to see that he suggested adding embedded domain-specific languages (EDSLs) to [Roy Osherove's ALT.NET Hot/Not](http://weblogs.asp.net/rosherove/archive/2007/06/04/alt-net-alternative-tools-and-approaches-to-mainstream-net.aspx) list. For those not familiar, an EDSL is a creative use of a programming language that makes the code required for a specific task more like natural language. (Fowler has a much better definition [here](http://www.martinfowler.com/bliki/DomainSpecificLanguage.html).) The first time I really saw the power of an EDSL was when I used [NUnit 2.4](http://www.nunit.org/), which lets you type things like:

```csharp
Assert.That(foo, Is.Not.Null);
Assert.That(bar, Is.Equal.To(42));
```

After seeing the way [Guice](http://code.google.com/p/google-guice/) used the Builder pattern and an EDSL to drive its type binding mechanism, and after reading this [great paper](http://www.mockobjects.com/files/evolving_an_edsl.ooplsa2006.pdf) on the evolution of the [JMock](http://www.jmock.org/) EDSL, I decided to implement my own in Titan.

Titan's EDSL is really what gives the contextual binding system its power. For example, compare this:

```csharp
Bind<IService>().To<ServiceImpl>().When.Member.Type.Namespace.StartsWith("MyCompany.ProjectA");
```

To this (similar to an early version of Titan's XML configuration):

```csharp
<binding
  service="MyCompany.ProjectA.Services.IService, MyCompany.ProjectA, Version=1.2.3.4"
  implementation="MyCompany.ProjectA.Services.ServiceImpl, MyCompany.ProjectA, Version=1.2.3.4">
  <condition
    type="Titan.Kernel.Conditions.MemberNamespaceStartsWithCondition, Titan.Kernel"
    value="MyCompany.ProjectA"/>
</binding>
```

The latter is much uglier, slower, requires much more effort, and blocks you from using the power of the IDE for statement completion and type-checking. Not only that, but I (or more likely, an unlucky developer that decided to use Titan!) would have to create a different condition type for each possible condition. There wouldn't be the slick re-usability that Titan's EDSL has via its `ConditionBuilders`. The way the internals of Titan's EDSL works is particularly interesting, and may be the topic of a near-future post.

EDSLs are starting to gather steam in other developer communities, particularly Ruby. I think it's very important that when you're looking for a fresh solution to a problem, that you look outside your comfort zone.
