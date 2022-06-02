---
title: Fast Late-Bound Invocation with Expression Trees
subtitle: Tinkering with the new toys in the latest version of the .NET framework.
date: 2009-03-07T22:35:00
state: archived
type: instructional
category: dotnet
song: spotify:track:2yxkvnyno37480Hv1wuAee
---

_(Note: After working with expression trees further, I've found that generating CIL by hand is dramatically faster than using expression trees. Still, this is an interesting concept, and I've kept this post here for posterity.)_

{% lead-in %}The implementation of Ninject has some solutions to interesting problems.{% /lead-in %} One in particular is somewhat sticky: how do we call any method, without knowing what methods will be called, nor their signatures, until runtime? The easiest way to do this is via `MethodInfo.Invoke()`, but reflection-based invocation is _extremely_ expensive in comparison to normal invocation. Fortunately, we can solve this problem through the use of anonymous delegates and runtime code generation.

In order to do this, we need some sort of late-binding system. In Ninject 1, I used `DynamicMethod` and System.Runtime.Emit to emit CIL at runtime. This solution worked well, but was very complex, difficult to understand, and didn’t support medium trust scenarios. Ninject 2 instead leverages expression trees to accomplish the same thing --- and actually, under the hood, the solutions are identical, since expression trees are translated into CIL opcodes when you compile the `Expression<TDelegate>`. From a code perspective, however, using expression trees is a much cleaner solution because it offloads the heavy lifting to the types in the BCL.

Basically, what I’m talking about is taking any method and creating a delegate for it with this signature:

```csharp
delegate void object LateBoundMethod(object target, object[] arguments);
```

This is an _open delegate_, meaning it can be called on any instance of the type that declares the method that the delegate is bound to. The first parameter to the delegate, target, is the instance that the method will be called on. For example, if we create a `LateBoundMethod` delegate for `String.StartsWith()`, we can pass any string in as the first parameter.

The solution is surprisingly simple using expression trees:

```csharp
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace FastDelegates
{
  public delegate object LateBoundMethod(object target, object[] arguments);

  public static class DelegateFactory
  {
    public static LateBoundMethod Create(MethodInfo method)
    {
      ParameterExpression instanceParameter = Expression.Parameter(typeof(object), "target");
      ParameterExpression argumentsParameter = Expression.Parameter(typeof(object[]), "arguments");

      MethodCallExpression call = Expression.Call(
        Expression.Convert(instanceParameter, method.DeclaringType),
        method,
        CreateParameterExpressions(method, argumentsParameter));

      Expression<LateBoundMethod> lambda = Expression.Lambda<LateBoundMethod>(
        Expression.Convert(call, typeof(object)),
        instanceParameter,
        argumentsParameter);

      return lambda.Compile();
    }

    private static Expression[] CreateParameterExpressions(MethodInfo method, Expression argumentsParameter)
    {
      return method.GetParameters().Select((parameter, index) =>
        Expression.Convert(
          Expression.ArrayIndex(argumentsParameter, Expression.Constant(index)), parameter.ParameterType)).ToArray();
    }
  }
}
```

When you call the `Create()` method, `DelegateFactory` creates an anonymous delegate that accepts loosely-typed parameters, casts them, and invokes the actual method that you specified.

You can use the `DelegateFactory` like this:

```csharp
MethodInfo method = typeof(String).GetMethod("StartsWith", new[] { typeof(string) });
LateBoundMethod callback = DelegateFactory.Create(method);

string foo = "this is a test";
bool result = (bool) callback(foo, new[] { "this" });

result.ShouldBeTrue();
```

Obviously this is a contrived example since we know the type at compile-time. However, if you don’t know what types or methods you’ll be using, this is a great way to avoid the expense of reflection. After you build the delegate originally, your code operates reflection-free for as many times as you want to invoke the method.

We’re using this technique in Community Server REST futures, to bind a call to a REST actions to a specific method on a controller that handles the request. Since these REST actions must support many successive calls, the use of these generated delegates dramatically increases our performance versus reflection-based invocation.
