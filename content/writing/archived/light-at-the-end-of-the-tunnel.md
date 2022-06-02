---
title: Light at the End of the Tunnel
date: 2007-12-17T00:29:00
state: archived
type: instructional
category: dotnet
---

{% lead-in %}One of my pet peeves{% /lead-in %} are blog posts where the writer says, _"Don't worry, I'm not dead, I just haven't posted in awhile."_ I promise this won't be one of those, in spite of the fact that it's been a few months since last time I've written anything.

Work has been particularly taxing for the past couple of months... actually, as I write this, I'm on a flight to Las Vegas for our first field test of the system that my team and I have been writing since the end of summer. It hasn't been easy, but I think we've got a great piece of software. Hopefully, any bugs will present themselves in Vegas, and we can fix them up before we go live in January.

In spite of being difficult, this project has actually been a lot of fun to work on. We've been able to use some really interesting technology, and apply it in particularly creative ways. I mentioned the different pieces of software we were using already, but we've added some things since then. The product uses handheld computers to capture data, and transmit it back to mobile servers via a wireless LAN. Since the area that the handhelds need to be used in is pretty large, the system is designed to operate "disconnected," meaning the handhelds can queue messages and transmit them whenever they come back within range. The entire system has to be mobile as well, so the servers are broken down and moved between locations. That means a whole bunch of data migration and synchronization logic, not to mention importing data from existing legacy systems --- specifically, manufacturing machinery.

Originally, we had intended on writing two interfaces to the system, one in WinForms, and one in ASP.NET. In the meantime, one of the developers mentioned the absolutely amazing JavaScript library ExtJS. It's by far the best toolkit I've seen for creating rich Internet applications that have the feeling of a thick-client without the bulk. As a result, we ended up wrapping all of the interface into a web site. I admit, working with JavaScript was a bit painful, but I think Ext dramatically improved our efficiency, and made the project work and look great.

The interface was backed by a RESTful architecture written using Castle MonoRail and ActiveRecord. This was the largest project that I've applied NHibernate to, and it was amazing how much easier it made the entire development, not having to work directly with the database. We split off some long-running processes into Windows services, which the web site communicates with via remoting. (I would have preferred WCF, but .NET 2.0 was a requirement. For the next project, I hope to dust off my shiny new MSDN copy of Visual Studio 2008 and crank out some C# 3.0... :)

Our final stack ended up being:

- .NET Compact Framework 2.0 SP2 on Windows CE 5.0, with OpenNETCF to fill in the holes here and there
- ExtJS 2.0
- Castle MonoRail, with the Brail view engine, but mostly just for piping JSON back and forth to Ext
- Castle ActiveRecord for pretty much all data access, except for legacy systems (for that, we went straight to ADO.NET)
- Ninject, integrated into MonoRail
- A custom build of Ninject created for the Compact Framework (first time I've applied IoC in a compact framework environment... very interesting, and very useful!)

This project has definitely made me re-think the way I develop software. I used to be skeptical of RIAs, but I'm starting to believe that in certain situations they can be a dramatic improvement over thick applications.

Another contributor to my changing mindset is the fact that I've been spending my free time (the little of it that I've had) learning Ruby and Rails. My wife and I have started to develop a concept, the end result of which is a web site that should launch in the next couple of months. (If only there were 28 hours to a day...)

Ruby is a fantastic language, and working with it has made me become a little frustrated with the verbosity and rigidity of C# from time to time. (In particular, Ruby blocks are friggin' sweet.) Ruby is the first "dynamic dispatch" language that I can really get behind... I really think it strikes a great balance between flexibility and clarity. I'm no fan boy, though, and I think that the hype does the language a disservice, by distracting from its legitimacy.

I'd love if there was a way to write Ruby for client-side browser code, rather than using JavaScript... :)

Rails is by far the most impressive full-stack framework for web applications that I've ever seen. Certainly, it's not without its problems, but I can definitely see that the buzz has merit. One of the most impressive pieces is the database migration system. Each time we made a change during my "day job" project, I longed for a similar system in .NET. (If someone can tell me how I can bend the space-time continuum to give myself more time to work, I'd be happy to write one. :)

So there it is, my "I'm not dead" post. :) Over the next few weeks, my "day job" workload will be decreasing, so I should be back more often with more inane ramblings!
