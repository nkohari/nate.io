---
title: Convenience Kills
subtitle: With software, maintenance is the real cost.
date: 2008-08-19 21:43:00
category: software
song: spotify:track:36HA2woC1glnLa4vqWY3IC
---

<span class='drop-cap'>A rather heated discussion</span> erupted last week on Twitter and IRC concerning so-called "drag-and-drop demos" -- point-and-click demonstrations of "software development" that just involve dragging controls around on a graphical designer without a lot of actual coding involved. Being entirely unable to resist joining in on debates, I had to chime in and give my two cents.

At root, drag-and-drop (D&D) demos are really nothing more than a marketing tool, and they do little to illustrate the actual way software is written. It's kind of like the scene in Swordfish where the main character is "programming," but all the audience actually sees is a spinning cube with nodes flying on and off. Why? Because real software development isn't interesting in the least to a layperson. Real software development means hammering away on a keyboard for hours, drawing squiggly boxes on a whiteboard, and debating design with your team. People with passion for software relish this process, but if you don't understand what you're looking at, I imagine watching it would be pretty mind-numbing.

This is also why programming, sadly, will never be an Olympic sport, nor will we tune in on Sundays to National Software League competitions. :)

D&D demos, on the other hand, provide visual indicators and guides which allow people with any level of technical skill to understand the basic process. However, any software developer will tell you that drag-and-drop tools fall _very_ far on the 80% side of the 80/20 rule -- the second you try to do something more complex (read: useful), you _have_ to write code.

This is why D&D demonstrations are actually _extremely dangerous_. They only serve to blow smoke up the asses of non-technical people, and _convince them that software development is easier than it actually is_. For example, let's say a non-technical manager sees a demonstration of ASP.NET WebForms, with a data-bound grid control. It can become very difficult to convince them that, in order to support our actual requirements, we need to create a real domain model, and write the HTML directly so we can get better support for CSS, and write some tests so we can make sure it actually does what we claim. None of that was in the product demonstration, so it's not surprising that non-technical people balk at estimates that include more of the nitty-gritty tasks.

I'll take this argument a step further, also, and say that all tools geared around RAD (rapid application development) are harmful when considered out of context. Microsoft in particular has had a long-standing obsession with RAD, and you can see it in many of the graphical features of Visual Studio. Since the vast majority of the work on software is maintenance and extensibility, rapid development is the antithesis of good software design. If tool vendors were really interested in making software developers' lives easier, they would focus more on providing features to _maintain software_ rather than develop it quickly and shove it out the door. That's why refactoring tools like ReSharper have become so popular -- their entire focus is on making it easy to mold your code into a useful application.

However, vendors are in business to make money, and RAD tools are much easier to sell than tools for refactoring. You can only sell a refactoring tool to someone that understands code, but you can sell a RAD tool to anyone -- "look how fast we wrote this useful application!" I'm not faulting Microsoft or other vendors for wanting to make money, and I'm not saying that drag-and-drop tools are never useful. If you're writing disposable code, that you're certain you're going to throw away, there's nothing wrong with slamming something quick and dirty out. If you're writing something for keeps, though, you better spend at least a few cycles thinking about how to make it maintainable.

Writing software is _all about managing change_. You start by building a core, and then you start building layers on top of it. With each added feature, you are applying changes to the application as a whole. This is why most of the tenets of good software design focus on limiting the impact of change on your system as a whole -- or _maximizing orthogonality_, if you prefer. This is true throughout the software's life, both before and after the initial release  (the only real difference being the risk associated with adding each change).

Real software design _cannot be drag-and-drop_, because it's an organic process, where your code is molded, sculpted, and cultivated over time. I commonly refer to _malleable_ software, which evokes the right idea -- flexible software that can be molded into something that solves your business problem. I would argue that there will never be a visual design tool that is more effective long-term than writing code manually, or at least not in the foreseeable future.

The bottom line is that the more you can limit the impact of change, the more easily you can mold and sculpt your software. The idea of RAD and drag-and-drop tools are only smoke and mirrors that mask the real difficulties that go into creating good software.
