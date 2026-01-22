---
title: Ninject Lives!
date: 2008-03-14T00:59:00
state: archived
type: essay
format: instructional
category: ninject
---

{% lead-in %}It's been too quiet around here lately{% /lead-in %}, so I figured I'd break the radio silence and talk about [Ninject](http://ninject.org/) a little bit. I've let the project lie dormant a little too long, and a few enhancements and fixes were well past due.

The most interesting one is the addition of transient parameters. Several people have asked for the ability to pass arguments to the call to the kernel's `Get()` method. I've always dodged the question because I felt like ordered un-typed arguments were clunky, dangerous, and difficult to implement. Being the fan I am of fluent interfaces, I came up with a solution. Bear in mind that this is a relatively advanced use for Ninject, and is only useful in edge cases.

Let's say you have a simple `DataService` which provides access to a database via ADO.NET:

```csharp
public class DataService {
  [Inject]
  public DataService(string connectionString) {
    ...
  }
}
```

Up until now, you would be required to create a binding for the `string` type that would return the connection string. By using the new transient parameter support, you can directly specify the connection string you want to pass to the service when it is requested from the kernel:

```csharp
IKernel kernel = ...
DataService service = kernel.Get<DataService>(
  With.Parameters
    .ConstructorArgument(“connectionString”, “Data Source=localhost,...”)
);
```

When the kernel activates the `DataService` instance, it will pass the connection string you specify in the `ConstructorArgument()` call to the `DataService`'s constructor. This overrides any bindings declared for string, including conditional ones. The same thing is available for properties as well. Let's say your `DataService` looks like this instead (using the fancy-pants automatic properties in C# 3.0):

```csharp
public class DataService {
  [Inject]
  public string ConnectionString { get; set; }
}
```

You could inject a value of your choice like this:

```csharp
IKernel kernel = ...
DataService service = kernel.Get<DataService>(
  With.Parameters
    .PropertyValue(“ConnectionString”, “Data Source=localhost,...”)
);
```

Note that your properties and constructors still need to be selected for injection for the transient parameters to kick in. That means that you have to mark properties with `[Inject]` (or whatever attribute you've set in `KernelOptions` if you've overridden it).

There's also some fun stuff for setting multiple arguments at once. Say you have a simple service like this:

```csharp
public class MyService {
  [Inject]
  public MyService(string foo, int bar) {
    ...
  }
}
```

You can declare multiple transient constructor arguments with the fluent interface:

```csharp
IKernel kernel = ...;
MyService service = kernel.Get<MyService>(
  With.Parameters
    .ConstructorArgument(“foo”, “hello”)
    .ConstructorArgument(“bar”, 42)
);
```

Or, you can use a dictionary:

```csharp
Dictionary args = new Dictionary<string, object>();
args.Add(“foo”, “hello”);
args.Add(“bar”, 42);

IKernel kernel = ...;
MyService service = kernel.Get<MyService>(
  With.Parameters
    .ConstructorArguments(args)
);
```

Or, you can take advantage of C# 3.0 anonymous types, using a trick that's becoming pretty popular these days. The property names of the anonymous type must correspond to the names of the constructor arguments. The value of each property will be read via reflection and injected into their corresponding argument.

```csharp
IKernel kernel = ...
MyService service = kernel.Get<MyService>(
  With.Parameters
    .ConstructorArguments(new { foo = “hello”, bar = 42 })
);
```

This same support is available for defining multiple property values at once as well. ~~These changes are coming to the trunk sometime tonight. I'm toying with the idea of relocating the Subversion repository to Beanstalk, but I haven't decided for sure yet.~~ Update: The changes have been committed to the [repository](http://http://ninject.googlecode.com/svn/trunk), and I'm going to keep it hosted with Google Code.

If you have any thoughts on the new transient parameter syntax, I'd love to hear them!
