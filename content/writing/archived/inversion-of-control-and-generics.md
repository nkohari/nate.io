---
title: Inversion of Control and Generics
date: 2007-07-07T15:23:00
state: archived
type: essay
format: instructional
category: dotnet
---

I stumbled across [an interesting article](http://weblogs.asp.net/ralfw/archive/2007/01/17/inversion-of-control-using-generics-revisiting-the-separation-of-use-and-implementation.aspx) today, in which the author describes an alternative take on inversion of control in .NET. I started to write a comment, but it got a little long-winded, so it became a blog post instead. :)

The author, [Ralf](http://weblogs.asp.net/ralfw/), suggests that rather than injecting instances of dependencies, we should "inject" their _type_ using a generic type argument. This means that instead of the standard dependency injection pattern:

```csharp
class MovieLister
{
  private IMovieFinder _finder;
  public MovieLister(IMovieFinder finder)
  {
    _finder = finder;
  }
}
```

He suggests doing this:

```csharp
class MovieLister<TFinder>
  where TFinder : IMovieFinder, new()
{
  private TFinder _finder;
  public MovieLister()
  {
    _finder = new TFinder();
  }
}
```

This clearly has the advantage of not having to construct an `IMovieFinder` externally and then inject it into the `MovieLister`'s constructor. I have a few issues with this approach. First, by relying on the `new()` constraint, you're only getting access to the parameterless constructor of the dependency. This means that if your dependency requires initialization logic, you're out of luck. (And that rules out about 90% of dependencies.) Second, in order to create a `MovieLister`, you actually have to instantiate a `MovieLister<MovieFinderImpl>`. This means that any code that consumes your `MovieLister` must also know which implementation to inject to satisfy the `IMovieFinder` dependency. What happens if you want to change the implementation that you're using for `IMovieFinder`? You have to find each place you're creating a `MovieLister` and change the generic type argument.

This gets even scarier when you consider chained dependencies and the construction of an object graph. (This is where inversion of control containers shine, because they can automagically wire-up your objects for you without much coaxing.) What happens if your `MovieFinder` has a dependency, say on an `IMovieRepository`?

```csharp
class MovieLister<TFinder>
  where TFinder : IMovieFinder, new()
{
  private TFinder _finder;
  public MovieLister()
  {
    _finder = new TFinder();
  }
}

class MovieFinderImpl<TRepository> : IMovieFinder
  where TRepository : IMovieRepository, new()
{
  private TRepository _repository;
  public MovieFinderImpl()
  {
    _repository = new TRepository();
  }
}

class MovieRepositoryImpl : IMovieRepository { ... }
```

Not too bad... but wait, how do we create a `MovieLister` now? Now, instead of having to instantiate a `MovieLister<MovieFinderImpl>`, we have to create a `MovieLister<MovieFinderImpl<MovieRepositoryImpl>>`. By using this idea of "type injection", you've actually made each "parent" type dependent on not only its dependencies, but also on _all of the dependencies_ of its dependencies (and their dependencies, and so on). In a real-life application, this would quickly become unmanageable.

Still, it's an interesting idea. It would probably work in very basic scenarios, but it might make your code _more_ difficult to maintain. I do agree with Ralf that using a service locator isn't the best way to implement IoC, though. Instead, check out [Titan](http://code.google.com/p/titan-ioc/)! :)
