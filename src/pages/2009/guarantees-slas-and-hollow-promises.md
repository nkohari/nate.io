---
title: Guarantees, SLAs, and Hollow Promises
subtitle: It might be better not to offer pro-rata refunds for downtime.
date: 2009-12-09 01:36:00
category: agilezen
song: spotify:track:2ir2gcSm7S0H1Fa7oGKfLr
---

Since we launched [Zen](http://agilezen.com/), we’ve received an interesting question a few times from prospective customers: if a company commits to using Zen in their organization, what happens if we go out of business? As a startup, what sort of guarantee can we offer to our users that we’ll be around years from now?

It’s a reasonable question, but one that doesn’t really have an answer. While I’m flattered that someone would accept my word, any promises that I would make would be hollow. That isn’t to say we’re going out of business (far from it, I’m happy to say!) -- but if the recent economic turmoil has taught us anything, it’s that no business is immune to the effects of the market.

Instead of offering hollow promises, we’ve tried hard to set up our business model to allow the only two things that really matter to a customer of a software-as-a-service company like ours:

1. The ability to cancel anytime, for any reason, without penalty.
2. The ability to extract any user-generated content that you added to the system.  

With these two simple rights, customers have a great deal of freedom. By removing the cost of canceling (or at least reducing it as far as we can), we’ve removed a great deal of the power we would otherwise have over our customers. A vendor-consumer engagement is pretty similar to other relationships -- if one side expects a high level of commitment, the other side expects to receive the same level of commitment as well.

Another question we’ve been asked is whether we offer an SLA (service level agreement). If you’re not familiar with SLAs, many companies offer them on subscription-based services to guarantee a certain level of service. They’re usually measured in _nines_ -- for example, _three nines_ would mean the service would be guaranteed to be available 99.9% of the time. If the SLA is violated, it typically means the customer is refunded some pro-rated percentage of their subscription fee, depending on how long the service was unavailable. The customer is also sometimes allowed to terminate a contract without penalty if the SLA is repeatedly broken.

Some people have been shocked to find we don’t offer an SLA, but just because we don’t agree to guarantee a certain level of service doesn’t mean that we don’t care if Zen goes down! Simply put, we don’t offer an SLA because it wouldn’t offer anyone anything real, and we don’t like lying to our customers.

Here’s a quick example. Let’s say we offered a three-nine SLA, so Zen has to stay up for 99.9% of the time or we owe our customers refunds. For a 30 day month, this means Zen can’t be down more than about 43 minutes to remain within the SLA. Let’s also say that if we violate the SLA, we refund the pro-rated amount for the contractually-guaranteed time that we were down.

So, Jane Doe signs up for a Pro account for $29/month. In that month, a nightmare scenario occurs, and Zen is down for _eight hours_. That’s not a usual outage, where we’re down for upgrades or patching the server, this is a full-on, sky-is-falling, dogs and cats living together, mass hysteria sort of situation.

With a pro-rata refund SLA, here’s what Jane can recoup:

**100% uptime:** 43,200 minutes     
**99.9% uptime (guaranteed by SLA):** 43,157 minutes     
**Down for 8 hours (480 minutes), actual uptime would be:** 42,400 minutes     
**Missed SLA by:** 43,157 -- 42,400 = 757 minutes     
**We owe Jane:** ( $29.00 / 43,200 ) x 757 = **$0.51**

Again, this is a worst-case scenario, and if Zen was unavailable for that long, refunding fifty cents to our customers is just adding insult to injury. That’s why we don’t offer an SLA. They’re for companies that charge thousands of dollars for their service, or lock their customers in to long contracts.

Not only that, but that SLAs actually create hidden costs for customers. In order to support a strong SLA, a company is forced to do things like set up hot backup servers, clustering, with redundancy in power and network -- not to mention write some sort of instrumentation to determine how long the system was actually down (with redundancy, in case _that_ system goes down).

We pay our hosting facility good money to take care of a lot of those things for us, but high-availability is expensive, and the cost ends up getting passed on to the customer. When a company offers you an SLA, you’re paying extra each month to ensure that if something bad happens, you’ll get some of your money back.

The only guarantee I think it’s fair to offer our customers is that we’ll do the absolute best we can, and that if they’re not happy for any reason, they can always leave with their data intact.
