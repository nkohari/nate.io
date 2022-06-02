---
title: Ninject 1.0 Goes Gold
subtitle: It's ready for production!
date: 2008-06-18T04:33:00
state: archived
type: instructional
category: ninject
---

{% lead-in %}It's always great to watch an idea mature{% /lead-in %} from its first conception. About 18 months ago I began work on the first version of Ninject, which was then called Titan. It's gone through a lot of iterations and all sorts of changes along the way, but today I'm happy to announce that Ninject 1.0 has officially gone gold and is [available for download](http://ninject.org/).

I've put in a lot of effort over the past couple of months to make Ninject multi-platform. One of the original goals of the Ninject project was to create a light enough framework that dependency injection was viable anywhere you could run a CLR. I'm proud to say that 1.0 supports the following platforms:

- .NET Framework 2.0, 3.0 and 3.5
- .NET Compact Framework 2.0 and 3.5 (Ninject.Core and Ninject.Conditions)
- Silverlight 2.0 beta 2 (Ninject.Core, Ninject.Conditions, and all shipping extensions)

The same codebase is used for all supported platforms, with certain features turned off when the platform doesn't support them. Unless I'm mistaken, Ninject is the first dependency injection framework to officially support the .NET Compact Framework or Silverlight, and this is no small feat. Kudos to [Mike Eaton](http://www.michaeleatonconsulting.com/blog/) for kicking me in the right direction by encouraging me to provide Silverlight support. :)

It's rare that open source software reaches a full version 1.0, instead preferring to remain beta-0.999 or release candidate 63. I'm not sure why that is; maybe open source developers are just too aware of the deficiencies of their software and are afraid to claim that the product production-ready. I've personally used Ninject in production systems for over a year now, and by now I'm very confident that it's ready for prime time.

I've also taken the opportunity to re-launch the [Ninject website](http://ninject.org/). At the Cleveland Day of .NET, [Brian Prince](http://brianhprince.blogspot.com/) mentioned that he was frustrated that many open source project websites don't contain any information about what the product is or does. I've tried to fix that with the new design, introducing some value propositions that I think explain how Ninject can help you write sleek, well-designed software that can stand the test of time.

So, what are some of the features of Ninject 1.0?

- Constructor, property, method, and field injection
- Instantiation behaviors (singleton, one-per-thread, one-per-request)
- Fluent interface for declaring type bindings
- Contextual bindings, where the selection of which type to instantiate can be delayed until activation
- Support for instance scope and deterministic disposal
- Fully pluggable, modular design: each kernel component can be easily replaced to alter the framework's behavior
- Lightweight interceptor support (aspect-oriented programming)
- Integrations with other popular frameworks

I'd like to thank all of the companies and individuals that have contributed to the project, whether it's been bug reports, patches, or software licenses. Please take some time to look at the products of the companies listed on the [sponsors page](http://ninject.org/sponsors/).

I'd also like to dedicate this release to my wife Niki, who has been understanding enough to put up with me hammering away at a keyboard for hours on end late at night. (She also helped me put together the cool products available in the Ninject store!) I love you sweetie. :)

Anyhow, grab [the software](http://ninject.org/download), check out [the manual](http://ninject.org/learn), join in on [the discussion](http://ninject.org/discuss), and by all means, [buy some swag](http://ninject.org/store)! :)
