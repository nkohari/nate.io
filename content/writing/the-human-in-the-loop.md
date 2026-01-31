---
title: The Human in the Loop
subtitle: My evolving relationship with AI, and how I use it to build software
date: 2026-01-30T9:04:00
state: draft
type: essay
format: instructional
thumbnail: robot-puppeteer.webp
---

{% image src="robot-puppeteer.webp" alt="A giant human hand, manipulating a robot as a puppet" corners="xl" /%}

{% lead-in %}Like a lot of people, I started out pretty skeptical about generative AI.{% /lead-in %} If I'm being honest, for a technologist, I'm also a bit of a luddite. I scoffed at the iPad, resisted switching from PC to a Mac for years, and somehow didn't become a centibillionaire despite owning a handful of Bitcoin in 2011.{% note #1 /%}

A few years back, I was working at Stripe as the tech lead of the Docs organization, helping to guide the engineering for the company's documentation. Stripe was [partnering with OpenAI](https://openai.com/customer-stories/stripe) for the GPT4 launch, and we wanted to add an AI assistant to our documentation.

Practically, this amounted to feature we called SmartDocs, a chatbot backed by a RAG system with semantic search. All very quaint today --- but in late 2022, this was bleeding edge stuff!

Unfortunately, it also didn't work very well. Despite our best efforts, the model's answers often scored poorly on our internal evals, and it had a tendency to hallucinate wildly incorrect information. You could also pretty easily cajole it into saying some unkind things about the company, recommending that the user switch to one of our competitors, and other not-so-great stuff. {% note #2 /%}

I routinely voiced concerns about putting a half-baked AI assistant in front of users, earning myself a reputation as the resident "AI naysayer" on the project.

Bear in mind, this was during the early days of ChatGPT, and every wannabe thought leader was taking to Twitter to make breathless predictions about how [AGI](https://en.wikipedia.org/wiki/Artificial_general_intelligence) was here and that [the Singularity](https://en.wikipedia.org/wiki/Technological_singularity) was right around the corner. A lot of the loudest voices were ex-crypto grifters who had spent the entire pandemic pumping [shitcoins](https://en.wikipedia.org/wiki/Meme_coin) and trying to convince everyone that it was totally logical to spend millions of dollars on [JPEGs of monkeys](https://en.wikipedia.org/wiki/Bored_Ape). With [Web3](https://en.wikipedia.org/wiki/Web3) and the crypto boom turning to bust, the shills had found their next pump.

It was rational to be at least a _little_ skeptical of generative AI.

We eventually did get SmartDocs to an acceptable level of quality to ship it as a public beta, stamped with all of the then-typical warning labels about how _generative AI is an experimental technology_ and that users should _be sure to verify the answers_. As models and techniques improved, it evolved into a pretty good AI assistant that's still in use on the site today.

Despite my skepticism, I continued to experiment with AI at Stripe, focusing on internal software given the lower risk of  hallucination and prompt injection. One of the more useful experiments was using it to read the code samples in our documentation and find issues like syntax errors. {% note #3 /%} The agent would scan the docs once a week, and would publish the results to an web interface which a human could use to manually correct any errors the agent found.

These experiments resulted in enough interesting applications that we eventually spun up a new team called Developer AI, with a charter to find ways to apply generative AI to make it easier for engineers to integrate with Stripe.

---

{% note #1 %}
Every time Bitcoin approaches a new all-time high, someone with laser eyes in their avatar tries to farm some Twitter engagement using my now-ancient tweets where I'm skeptical about Bitcoin, and a bunch of numbskulls who are congratulating themsevles for buying the top [start telling me how I'm going to always be poor](https://x.com/nkohari/status/1511116895159734283). For the record, other than stablecoins, I'm still bearish on crypto.
{% /note %}

{% note #2 %}
We finally added a list of stopwords to the system to act as guardrails. We'd read the response streaming back from the model, and if it was about to say something embarassing, we'd terminate the stream and instead tell the user we couldn't answer the question.
{% /note %}

{% note #3 %}
The code samples in Stripe's documentation are (or at least, were) templates that were embedded directly in the [Markdoc](https://markdoc.dev) documents themselves. This allowed us to make them more interactive and to customize them to the user who was reading them, but the sheer number of permutations made static analysis of the code infeasible.
{% /note %}
