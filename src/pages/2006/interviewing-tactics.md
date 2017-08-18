---
title: Interviewing Tactics
date: 2006-08-03 17:00:00
category: dotnet
---

<span class='drop-cap'>A friend</span> and former co-worker, Jack Altiere, wrote [a very good article](http://jaltiere.com/?p=7) about the process of interviewing from both sides of the table. He has some very good insight into the issue, so I figured I would add my two cents.

Jack makes an excellent point that interviewers should ask candidates to write a piece of code on the spot during the interview. He suggests asking candidates to write a string reversal, which is simple and straightforward enough to be an excellent test of a candidate's ability. However, based on some [discussion of the questions to ask](http://discuss.techinterview.org/?interview), a lot of the things people think you should ask are **way** too complicated or just completely off base. For example, why in the world would you ask a prospective candidate to detail a possible algorithm to [solve a Sudoku puzzle](http://discuss.techinterview.org/default.asp?interview.11.365218.3)? A good answer to that question could be a defensible master's thesis. Unless you're hiring them to write artificial intelligence for games, stick to more realistic tests.

Here are some guidelines for questions to ask:

* I'll copy Jack by saying that you should let them write the code in the language of their choosing. Unless you're hiring someone specifically for their talents in a particular language, let them write what they're most comfortable with. You'll get a better indication of their real abilities if they aren't burning cycles trying to remember syntax.
* Forgive minor syntax errors. The interpreter/compiler that comes with a piece of notebook paper is limited in its error checking ability. However, if the candidate clearly doesn't know the difference between `char` and `char*`, ask them politely to explain why they wrote it the way they did. If they don't know, end the interview early.
* Unless the candidate's title will be Director in Chief of Trivial Knowledge, Don't ask [stupid questions](http://discuss.techinterview.org/default.asp?interview.11.371171.2) about mundane features of a programming language. Instead, present them with realistic problems that you feel a person of their skill level will be able to solve.
* Likewise, unless they're going to be doing [FEA](http://en.wikipedia.org/wiki/Finite_element_analysis) in Matlab or something else particularly math-heavy, don't give them bad flashbacks to college math courses by giving them [brainteaser-like problems](http://discuss.techinterview.org/default.asp?interview.11.366903.8) to answer.
* Test their ability to debate (an important trait of good developers) by asking an inflammatory question about a language/technology they display an interest in. For example, if they mention that love Java, ask them why the language lacks support for pointers. If they present a successful defense, give them major points.

Above all, remember that the interview is an extremely stressful and unnatural environment. Although the ability to think and act under that pressure-cooker situation is a good sign that the candidate knows his/her stuff, the inverse is not necessarily true -- even if they don't do well during an interview, they may actually be very capable.

An alternative (or complementary) tactic to asking the candidate to write a piece of code is to ask for a code portfolio. Artists and graphic designers maintain a portfolio of their work, and I believe software engineers should do the same. Seeing examples of a person's coding style is an instant snapshot of several things:

* Their general skill level with the language the code sample is written in. Do they take advantage of the important features of the language?
* Their understanding of data structures and algorithms and the "best practices" related to them. Watch for common use of things like bubble sorts. If you're feeling particularly sadistic, ask them about the [asymptotic complexity](http://en.wikipedia.org/wiki/Asymptotic_complexity) of a particular block of code. Give them points if they at least recognize the term, and major bonus points if they can give you the big-Oh notation.
* Their understanding of good code-writing practices in general. Make sure their program doesn't contain any 3,000 line `for` loops, and watch for proper indentation, commenting, etc.
* Their reliance on "shunned" features of programming languages, for example, overuse of globals in C, _any_ use of the `goto` keyword outside of GW-BASIC...
* Which way they lean on the incessant debate between imperative, functional, and object-oriented languages. (Just because they wrote 1,000 lines of C doesn't mean they could write 1,000 of LISP.)

In addition, you can review their code and ask questions about how/why they implemented certain things certain ways. If possible, ask for the portfolio ahead of time and have some questions prepared for them. Like I said, the ability to debate is an important skill, and being able to explain and defend a creative idea is a very good indicator as to whether or not the developer will be a good asset to your company.