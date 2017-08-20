---
title: Ninject 2 and Extensions
subtitle: Keeping the core small and streamlined.
date: 2009-03-19 23:02:00
category: ninject
song: spotify:track:1xb0WhEGZkofL1y0kYcx7d
---

<span class='drop-cap'>As I've mentioned</span> before, while developing Ninject 2, I applied an obsessive minimization process to the development. Ninject 2 was largely a rewrite of Ninject 1, but using most of the same concepts -- just re-written as necessary to be as small as absolutely possible. This minimization, along with leveraging stuff like LINQ and lambdas, has resulted in a very sleek and compact distribution, currently hovering around 82KB when compiled for release.

However, it’s also meant that I’ve had to cut features from the core, which in turn means that extensions are now of the utmost importance in Ninject 2. I’d like to adopt a model similar to the one used in jQuery, in that I handle development and maintenance of the core, and outsource the development of extensions to the community. This means if you have an idea for a cool extension to Ninject, you’ll just be able to write it, and publish it to the Ninject website (eventually).

This also means that I’m toying with different ideas for discovering and loading extensions when you spin up the kernel. I’ve tried a few things but keep gravitating towards an automatic extension loading solution, in which Ninject looks at all of the DLLs in the directory you have the Ninject.dll in for assemblies that have a NinjectExtensionAttribute. Because of the lack of raw metadata reading in the CLI, this also means that Ninject has to spin up a separate AppDomain to scan the DLLs without loading everything into the primary AppDomain.

My main concern is that this might be too magical or “heavy” for Ninject. One obvious possibility is to create an option that will control automatic extension loading, which is used like this:

```csharp
var settings = new NinjectSettings { LoadExtensions = true };
var kernel = new StandardKernel(settings, ...);
```

So all in all I pose two questions to you, dear reader:

1. Is automatic extension loading too magical, or too heavy for Ninject?
2. If it’s controlled by an option, should the default be _on_ or _off_? That is, should you _opt-in to_ or _opt-out of_ extensions?

This and any other feedback, as always, is greatly appreciated.
