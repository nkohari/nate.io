---
title: Embracing Emergence
subtitle: My continually-evolving relationship with artificial intelligence
date: 2026-02-17T9:04:00
type: essay
state: draft
format: instructional
thumbnail: big-robot.webp
---

{% image src="big-robot.webp" alt="A psychedelic picture of humans looking up at a giant robot" corners="xl" /%}

{% lead-in %}For a technologist, I can be a bit of a luddite.{% /lead-in %} I didn't have a smartphone until the iPhone 3GS, scoffed at the iPad, resisted switching from PC to a Mac for years, and somehow didn't become a centibillionaire despite owning a handful of Bitcoin in 2011.{% note #1 /%} I'm a "watch and wait" kind of person. So, it's probably unsurprising that I greeted generative AI with a healthy dose of skepticism.

A few years ago, I was the engineering lead of Stripe's Docs organization, the group responsible for the company's documentation. The company was interested in experimenting with applying generative AI, and (like everyone else at the time) we wanted to add an AI assistant to our docs. Practically, this amounted to feature we called SmartDocs, a chatbot backed by a RAG system with semantic search. All very quaint today, but in 2022, this was bleeding edge stuff!

Unfortunately, it also didn't work very well. Despite our best efforts, the model's answers often scored poorly on our internal evals, and it had a tendency to hallucinate wildly incorrect information. You could also pretty easily cajole it into saying some unkind things about the company, recommending that the user switch to one of our competitors, and other not-so-great things. {% note #2 /%}

I routinely voiced concerns about putting a half-baked AI assistant in front of users, earning myself a reputation as the resident "AI naysayer" on the project.

Bear in mind, this was during the early days of ChatGPT, and every wannabe thought leader was taking to Twitter to make breathless predictions about how [AGI](https://en.wikipedia.org/wiki/Artificial_general_intelligence) was here and that [the Singularity](https://en.wikipedia.org/wiki/Technological_singularity) was right around the corner. A lot of the loudest voices were ex-crypto grifters who had spent the entire pandemic pumping [shitcoins](https://en.wikipedia.org/wiki/Meme_coin) and trying to convince everyone that it was totally logical to spend millions of dollars on [JPEGs of monkeys](https://en.wikipedia.org/wiki/Bored_Ape). With [Web3](https://en.wikipedia.org/wiki/Web3) and the crypto boom turning to bust, the shills had found their next pump.

It was rational to be at least a _little_ skeptical of AI.

Here's the thing --- when compared to other new tech, what's weird about generative AI is that it _intentionally has no specific purpose_. When you build a new database, or a new library, you're trying to solve a specific problem for a specific group of people. But generative AI's value comes entirely from the [emergent behavior](https://en.wikipedia.org/wiki/Emergence) of the model. _By definition, it's a solution in search of a problem._

Sure, you might be able to invert this with a sufficiently broad definition of the problem, like _make a computer think like a human_. But if you had such a computer, what would you actually _do_ with it? We have something that approximates that today, and we're still trying to figure out what to use it for. {% note #3 /%}

Eventually, we got SmartDocs to an acceptable level of quality to ship it as a public beta, stamped with all of the mandatory warning labels about how _generative AI is an experimental technology_ and that users should _be sure to verify the answers_. And, as models and techniques improved, it evolved into a pretty good AI assistant that's still in use on the site today.

Despite my skepticism, I continued to experiment with AI at Stripe, focusing on internal software given the lower risk of  hallucination and prompt injection. One of the more useful experiments was using it to read the code samples in our documentation and find issues like syntax errors. {% note #4 /%}

We built an agent that would scan the docs once a week and then publish the results to a web interface. Then, a human would review things manually correct any errors the agent found. The surface of the documentation was much too large to efficiently find errors. What would have taken a human weeks to sift through, GPT4 handled in about 9 minutes for $1.

This automation allowed us to burn down the number of existing errors, and created a bulwark against new errors being introduced. With today's models, we probably could have had the agent fix the errors automatically, but keeping a human in the loop meant it was safe and easy to deploy.

These experiments resulted in enough interesting applications that we eventually spun up a new team called Developer AI, with a charter to find ways to apply generative AI to make it easier for engineers to integrate with Stripe. However, I gradually started to realize that this new technology represented a watershed moment in the industry, and using it to make Stripe better just didn't feel ambitious enough.

The more accessible the technology becomes, the more people will be able to experiment with it, the more applications will become obvious.

So, [I left Stripe](/writing/urgency-and-focus) to found [Ardent](https://ardent.ai), to give myself some space to experiment.

More than a year later, generative AI is still largely a solution in search of a problem. I don't say this to diminish its impact! Rather the opposite --- it feels like we've still barely scratched the surface of what it can do. Models have improved in staggering ways, we've learned how to build more sophisticated agent harnesses, and we've started to learn how best to apply it to software engineering.

---

{% note #1 %}
Every time Bitcoin hits a new all-time high, someone with laser eyes in their avatar tries to farm some Twitter engagement using my now-ancient tweets where I'm skeptical about Bitcoin, and a bunch of numbskulls take a break from congratulating themselves for buying the top to [tell me how I'm going to always be poor](https://x.com/nkohari/status/1511116895159734283). For the record, other than stablecoins, I'm still bearish on crypto.
{% /note %}

{% note #2 %}
We finally added a list of stopwords to the system to act as guardrails. We'd read the response streaming back from the model, and if it was about to say something embarassing, we'd terminate the stream and instead tell the user we couldn't answer the question.
{% /note %}

{% note #3 %}
People are impulse-buying Mac Minis, giving [OpenClaw](https://openclaw.ai/) all of their API keys, and breathlessly taking to Twitter to compare notes. But, most of the conversation ends up being about techniques for setting up the agent itself, instead of practical applications for it.
{% /note %}

{% note #4 %}
The code samples in Stripe's documentation are (or at least, were) templates that were embedded directly in the [Markdoc](https://markdoc.dev) documents themselves. This allowed us to make them more interactive and to customize them to the user who was reading them, but the sheer number of permutations made static analysis of the code infeasible.
{% /note %}
