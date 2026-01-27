---
title: Integration, not displacement
subtitle: On sound engineering, 3D printing, and generative artificial intelligence
date: 2026-01-11T8:28:00
type: essay
format: instructional
state: draft
thumbnail: protools.webp
---

{% image src="protools.webp" alt="A screenshot of an early version of ProTools" filter="grayscale" /%}

{% lead-in %}In the early 1940s,{% /lead-in %} Les Paul was experimenting with audio recording in his studio. Using an acetate disk, he recorded himself playing a track, and then recorded himself playing another instrument over top of the same recording. This approach, now called [multitrack recording](https://en.wikipedia.org/wiki/Multitrack_recording), was revolutionary because it allowed musicians to record different parts of the song independently, and arrange them after the fact.

However, multitracking required expensive custom equipment, and it wasn't until the 1960s that it became mainstream as The Beatles and The Beach Boys started to use it extensively in their work. {% note #1 /%} Despite it becoming mainstream practice, the cost of the equipment meant that access was limited to recording studios, who in turn charged exorbitant rates for studio time to allow bands to record.

The 1970s brought the invention of digital audio recorders, and with the rise of the personal computer during the 1980s, music production increasingly moved away from analog formats to digital. In 1989, a small San Francisco company called Digidesign released Sound Tools for the Mac. Sound Tools, which evolved into the industry-standard [Pro Tools](https://en.wikipedia.org/wiki/Pro_Tools), was a new kind of software called a [digital audio workstation](https://en.wikipedia.org/wiki/Digital_audio_workstation) (or DAW), which allowed users to arrange music tracks entirely using software. {% note #2 /%}

The creation of DAWs revolutionalized music production. Not only did they support dozens of tracks, reliance on software meant artists could experiment more without burning through disposable resources like magnetic tape. Instead of needing special-purpose hardware, suddenly anyone with a Mac could be a music producer.

The resulting democratization of editing had a significant impact on the profession of sound engineering. Instead of having to bring the band to the studio, engineers were instead able to bring a studio-quality mixing setup to the band on-site. Facing increased pressure, many smaller studios were shuttered as they could no longer justify their high operating costs. Eventually, most professional engineers embraced the shift and adopted a hybrid approach, often recording using analog equipment and mixing using Pro Tools.

It also changed the music that was being created. By making it significantly easier to work with [samples](https://en.wikipedia.org/wiki/Sampling_(music)), DAWs led to a surge in popularity in genres that used them heavily. Hip-hop and electronic music were already thriving throughout the 80s and 90s, but cheap access to editing tools caused them to explode in popularity.

Today, with music distribution also democratized via streaming services like Spotify, anyone with a $1,000 MacBook can record, produce, and publish music.

---

Also in the 1940s, science fiction writer [Murray Leinster](https://en.wikipedia.org/wiki/Murray_Leinster) published a short story called _Things Pass By_. In the story, he described a machine that could synthesize real-world items by using just a drawing, by extrusion of molten plastic:

> But this constructor is both efficient and flexible. I feed magnetronic plastics -- the stuff they make houses and ships of nowadays -- into this moving arm. It makes drawings in the air following drawings it scans with photo-cells. But plastic comes out of the end of the drawing arm and hardens as it comes ... following drawings only.

In the early 1980s, several patents were filed in quick succession for approaches to fabricating three-dimensional models using extruded plastic. The technology allowed industrial firms to quickly generate real-world prototypes without involving their primary manufacturing facilities. Adoption quickly spread across the manufacturing industry, and by the mid-2000s, most firms began to rely on it for prototyping. High-end machines were also designed that could manufacture production-quality products from materials like nylon, especially useful for the medical industry.

What Leinster considered fanciful science fiction, we now simply call [3D printing](https://en.wikipedia.org/wiki/3D_printing), and anyone with a few hundred dollars and a knack for experimentation can have at it.

The impact on manufacturing was similar to what happened in music production. Industrial designers who had relied on expensive prototyping shops suddenly found themselves competing with engineers who could iterate on designs at their desks. Some prototyping businesses closed, but most professionals adapted by offering higher-end services: production-quality materials, larger print volumes, finishing work.

Just as DAWs didn't mean an end to sound engineering, the introduction of 3D printing didn't render industrial manufacturing irrelevant. Instead, it enabled entirely new categories of physical objects to exist. Suddenly, it became economically viable to manufacture custom prosthetics, one-off replacement parts for vintage appliances, and hobby projects that would never justify the capex of traditional manufacturing.

---

In 2017, eight scientists working at Google published a now-seminal paper titled [Attention Is All You Need](https://en.wikipedia.org/wiki/Attention_Is_All_You_Need). In it, they described a novel deep learning technique called the _transformer_. The scientists were primarily hoping to improve machine translation, but they speculated about applying the approach to general-purpose question answering.

Five years after the paper was published, OpenAI released ChatGPT. Within a week, it had a million users. Within two months, a hundred million.

The [large language model](https://en.wikipedia.org/wiki/Large_language_model), the technology that powered ChatGPT, had been in development for years. But, the combination of the transformer architecture, a tremendous amount of training material, and the absolute mountain of capital necessary to cover the compute costs allowed OpenAI to create something entirely new.

It was the first time most people encountered a computer program that felt genuinely intelligent. You could have a conversation with it. You could even ask it to write code. Sometimes, the code even worked!

The reaction from the software engineering community was immediate and polarized. Some engineers were excited about the potential. Others were terrified, convinced that their jobs were about to be automated away. Tech publications ran breathless articles about the looming obsolescence of the software engineer.

The market for software is constrained primarily by the cost of creation, not by demand. There is effectively infinite demand for software to solve problems, automate tasks, and create new capabilities. Every time we've made software cheaper, easier to create, and more accessible to people, the total amount of software in the world has increased.

Right now, there are countless ideas for software that aren't built because the economics simply don't work. The engineering effort required exceeds the potential value. Maybe it's an internal tool that would save a team a few hours per week, but would take a few weeks to build. Maybe it's a niche application serving a small market that can't support a full development team. Maybe it's a prototype for an idea that might not work, where the risk of the upfront investment is too high.

The existence of generative AI has lowered the cost of the mechanical aspects of programming, much like how DAWs lowered the cost of the mechanical aspects of music production or 3D printing lowered the cost of prototyping physical objects. The creative and strategic work still requires humans.

{% note #1 %}A lot of modern listeners find The Beatles' work to be unimpressive, and a big reason for that is we've listened to multitracked music for decades. The Beatles' first song recorded using a four-track recorder was [I Want To Hold Your Hand](https://en.wikipedia.org/wiki/I_Want_to_Hold_Your_Hand), which was coincidentally also their first single to chart at number one in America. {% /note %}

{% note #2 %}Technically, early DAWs required specialized hardware support in the form of expansion cards that were installed in the computer. Still, these cards were a fraction of the cost of hardware audio controllers.{% /note %}