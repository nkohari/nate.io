---
title: Bait-and-Switch and Software Licenses
subtitle: My thoughts on ExtJS's decision to suddenly change their licensing.
date: 2008-05-02 18:18:00
category: open source
---

<span class='drop-cap'>Jack Slocum</span> and the rest of the [Ext JS](http://extjs.com/) team recently released version 2.1 of their fantastic toolkit. If you're not familiar with Ext, it's a user interface library that lets you write rich Internet applications (RIAs) using JavaScript. It's more than jQuery or Prototype, in that it gives you full-fledged components like dialogs, grids, and trees in addition to the typical animation and language-enhancement features of the other JS libraries. If you develop RIAs and you haven't tried Ext, I highly recommend you check it out.

That being said, the Ext team slipped in a little surprise with their latest release. Up until version 2.1, Ext was released under a dual-license model, with one option being an LGPL-compatible license and the other a commercial license. From this point forward, they've changed the options to GPL (as in, full [copyleft](http://en.wikipedia.org/wiki/Copyleft)) or a commercial license. This means that in order to upgrade to the latest version, all products which had previously relied on Ext will now have to start distributing the source -- of not only Ext, but also their own products -- in order to remain within license.

As you might imagine, this caused [quite a stir](http://extjs.com/forum/showthread.php?t=33096) within Ext's already-quite-large user base. First, let me say that I am absolutely a believer in open-source software. Open-source means you can use the code in your own projects, commercial or otherwise. You can read the code and learn from it. You can contribute patches and ideas, furthering the project's development. However, there is a tremendous difference between what I would call *open-source licenses* (Apache, BSD, MIT, et al.) and *copyleft* licenses like the GPL.

_(Note: some people will disagree and say that GPL is still open-source, but I'm not trying to debate semantics. This post will refer to the two types of licenses separately.)_

Ninject, for example, is open-source (Apache 2.0, actually), and I fully encourage anyone and everyone to use it in as many commercial products as they like. If you make a billion dollars through a product that uses Ninject, I'd appreciate it if you bought me a beer, or maybe my own private jet on 24-hour standby, but otherwise I would be nothing but happy for you. :)

The GPL is fine for things like operating systems and applications, which are essentially standalone. These products aren't going to be re-used in other products. However, libraries, frameworks, and any sort of middleware should *never, ever, ever* be released under a copyleft license like the GPL. Copyleft is viral, in that the second it touches any part of your code, you must open its source. Ostensibly, that is perfectly reasonable, but the difference between closed-source and open-source is a business decision, and a *very* significant one. Your business model determines whether you can or should run your project as open- or closed-source.

Ask yourself: are you really going to build your business model around the license of a library like Ext? My guess is that most people would just find another way, and that discourages adoption of the library. It's true that if people are making money off of Ext, it's reasonable they pay the creators, but changing the license of the library after there are a lot of products that already use it is downright unfair. The Ext team is playing dirty, and people have every right to be upset.

There's nothing wrong with wanting to be compensated for your work, particularly when you create something as widely useful as Ext. However, waiting until version 2.1 to change the license model for your software (not to mention changing it on a point release rather than a full dot-oh) strikes me as a little bit dishonest. Unless we give them the benefit of the doubt, it sure seems like they leveraged the openness of LGPL to get control of market share and build their user base, and then pulled a major bait-and-switch once they locked users in.

Bear in mind, also, that Ext was originally called yui-ext, and was built on top of [YUI](http://developer.yahoo.com/yui/), the Yahoo! UI Library, a BSD-licensed toolkit. Basically, the Ext team stood on the shoulders of open-source, putting on airs as though they were participating, and then when the time was right they slammed the door shut.

Worse yet, the Ext community has contributed back a large number customized components and enhancements to the library. The Ext team hasn't explicitly rolled these enhancements into the core, but they have undoubtedly learned from them and enhanced the code library as a result. I've also seen several cases where people submit code change suggestions (essentially patches) on the forum, which end up being rolled into the core. It's not fair to have it both ways -- accepting outside ideas means you have a responsibility not to screw the people that contribute those ideas.

At best, this is a terrible blunder on the part of the Ext team, and at worst, it's a blatant misuse of open-source licenses. This is not what the GPL and the LGPL were created for. Also, it's cases like this that add to the FUD surrounding open-source. After seeing things like this, I don't blame businesses being afraid of adopting open-source in their products, for fear of the rug being pulled out from under them. And that's not fair to *real* open-source libraries.

Of course, all this nonsense begs the question: how do you GPL a web application, anyway? In a typical website based on Ext, there's client-side code written in JavaScript, which uses Ext for the user interface, and then there's server-side code written in any of a myriad of languages which doesn't come near Ext. Does using Ext on the front-end mean you have to open-source your entire product?

There's all sorts of gray area there, which Jack [desperately tries to explain](http://extjs.com/forum/showthread.php?p=156236#post156236). His reasoning? If your server-side code generates markup, then yes, you need to open-source it. What if the JSON/XML that I send back to the UI influences the layout? Do I need to open that source also? Now I need to employ a whole legal team to try to decipher whether or not I'm GPL-compliant.

Jack tries to defend the decision thusly:

> In the end, we want Ext JS to be open source friendly and still have a good business model in place to grow. The old Ext License was not open source friendly and pretty much killed all options for use in open source projects. That wasn't our goal so we had to address it.

To be perfectly blunt, that's a crock of shit. The only reason the old Ext License wasn't open-source friendly is because it wasn't _really_ the LGPL and therefore not [OSI-approved](http://www.opensource.org/). Why didn't they use the LGPL, you ask? They were worried that someone would [fork](http://en.wikipedia.org/wiki/Fork_%28software_development%29) the project. Tell me again that they weren't planning this all along.

Oh, and by the way, they're not opening up the project's Subversion repository. You can download official releases, but you can't have direct access to the latest builds -- unless you buy a commercial license. That's technically fair, but doesn't exactly jive with the concept of open-source.

On one hand, I feel for Jack, who has been a target of personal attacks because of this license change. He attempts to defend himself on [his blog](http://jackslocum.com/blog/2008/04/26/ext-js-license-change-and-personal-attacks/). However, it's easy to see why people are upset, and I can't believe he didn't see it coming. I understand that you need to protect your intellectual property, but you need to recognize that open-source is a give-and-take (quid pro quo, as [the Ext site says](http://extjs.com/company/dual.php)) -- you give users free access to the library, and in exchange you get community support and good ideas. Changing from LGPL to GPL doesn't protect the library from being misused by "major companies", either. Sorry Jack, but they're still banking on the fact that you don't have the money to sue them.

To be fair, it does look like they're considering a [FLOSS exception](http://www.mysql.com/about/legal/licensing/foss-exception.html) like MySQL has, so non-copyleft open-source projects can continue to use the library. Why even change, then? You're going to end up with essentially the same outcome as a result.

Using the GPL in this way arguably causes a chilling effect not unlike closing the source completely. By requiring users to release their source, you are shutting out a potential segment of users. It's very easy to see that if Ext had been licensed under the GPL since inception, it would not have nearly the mind-share it does today.

Since I use Ext in my "day job" in for-profit products, we were happy to buy a commercial license. However, now that it's licensed under the GPL, its much more difficult for me to consider using it in side work or hobby projects.
