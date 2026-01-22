---
title: Looking Back
subtitle: A few lessons learned from the short life of our startup.
date: 2010-08-26T07:14:00
state: archived
type: essay
format: instructional
category: agilezen
song: spotify:track:2gcqVTesDy08DOB2rV2Odt
---

{% lead-in %}For those who don't know{% /lead-in %}, our startup was acquired by [Rally Software](http://rallydev.com/) at the end of March. As things started to calm down a bit, I remembered that I had a blog, and decided I should look back on my time as a co-founder of a startup.

Launching AgileZen was hard. Well, the act of launching was easy --- all you need to do is deploy your site and tell some people --- it was the lead up to it was difficult. Actually, the hardest part was to convince ourselves that we could actually make this work, and to stay focused enough while still holding a full time job to build enough software to validate the idea. I was fortunate enough to have a great co-founder/wife and a group of friends to be able to keep myself on target.

When I left my full time job in mid-May, we didn't have much. The product wasn't really more than a prototype, and the marketing site was non-existent. We had a good grasp of our business model, but we had no branding and weren't really sure how we were going to sell the product. When I walked away from my job with the idea we'd launch on July 7th, we had six weeks to build something real and convince people to pay money for it.

If I had to guess, I'd say I worked about 500 hours in those six weeks. Niki put in a huge amount of time on design, testing, and copywriting, but she still had obligations at school and most of the hours were spent grinding out code anyway. I have to admit, by the end I was only partially lucid. A few nights I'd wake up in the middle of the night with ideas and, not being able to get back to sleep, I'd get up and start working. Although, that led to some interesting creative moments: the performance screen in AgileZen was one of the last things I built, and at launch, I felt it was one of the better-designed parts of the app.

I'm not complaining, though. Far from it. Building AgileZen in those six weeks was one of the hardest things I've ever done, but I absolutely loved it. It made me remember what it was like to build something because you loved it, not because _nameless customer X_ needed it for _generic business process Y_, and not because it was the next story or defect in the backlog.

It also completely changed the way that I look at software. I've tried to express this to others since, but I think you just have to experience it firsthand in order to really understand. It's a unique experience to build a product of your own, from scratch, with no paycheck or deferred responsibility or venture capital to save you --- you either _create real value_ for your customers, or you _fail_. And I don't like to fail.

To be successful at bootstrapping, you have to cut every feature except those you think are absolutely necessary. Then you cut some that you thought that you absolutely had to have. You compromise your design because you need to get the product to market. You ignore automated testing and documentation because your code is too unstable to be held back by rigorous processes.

I built AgileZen unlike any other piece of software I'd built. I cut corners that I would never have thought of cutting if I was working a day job. And you know what? It didn't matter. We launched on schedule, we crushed our user and revenue goals, and our customers raved about the usability of the product. No one gave a shit about what our test coverage numbers were. Our software made their job or life easier, and that's why they bought it.

Now, I'm not saying every product should be built this way, but it certainly shifted my perspective on what's vital and what's not when building software. AgileZen was built with an architecture that I'm still very happy with, but on top of the strong foundation there was a lot of kludge. That being said, if there was code that was hack-and-slash, I did my best to isolate it. The trick is to know which parts of the app are "load-bearing," so to speak, and which parts can be safely patched together.

After we launched, I spent the month of October basically rewriting every line of JavaScript in the app to create a more maintainable structure. Was it wasteful to throw so much code away? Maybe, but we were up and running, and we were making money. Before we could afford to spend a lot of time to make the software maintainable, we first had to prove that we would actually have to maintain it --- we had to make sure that we actually had a market. Your app can have the best architecture and be 100% defect-free, but if no one cares what it _does_, it's wasted effort.

The key thing I learned was that when your time is so restricted, you can't solve problems that you _think_ you might have some day --- you have to spend all your time on the problems that you have _right now_. You have to have an overall vision to guide you to your goal, but you need to keep a laser focus on the next step towards it.

The last year has been quite an experience. Startup life is stressful and painful and wonderful. I learned more about software and business and myself than I ever expected to. We had a successful exit, which is the brass ring lots of startups look for, so it's easy for me to look back without regret. Still, I think even if we had flamed out it would still have been worth every bit of effort for what I learned in the process.

We love working for Rally, but at some point in the future, we'll be back.
