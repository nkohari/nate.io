---
title: Automagic Time Localization
subtitle: Does anybody really know what time it is? Does anybody really care?
date: 2009-06-16T19:54:00
state: archived
type: essay
format: instructional
category: javascript
song: spotify:track:6nAD4H0ujyEeBTxbXZkZeC
---

{% lead-in %}One of the most often-overlooked{% /lead-in %} and easy to fix things encountered when developing a hosted software application is the management of local time. First and foremost, you should be storing timestamps in your database in UTC. I don’t care if your users are all in the same time zone now, or your app is just a local deployment, or whatever other excuse you have for storing time as local time. _Always store timestamps in UTC._ Do it now, and pat yourself on the back a year from now when you realize whatever reason you had for storing it as local time was irrelevant or has changed. :)

Okay, so once you’ve got your timestamps stored in UTC, you need to localize them for each individual user, which means you need their offset from UTC. For example, Eastern Standard Time, my time zone, is UTC-5. The most common thing that I’ve seen is to provide users with a massive dropdown of a bajillion time zones, and ask them to pick which one they’re in.

Maybe it’s just a pet peeve, but I _hate_ it when sites ask me to pick my time zone. What about users who travel often? What about daylight savings time? Do I make my users go in and change their time zones when DST starts and stops? Do I write extra code to figure out if it’s DST in the user’s time zone? That’s pretty much impossible, at least in the US, because it’s not recognized in Hawaii, Arizona (except in the Navajo Nation), and some counties in middle America.

While I was building [Zen](http://agilezen.com/), I was determined to avoid making users have to choose their time zone if I could avoid it. I realized that the client computer knows what time it is, and what time zone they’re in, so it’s pretty simple to read it with Javascript. Here’s how you can grab the client computer’s UTC offset:

```js
new Date().getTimezoneOffset() / -60;
```

Now, all that remains is to push that information back to the server and make sure that it’s updated often. Zen’s login form has a hidden input called `timezoneOffset`, which is set using jQuery when the page is displayed:

```js
$(document).ready(function () {
  $('#timezoneOffset').val(new Date().getTimezoneOffset() / -60);
});
```

Now, when the form is posted, I read the UTC offset from the hidden input, and store it in the user’s record in the database. This means that each time the user logs in, their time zone information is updated to be current. This helps not only with the daylight savings time problem, but also ensures that Zen will respond to changes in the user’s computer clock. If a user travels from EST to PST, for example, and they change their computer clock, Zen will recognize the change and update the timestamps appropriately.

Then, each time I need to display a timestamp to a user, I call a method on my `TimeHelper` (a custom ASP.NET MVC view helper, like the built-in `HtmlHelper` and `UrlHelper`):

```csharp
public TimeHelper
{
  public User User { get; private set; }

  public TimeHelper(User user)
  {
    User = user;
  }

  public DateTime GetLocalTime(DateTime utc)
  {
    DateTime local = utc.AddHours(User.TimezoneOffset);
    return new DateTime(local.Ticks, DateTimeKind.Local);
  }
}
```

Just another trick to keep in your bag. :)
