---
title: Generic Variance in C# 4.0
subtitle: The CLR type system gets even more powerful.
date: 2008-10-30T00:34:00
state: archived
type: instructional
category: dotnet
song: spotify:track:68BfPDbBYWylghSi4zbCTO
---

{% lead-in %}Although I'm not cool enough to actually go to PDC{% /lead-in %}, I've been watching some of the things that have been announced. One of the things I'm most excited about is co- and contra-variance in generics, which is something that the CLR has lacked since generics were first introduced in 2.0. (Note: some of the examples on here are pulled from the [excellent description](http://code.msdn.microsoft.com/csharpfuture) of new features release by Microsoft.)

In versions of C# prior to 4.0, generics were _invariant_. For example, consider this simple type definition:

```csharp
public class Foo<T>
{
  //...
}
```

Since the generic type parameter `T` was not constrained, the compiler understands that `T` should be treated as type `object`. That means that since a `string` is an `object`, a `Foo<string>` is functionally equivalent to a `Foo<object>`. However, because of generic invariance, ian instance of `Foo<string>` cannot be assigned to a variable of type `Foo<object>`.

C# 4.0 introduces the ability to declare _covariant_ and _contravariant_ generics. For example:

```csharp
public class Foo<out T>
{
  //...
}
```

This class is _covariant in `T`_, meaning that if you create a `Foo<string>`, you can use it effectively as a `Foo<object>`, since a `string` is a subclass of `object`. The example given is the new `IEnumerable<T>` interface that comes with the BCL in C# 4.0:

```csharp
public interface IEnumerable<out T> : IEnumerable
{
  IEnumerator<T> GetEnumerator();
}
public interface IEnumerator<out T> : IEnumerator
{
  bool MoveNext();
  T Current { get; }
}
```

Since these interfaces are covariant in `T`, an `IEnumerable<string>` can be used as an `IEnumerable<object>`. The same is true for `List<T>`, so you'll be able to do this, which was previously impossible:

```csharp
IList<string> strings = new List<string>();
IList<object> objects = strings;
```

Note, however, that you can only declare that your type is covariant for generic type parameters that appear in _output positions_ --- basically, return values.

Like the `out` keyword, you can also use the `in` keyword:

```csharp
public interface IComparer<in T>
{
  int Compare(T left, T right);
}
```

This interface is _contravariant in `T`_, meaning that if you have an `IComparer<object>`, you can use it as though it was a `IComparer<string>`. Contravariance carries a similar restriction to covariance, in that contravariant type parameters can only be used in _input positions_ (arguments) on the type.

I didn't quite understand variance until I considered the changes to the `Func` delegate:

```csharp
public delegate TResult Func<in TArg, out TResult>(TArg arg);
```

`Func` is contravariant in `TArg`, and covariant in `TResult`. For example, consider this (less-than-useful and slightly-contrived) method:

```csharp
public string Convert(object obj)
{
  return obj.ToString();
}
```

With the new variance rules, I can do this:

```csharp
Func func1 = Convert;
Func func2 = Convert;
```

Since the delegate is contravariant in `TArg`, I can pass in a `string`, since a `string` is an `object`. Since the delegate is covariant in `TResult`, I can use it in a situation where an `object` is expected as a result from the function.

This might seem a little overwhelming if you're not a language geek like myself, but it basically means that things that seemed like they _should_ work in previous versions (like the `List<T>` example above), now _will_ just work. [Eric Lippert](http://blogs.msdn.com/ericlippert) also has a great [series of posts](http://blogs.msdn.com/ericlippert/archive/tags/Covariance+and+Contravariance/default.aspx) about the topic.

If you'd like to tinker with C# 4.0 (and Visual Studio 2010), Microsoft has published a [VPC image](http://www.microsoft.com/downloads/details.aspx?familyid=922b4655-93d0-4476-bda4-94cf5f8d4814&displaylang=en&tm). Kudos to the C# and CLR teams for getting this stuff to work!
