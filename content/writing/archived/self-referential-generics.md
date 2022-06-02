---
title: Self-Referential Generics
date: 2007-03-07T08:18:00
state: archived
type: instructional
category: dotnet
---

<span class="drop-cap">I discovered</span> an interesting .NET 2.0 trick recently while tinkering with one of the projects I'm working on. In practice, its usefulness is debatable, but it's pretty cool anyways. I've taken to calling the trick _self-referential generics_. Another way to think of it is a way to "invert" type safety in a type hierarchy.

Consider a simple type hierarchy, with an abstract base type, `AbstractFoo`, and a concrete subtype, `ConcreteFoo`:

```csharp
public abstract class AbstractFoo { ... }
public class ConcreteFoo : AbstractFoo { ... }
```

Now, let's say that our design requires that we place our `AbstractFoos` in collections, and that each `AbstractFoo` instance needs a reference to the collection it resides in. We can accomplish this by exposing a property:

```csharp
public abstract class AbstractFoo
{
  private ICollection<AbstractFoo> _collection;
  public ICollection<AbstractFoo> Collection
  {
    get { return _collection; }
    set { _collection = value; }
  }
}
```

Then, in our program, let's say we want to create a collection of `ConcreteFoo`s:

```csharp
public static class Program
{
  public static void Main()
  {
    ConcreteFoo foo = new ConcreteFoo();
    Collection<ConcreteFoo> collection = new Collection<ConcreteFoo>();
    collection.Add(foo);

    foo.Collection = collection; // Error!
  }
}
```

Notice that we have a problem. Even though we're creating an instance of `ConcreteFoo`, the property that's exposed on it is still typed as `ICollection<AbstractFoo>`. If we were to then create a `Collection<ConcreteFoo>`, we could add the `ConcreteFoo` instance to it, but we couldn't set the value of our `Collection` property.

The problem here is that generic type arguments are _not polymorphic_ --- that is, even though a `ConcreteFoo` is an `AbstractFoo`, and you can put `ConcreteFoos` into a `Collection<ConcreteFoo>`, a `Collection<ConcreteFoo>` is _not_ a `Collection<AbstractFoo>`. Note that our design could feasibly require the collection to store any subtype of `AbstractFoo`, but in our case we're assuming that the collection will store values that are all of the same subtype.

So what can we do? It turns out that the CLR provides us a strange feature that solves our problem. Consider the following replacement for our simple hierarchy:

```csharp
public abstract class AbstractFoo<T> where T : AbstractFoo<T> { ... }
public class ConcreteFoo : AbstractFoo<ConcreteFoo> { ... }
```

Take a minute and let that type definition make sense. (It took me awhile.) Notice that because of the type constraint, the generic parameter `T` refers to the type `AbstractFoo<T>` itself, hence, it is _self-referential_. At first glance, it may appear that the runtime won't be able to assure type-safety, but since all of the generic arguments are defined, it can successfully instantiate the type. Also, as you may know, the `where` constraint on the `AbstractFoo<T>` type only requires that the type `T` be either `AbstractFoo<T>` or _one of its subtypes_ (also referred to as the [Liskov Substitution Principle](http://en.wikipedia.org/wiki/Liskov_substitution_principle), or the "is-a test").

So why in the world would we want to do such a thing? By defining the type in this manner, inside of the `AbstractFoo<T>` type definition, the type `T` refers to the _current concrete subtype_ of `AbstractFoo`. Effectively, we have "inverted" the type safety, pushing up the knowledge of the concrete type from the implementation into the base types.

Knowing this, we can change our property definition in `AbstractFoo<T>`:

```csharp
public abstract class AbstractFoo<T>
  where T : AbstractFoo<T>
{
  private ICollection<T> _collection;

  public ICollection<T> Collection
  {
    get { return _collection; }
    set { _collection = value; }
  }
}
```

Now, since `T` refers to the actual concrete type that we're dealing with, we can do this in our application:

```csharp
public static class Program
{
  public static void Main()
  {
    ConcreteFoo foo = new ConcreteFoo();
    Collection<ConcreteFoo> collection = new Collection<ConcreteFoo>();
    collection.Add(foo);
    foo.Collection = collection;
  }
}
```

Since the `ICollection<T>` exposed on `AbstractFoo<T>` is now typed as `ICollection<ConcreteFoo>` in the case of a `ConcreteFoo`, we can now create our `Collection<ConcreteFoo>` and set it directly.

Like I said, it's not something you'll use every day, but interesting nevertheless.
