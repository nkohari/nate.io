---
title: Context Variables in Ninject
date: 2008-03-14T23:16:00
state: archived
type: instructional
category: ninject
---

{% lead-in %}Michael Hart asked{% /lead-in %} a [very good question](http://groups.google.com/group/ninject/browse_thread/thread/f5676fd45f3e4826) on the Ninject user group. Specifically, he was looking for a simple way to integrate Ninject into the ASP.NET MVC `IControllerFactory`, to use the kernel to activate controllers when they were requested. He was doing it by creating a custom context. While this is a very creative solution, it's really just a workaround, and gets messy quickly.

Michael's question made me realize that Ninject's contextual binding system is focused primarily on information that is known at compile-time, and doesn't provide much support for information not known until run-time. To fix that problem, I've enhanced the transient parameters feature that I announced yesterday to include _context variables_. Simply put, context variables are just values that you define during your call to the kernel's `Get()` method. You can then declare conditional bindings that will examine these variables and alter the activation strategy accordingly.

For example, here's how to use context variables to activate controllers for ASP.NET MVC. The magic happens in the `CreateController` method of the `IControllerFactory`:

```csharp
public IController CreateController(RequestContext context, string controllerName);
```

The controller name maps one-to-one with a controller type, which should be activated by the Ninject kernel. In order to let the kernel know which controller to activate, we'll pass the controller name in as a context variable:

```csharp
public IController CreateController(RequestContext context, string controllerName) {
  return Kernel.Get<IController>(
    With.Parameters
      .ContextVariable(“controllerName”, controllerName)
 );
}
```

Now the controller name is available in our activation context. Now we can declare bindings in a module that select the correct controller:

```csharp
public class ControllerModule : StandardModule {
  public override Load() {
    Bind<IController>().To<HomeController>().Only(
      When.ContextVariable(“controllerName”).EqualTo(“home”)
    );
    Bind<IController>().To<UserController>().Only(
      When.ContextVariable(“controllerName”).EqualTo(“user”)
    );
  }
}
```

Now, life is good, but we can do better. Having to declare a binding for each controller is a little cumbersome. Here's a quick-and-dirty way to automatically register all controllers in certain assemblies. It's based off the `DefaultControllerFactory` in MonoRail:

```csharp
public class ControllerModule : StandardModule
{
  private IEnumerable<Assembly> _assemblies;

  public ControllerModule(params Assembly[] assemblies)
  {
    _assemblies = assemblies;
  }

  public override void Load()
  {
    foreach (Assembly assembly in _assemblies)
    {
      IDictionary<string, Type> controllers = FindControllers(assembly);

      foreach (KeyValuePair<string, Type> entry in controllers)
      {
        string name = entry.Key;
        Type type = entry.Value;

        Bind(typeof(IController)).To(type).Only(
          When.ContextVariable(“controllerName”).EqualTo(name)
        );
      }
    }
  }

  private IDictionary<string, Type> FindControllers(Assembly assembly)
  {
    Dictionary<string, Type> controllers = new Dictionary<string, Type>();

    foreach (Type type in assembly.GetExportedTypes())
    {
      if (!type.IsPublic || type.IsAbstract || type.IsInterface || type.IsValueType)
        continue;

      if (typeof(IController).IsAssignableFrom(type))
        controllers.Add(GetNameForController(type), type);
    }

    return controllers;
  }

  private string GetNameForController(Type type)
  {
    if (type.Name.EndsWith(“Controller”))
      return type.Substring(0, name.IndexOf(“Controller”));
    else
      return type.Name;
  }
}
```

To use this, just load the assemblies when you create the module, and pass them in to the constructor:

```csharp
Assembly assembly = Assembly.Load(“MySite.Controllers”);
IKernel kernel = new StandardKernel(
  new ControllerModule(assembly)
);
```

Disclaimer! I scribbled this code in Notepad, so it may or may not be exactly correct. It may also melt your monitor, thereby singing your eyebrows off. Use at your own risk! :)

These enhancements have been committed to [the trunk](http://ninject.googlecode.com/svn/trunk/), so feel free to tinker and/or try to break them. I'm going to continue to work to improve the flexibility of Ninject's binding logic and make run-time information more accessible to the contextual binding system. If anyone has any thoughts, I'd love to hear them!
