---
title: MetaCode Released on CodePlex
date: 2006-11-29T04:18:00
state: archived
type: instructional
category: open source
---

<span class="drop-cap">Happy birthday</span> to me! :) Today's my 24th birthday. To celebrate, I [released a project](http://www.codeplex.com/metacode) on CodePlex which has been one of the things I've been obsessing over in the past few weeks. It's a library called **MetaCode**. From the project description:

> The MetaCode library provides a means to generate dynamic types at runtime without directly emitting CIL opcodes. The library exposes a flexible "meta-programming" model that represents code artifacts via objects, similar to the types found in `System.CodeDom`. Internally, MetaCode uses the types in the System.Reflection.Emit namespace to build the concrete implementations of types.

The desire to create the MetaCode library started when I got tired of working with CIL directly while developing Cricket, and the integration framework I'm working on at Merge. Here's a simple example of how to use the library.

A common pattern when working with dynamic types is to create a concrete implementation of a contract, which is implemented as a .NET interface. Let's say you have this (very useful) interface:

```csharp
public interface ILoopy
{
  int Loop(int start, int max, int step);
}
```

The `Loop()` method is supposed to move through a simple loop structure given the provided parameters, and return the final value of the index. If you were to implement this contract using a while loop in C#, it might look something like this:

```csharp
public class WhileLoopy : ILoopy
{
  public int Loop(int start, int max, int step)
  {
    int index = start;
    while (index <= max) { index += step; }
    return index;
  }
}
```

However, you could also do the same thing with a for loop, like this:

```csharp
public class ForLoopy : ILoopy
{
  public int Loop(int start, int max, int step)
  {
    int index = start;
    for (int ii = start; ii <= max; ii += step) { index = ii; }
    return index;
  }
}
```

Let's say that for some bizarre reason, you wanted to delay the decision on which loop method to use until runtime. Admittedly, this is an overly simple example. Ignore the lack of practicality of this case and bear with me. If you want to see some more practical uses, grab a copy of the source and take a look at the Assemblers project. It shows two methods of proxy generation, one that uses composition, and one that uses exterior interceptors.

Anyhow, back to this example. To start working with MetaCode, you have to use the objects defined in the `TypeModel` hierarchy. All dynamic types must exist inside a `MetaAssembly`. Then, we can create a `MetaType` that implements our `ILoopy` interface inside of it:

```csharp
MetaAssembly assembly = new MetaAssembly("Enkari.MetaCodeExample.Dynamic");
MetaType type = assembly.DefineType("TestType", new Type[] { typeof(ILoopy) });
```

Readers familiar with the `System.Reflection.Emit` namespace may be wondering, what about modules? There is actually a `MetaModule` class as well that actually contains the defined `MetaTypes`. However, since the majority of assemblies only contain a single module, the `MetaAssembly` type provides shortcuts to create types directly in a "default module" inside it.

Okay, so now we have the beginnings of a concrete implementation of `ILoopy`. However, to actually implement the type, you have to provide an implementation of the different members that the contract defines. There are two ways to define a method on a `MetaType`: _definition_ and _overriding_. As the name suggests, overriding means to override a method defined by a base type or interface. (It's somewhat akin to the `override` keyword in C#, but is used to implement interface types in addition to overriding methods marked `virtual` on base types.) In this case, we want to _override_ the `Loop()` method defined by our contract:

```csharp
MetaMethod method = type.OverrideMethod(typeof(ILoopy), "Loop");
```

So far, none of this is that impressive. Most of the functionality that we've covered so far matches that provided in the `System.Reflection.Emit` namespace. If we were using SRE, we would now start emitting CIL opcodes using the method's `ILGenerator`.

Instead, with MetaCode, we can use a _code builder_, which gives us a way to piece together code artifacts represented by the objects defined in the `CodeModel` namespace to create the method body. Right now, the only code builder that's defined is the `ImperativeCodeBuilder`, which presents an imperative programming interface to creating the method body:

```csharp
ImperativeCodeBuilder cb = new ImperativeCodeBuilder(method);
```

Now we can actually build the method. Let's start by declaring a local variable to store the count, and initialize it to the value of the first argument (the starting value of the loop):

```csharp
VariableReference countRef = cb.Declare("count", typeof(int), method.Arguments[0]);
```

Then, we can define the loop itself. I'll define this implementation using a while loop. We can refer to our defined "meta variable" using the `VariableReference` that was returned from the `Declare()` method call, and begin the while loop:

```csharp
cb.While(countRef < method.Arguments[1]);
```

This creates code inside the `MetaMethod` that does just what it reads like: the while loop will continue while the `count` variable is less than the value of the second argument of the method. Although it seems strange, you can define statements using the standard comparison operators. Behind the scenes, the operators are overloaded to create `MetaOperation` objects that do the actual comparisons. (For example, the `<` operator is overloaded to join two `MetaExpressions` in a `LessThanOperation`.)

Anyhow, at this point, any statements we define from now until we call `EndWhile()` will be defined inside the while loop's body. Let's create the increment statement:

```csharp
cb.Assign(countRef, countRef + method.Arguments[2]);
```

This increments the `count` variable by the value provided by the third argument of the method. Now, we can end the while loop:

```csharp
cb.EndWhile();
```

Now we're back out of the while block's body. We're almost done implementing our simple method. All that's left is to return the value of the `count` variable:

```csharp
cb.Return(countRef);
```

At this point, we've defined a valid concrete implementation of our `ILoopy` interface. It's still only meta code, though, meaning it's only defined as an object graph. Before we can execute it, it has to be "realized". Objects can only be realized once, and after they're realized, you can't edit them. The easiest way to realize the types is by calling one of two methods available on `MetaType`: `CreateType()`, which realizes the `MetaType` and returns a `System.Type`, or `CreateInstance()`, which realizes the `MetaType` and then calls `Activator.CreateInstance()` to create an object of the newly-created type.

In this case, we're only interested in a single instance of the `MetaType`, so we'll call `CreateInstance()`. The method actually returns a `System.Object`, but we can cast it to our contract type:

```csharp
ILoopy loopy = type.CreateInstance() as ILoopy;
```

You can then interact with the object as if you wrote it in your favorite .NET language. The following call will run through our loop and output "20" to the console:

```csharp
Console.WriteLine(loopy.Loop(1, 20, 1));
```

So there you have it. An important thing to remember is that once realized, the code you build with MetaCode is defined as CIL, so executing it is just as efficient as running any other method. Also, the realization process doesn't require triggering the compiler, so it's much faster than using the types in the `System.CodeDom` namespace.

If you're interested in learning more, you can [download the example project described here](http://kohari.org/assets/2007/1/16/metacodeexample.zip).

Also, please check out the [CodePlex project](http://www.codeplex.com/metacode), or get a copy of the code from the [Subversion repository](http://svn.enkari.com/metacode/trunk/). If you have questions or comments, feel free to post on the CodePlex forums.
