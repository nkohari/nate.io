---
title: Functional Magic
date: 2007-08-24T18:39:00
state: archived
type: instructional
category: dotnet
---

{% lead-in %}In the shower this morning{% /lead-in %}, as the haze of sleep was clearing, I was thinking about delegates in C#. (Yes, I'm a complete and total geek. As if there was any debate on that issue. :) An interesting thought occurred to me, though, so I naturally had to throw together a proof of concept. It's another one of [those ideas](/2007/self-referential-generics) whose usefulness is debatable for most cases, but is interesting nonetheless.

A [functor](http://en.wikipedia.org/wiki/Function_object), which is a term from functional programming, is an _function represented as an object_. In C#, functors are implemented as delegates. C# 2.0 introduced some language features like implicit delegate creation and invocation, which give the appearance of [first-class functions](http://en.wikipedia.org/wiki/First-class_function). This significantly narrows the gap between actual method declarations and delegates.

A class is essentially a collection of methods along with some data that defines its state. Consider this class definition:

```csharp
public class Formatter
{
  public string Format(string message)
  {
    return message.ToLower();
  }
}
```

Very straightforward. To use this `Formatter` class, you could do something like this:

```csharp
public static class Program
{
  public static void Main()
  {
    Formatter fmt = new Formatter();

    // Outputs "my message!"
    Console.WriteLine(fmt.Format("My Message!"));
  }
}
```

Nothing groundbreaking there either. But what if, instead of actually defining your method directly, you did this instead?

```csharp
public class Formatter
{
  public Functions.Format Format = delegate(string message)
  {
    return message.ToLower();
  }

  public class Functions
  {
    public delegate string Format(string message);
  }
}
```

Take a close look at that snippet. Rather than declaring a `Format` method on the `Formatter` type, we've given it a public `Format` field. The `Format` field is of type `Formatter.Functions.Format`, which is a delegate defined in an inner class called `Functions`. (The inner type just keeps the outer `Formatter` type clean of any delegate definitions.) Then, using anonymous method syntax, we've assigned the `Format` field a value, which is the same as our previous implementation of the `Format` method.

What we've essentially done is _separated the signature of the method from its implementation._ You can still use the `Formatter` just like before:

```csharp
public static class Program
{
  public static void Main()
  {
    Formatter fmt = new Formatter();

    // This triggers the Format delegate, resulting in the same output of "my message!"
    Console.WriteLine(fmt.Format("My Message!"));
  }
}
```

But, since the implementation is separate from the declaration, we can do fun stuff like:

```csharp
public class Program
{
  public static void Main()
  {
    Formatter fmt = new Formatter();

    // Change the implementation of Format.
    fmt.Format = delegate(string s) { return s.ToUpper(); };

    // This outputs "MY MESSAGE!"
    Console.WriteLine(fmt.Format("My Message!"));
  }
}
```

You could even get more creative:

```csharp
public class Program
{
  public static void Main()
  {
    Formatter fmt = new Formatter();

    // Save a copy of the original implementation (ToLower)
    Formatter.Functions.Format func = fmt.Format;

    // Wrap the function with another implementation.
    fmt.Format = delegate(string s) { return "The message is [" + func(s) + "]"; };

    // This will output "The message is [my message!]"
    Console.WriteLine(fmt.Format("My Message!"));
  }
}
```

This technique is used pretty commonly in dynamic languages like Ruby, but it can still be applied to more static languages like C#. Arguably, it would be nice if there was support for this in the language (say through the `virtual` keyword, or a new one like `externalizable`), but I have a feeling it would be misused pretty quickly. :)
