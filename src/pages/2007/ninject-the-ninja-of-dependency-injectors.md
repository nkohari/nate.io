---
title: "Ninject: The Ninja of Dependency Injectors"
date: 2007-09-04 05:29:00
category: ninject
---

<span class='drop-cap'>Although I've alluded</span> to it several times in the past, I think it's probably about time that I give an official nod to something that's consumed a large portion of my thoughts and free time for the past few months.

Earlier this year, I was researching inversion of control frameworks for both my day job (at the time) and my own personal projects. Dependency injection is a technique rarely applied to small projects, and as such, all of the existing solutions seemed as though they would outweigh any application that I was interested in integrating them into. Since first being exposed to inversion of control and dependency injection, I quickly came to believe in it as a strategy that can be effectively applied to all sorts of projects, large or small.

This is one of the great things about open source software. The existing solutions didn't work for my solution for various reasons, but I was able to study them and understand what made each of them great. Then, I added a little bit of my own magic to the mix, and the result was a project called _Titan_. Why Titan? As I recall, it was the first word I thought of at the time, and it sure sounded cool. It also was completely counter-intuitive to the intent of the goals of the project. I needed something that was ultra-lightweight, and simple enough to jam into any old project.

As I was working on one of the early builds of Titan, [Bob Lee](http://crazybob.org/) and [Kevin Bourrillion](http://smallwig.blogspot.com/) released their [Guice](http://code.google.com/p/google-guice/) framework. I was impressed by the simplicity of their solution, and their fluent interface approach became the first type binding mechanism available in Titan. Eventually, Titan was renamed to _Ninject_, which has the dual meaning of ".NET injector" and has a nice embedded ninja reference -- which, in addition to being more suited to the speed and focus of the framework, is also just plain cool. :)

In addition to absorbing some great ideas from some very smart people, Ninject also introduces an idea that was floating around in my head as I was originally learning about dependency injection: _contextual binding_. Simply put, Ninject is aware of the environment and the situation when resolving dependencies, and is able to apply a conditional system to inject instances of different types depending on who requested them, when, where, or how.

Everyone loves bullet points, so here are a few. Ninject is:

1. **Focused.** Too many existing dependency injection projects sacrifice usability for features that aren’t often necessary. Each time a feature is added to Ninject, its benefit is weighed against the complexity it adds to everyday use. Our goal is to keep the barrier to entry – the baseline level of knowledge required to use Ninject – as low as possible. Ninject has many advanced features, but understanding them is not required to use the basic features.
2. **Sleek.** Framework bloat is a major concern for some projects, and as such, all of Ninject’s core functionality is in a single assembly with no dependencies outside the .NET base class library. This single assembly’s footprint is approximately 100KB when compiled for release.
3. **Fast.** Instead of relying on reflection for invocation, Ninject can take advantage of the lightweight code generation features in version 2.0 of the CLR. This can result in a dramatic (8-50x) improvement in performance in many situations.
4. **Precise.** Ninject helps developers get things right the first time around. Rather than relying on XML mapping files and string identifiers to wire up components, Ninject provides a robust domain-specific language. This means that Ninject takes advantage of the capabilities of the language (like type-safety) and the IDE (like IntelliSense and code completion).
5. **Agile.** Ninject is designed around a component-based architecture, with customization and evolution in mind. Many facets of the system can be augmented or modified to fit the requirements of each project.
6. **Stealthy.** In spite of its use of .NET attributes, Ninject will not invade your code. You can easily isolate the dependency on Ninject to a single assembly in your project.
7. **Powerful.** Ninject includes many advanced features. For example, Ninject is the first dependency injector to support _contextual binding_, in which a different concrete implementation of a service may be injected depending on the context in which it is requested.

If you're interested in learning more about Ninject, or taking it for a spin, here are some links of interest:

* [Project Homepage](http://ninject.org/)
* [Subversion Repository](http://svn.ninject.org/trunk)
* [User's Guide](http://ninject.org/users-guide.html) (still under development, but getting there)
* Google Groups: [Users](http://groups.google.com/group/ninject) and [Development](http://groups.google.com/group/ninject-dev)

If you're interested in learning about dependency injection, and want a quick and easy solution that doesn't require a bunch of XML files or adding 1MB+ of dependencies to your project, take a look at Ninject. I'm also very interested in feedback, so if you have ideas, feel free to comment on this post or join the discussion in one of the Google groups.
