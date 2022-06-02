---
title: A Few Lessons Learned
subtitle: Some were learned the hard way.
date: 2009-08-19T06:08:00
state: archived
type: instructional
category: agilezen
song: spotify:track:3tcaltthSz9s6awB6koVRo
---

Running a business is nothing if not a learning experience. Every day presents a situation that you haven’t encountered before, and you have to be ready to shift your perspective and learn quickly in order to adapt. Here are a few tidbits of information that I’ve learned (sometimes the hard way) so far as we’ve been running [Zen](http://agilezen.com/).

## Save more information than you think you’ll need.

Disk space is cheap, and it’s much more difficult to migrate (or generate) missing data after-the-fact than it is to collect it when something happens. At a minimum, you should have a transaction table that captures everything that happens in your system. That way, you can always use this table as a last resort to create new data if you need to in the future. Be sure to listen when your conscience says [YAGNI](http://en.wikipedia.org/wiki/You_Ain), but _never trade off knowledge for extra disk space_.

## Soft-delete everything.

Instead of actually deleting information from your database, just flag it with a “tombstone” and leave the record there. Not only does that allow you to recover data if a user accidentally deletes it, but maintaining the relationships between entities makes managing the data much simpler. Sure, you end up with stale data in your database, but you can always prune it after a certain period of time to clean things up --- and since this pruning operation takes place out-of-band, if it doesn’t work perfectly your users aren’t bothered by it.

## Don’t underestimate the cost of meta-work.

Not everything that is necessary is customer-facing, or even directly related to the product. I refer to work that’s important, but not quite value-adding, as _meta-work_. For example, one of the most complex parts of the Zen codebase is actually the billing system --- customers don’t interact with it directly, but they would definitely be upset if Zen randomly billed their credit card! The most important parts of your product _are usually the parts that no one knows exist_ --- that is, until they don’t work the way they should. :)

## Don’t skimp on administrative software.

Information is power, so make sure your system tells you when things happen. Write reporting and management screens. Make your software send you emails when things happen. Balance this against the previous point, but just because something isn’t customer-facing doesn’t make it wasteful --- if an administrative screen or report helps you to serve your customers better, it adds real value. Don’t do too much up front; instead, wait until you recognize opportunities to improve your operations, and pick the low-hanging fruit.

Just a few random thoughts. :)
