---
title: Broken Windows, Dirty Dishes
subtitle: If you want to avoid technical debt, stop vandalizing your codebase.
date: 2013-02-17 12:00:00
category: the psychology of software
---

<span class='drop-cap'>I’m terrible at cleaning</span> the kitchen. Much to my wife’s chagrin, I tend to leave dirty dishes in the sink for days at a time. I’m not the most organized person ever, but I have standards: I don’t leave dirty dishes laying around the house. So why is it so hard for me to keep the kitchen clean?

Well, we eat a meal, and then we put the dishes in the dishwasher. When the dishwasher is full, I run it to clean them. Everything to this point is fine. The problem is, when the dishwasher is done running, I don’t immediately unload the dishes. Then, as we generate new dirty dishes, they go into the sink. Eventually we’re taking clean dishes out of the dishwasher when we need them, and the sink is full of dirty dishes.

*(At this point I feel that I need to interject and say yes, obviously I know that what I need to do is unload the damn dishwasher. I’m not here to talk about why I’m too dense to put the clean dishes away, I’m using it as an allegory for a larger point thankyouverymuch. Sheesh!)*

Awhile back, it occurred to me that the real problem doesn’t start with a sink full of dishes. It’s the first dirty dish that gets put in the sink. Once one dish is in there, it’s so much easier to put another, and another, until the sink is full of dirty dishes. [^Now, four years after I originally wrote this, I'm happy to say that I (mostly) don't do this anymore.]

Turns out that this deviant behavior of mine is explained by a simple psychological theory called the broken windows theory. It suggests that the presence of broken windows in a neighborhood leads to higher crime, in particular vandalism, even in neighborhoods that are not typically predisposed to criminal behavior. Once that first window is broken  -- or that dirty dish is put into the sink  --  psychologically, we are much more likely to lower our standards and accept disarray as the state of affairs.

You can see this behavior everywhere. For example, I bet the interior of your car falls into one of these two groups:

1. It’s pristine, with maybe a couple of gum wrappers in a cup holder.
2. It’s a disaster area, with junk laying all over the back seats and floor.

It’s rarely in between. Our minds can tolerate a small amount of disorder, but once you get accustomed to those couple of receipts on the floor, pretty soon all bets are off and you’re lucky if the CDC doesn’t wrap it in red biohazard tape within a week.

So wait, let me see... I had a point here somewhere. Oh, right, software!

Turns out this broken window stuff doesn’t just apply to vandalism and car interiors and me being a lazy good-for-nothing about cleaning the kitchen. It also applies to programming. Once a window is broken in your codebase ,  whether from a software engineering perspective or just simple aesthetics ,  the overall quality of the product can drop precipitously.

Sure, maybe you hack out a 500-line function to get something done fast, saying to yourself that you know you need to come back and fix it later. As long as you know it’s technical debt, it’s perfectly okay, right?

Except then, you get distracted by one of the other 24,012 things you have to do, and forget all about your hack. Months later, another developer comes along, and your 500-line function looks like a big pile of dirty dishes in the kitchen sink. They say to themselves, *"Wow, someone really should clean this mess up... but I’m really busy and I just need to make a quick fix. I’ll just hack it in and we can clean it all up someday."* They just stack their own dirty dish precariously on top of the pile and back away slowly.

Technical debt is a reality in every project. Sometimes you have to cut corners to get software shipped. The trick is to have clearly-delineated "clean" and "dirty" areas in your codebase. Then, everyone just has to follow the rule that a "clean" area can’t have any broken windows.

Also, sometimes software gets patched on for so long, it becomes easier to create a new "clean" area and start rewriting pieces of the project there. It can be daunting to start rewriting software that’s already working, but when changes to a project are needed, a welding torch is cheaper and provides better results than 1,000 rolls of duct tape.

Now that I’ve sufficiently mixed my metaphors into a fine metaphor smoothie, I’ll just say: try not to leave any broken windows in your own work. And unload the damn dishwasher.
