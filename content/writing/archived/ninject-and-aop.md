---
title: Ninject and AOP
date: 2008-03-17T00:59:00
type: essay
format: instructional
state: archived
category: ninject
---

{% lead-in %}I put in some time last night{% /lead-in %} and this morning to add the beginnings of interception/aspect-oriented programming support to Ninject. The development is being done in a [feature branch](http://ninject.googlecode.com/svn/branches/aop/) off the main trunk, and is still pretty unstable, but feel free to check it out and let me know what you think.

As you might expect, Ninject's interception support is attribute-driven, like most of the rest of the system. The first time a type is activated, both the class definition itself and all of its public methods are examined for any attributes that inherit from `InterceptAttribute`. These become part of the type's activation plan in the same way as injection directives. If you decorate a single method with an interception attribute, only that method will be intercepted (obviously). However, if you put the attribute on the class, all of its public methods will be intercepted. There's also a `DoNotInterceptAttribute` that can be added to method definitions to indicate that interceptions should be skipped for them.

More coming once I get the code a little more stable, but feel free to tinker in the meantime. By the way, if you're interested in following the development of Ninject, or getting involved in the project, join one of the Google groups:

- General discussion: [http://groups.google.com/group/ninject](http://groups.google.com/group/ninject)
- Development and commits: [http://groups.google.com/group/ninject-dev](http://groups.google.com/group/ninject-dev)

I'm always interested in hearing feedback and new ideas. Patches are also encouraged. :D
