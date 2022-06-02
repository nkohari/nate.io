---
title: 'Siesta: Painless REST via ASP.NET MVC'
subtitle: Just a random idea pulled from the Zen codebase.
date: 2009-08-12T01:26:00
state: archived
type: instructional
category: dotnet
song: spotify:track:0j4qZmspume3BzExQW3pJz
---

[Zen](http://agilezen.com/) uses quite a few open source libraries, and I feel a sense of responsibility to contribute back where I can. To that end, I’m releasing the basic infrastructure that powers the Zen API under the name [Siesta](http://github.com/enkari/siesta/tree/master).

Siesta is a simple and flexible [REST](http://en.wikipedia.org/wiki/REST) system driven by ASP.NET MVC. While you can take the Siesta bits and use them directly in your app, it’s intended more as an example of how to implement your own system.

The basic idea behind Siesta is to communicate only using models within your application, and allow the infrastructure to handle the serialization and de-serialization, similar to how a view engine manipulates `ViewModels` or `ViewData`. Models are just POCOs, and serialization is controlled the `[DataContract]` and `[DataMember]` attributes in `System.Runtime.Serialization` (so yes, this requires .NET 3.5).

Siesta also uses the (sweet-with-extra-awesomesauce) [JSON.NET](http://www.codeplex.com/Json) library from [James Newton-King](http://james.newtonking.com/). There’s a `DataContractJsonSerializer` in the BCL now, but as far as I could tell, it doesn’t support indentation. JSON.NET supports both, so it’s a great fit. I’ve also been using it forever, so I’m just used to it --- if you deal with JSON formatting, it’s definitely worth a look.

The wire (serialization) format is based on MIME types, and Siesta comes with XML and JSON built-in. However, it’s also extensible by implementing a new `IModelSerializer`. Speaking of which, if someone wants to implement one for YAML, it would be greatly appreciated. ;)

As described in the [Zen API documentation](http://learn.agilezen.com/api/concepts/formatting), the wire format is determined by the `Content-Type` and `Accept` headers. `Content-Type` is preferred for incoming data, and `Accept` is preferred for outgoing data. If a header is missing, the system will fail over to the other one.

Here's an example of an entity that can be serialized via REST:

```csharp
[DataContract(Name = "user", Namespace = "")]
public class User : IEntity
{
  [DataMember(Name = "id")]
  public int Id { get; set; }

  [DataMember(Name = "username")]
  public string UserName { get; set; }

  [DataMember(Name = "name")]
  public string Name { get; set; }

  [DataMember(Name = "email")]
  public string Email { get; set; }
}
```

And its matching controller:

```csharp
public class UserController : SiestaControllerBase
{
  public IRepository<User> UserRepository { get; private set; }

  public UserController(IRepository<User> userRepository)
  {
    UserRepository = userRepository;
  }

  public ModelResult<User> Get(GetRequest request)
  {
    User user = UserRepository.Get(request.Id);

    if (user == null)
      throw NotFound();

    return Model(user, request.Formatting);
  }

  //...
}
```

Don't worry, `SiestaControllerBase` is just a simple base controller which provides the `Model()` method shortcut. This (and the `IEntity` interface you might have noticed on `User`) are entirely optional, and are actually part of the `Siesta.Example` assembly rather than the main `Siesta` assembly. As long as the types you want to communicate with are serializable, they'll work with Siesta.

In contrast to the Siesta example, in Zen, we actually have separate models (which act as [DTOs](http://en.wikipedia.org/wiki/Data_Transfer_Object), and are serialized to/from a wire format) and entities (which are persisted to the database). The example doesn’t show this because it requires a whole separate mapping step, which can get tricky. I would highly recommend that if you use this in a real-world app, you create a separate type hierarchy and map between them.

Anyhow, you can grab the Siesta bits on [GitHub](http://github.com/enkari/siesta/tree/master), including the full version of this (simple) example. If you have feedback, by all means let me know! There’s actually quite a bit of stuff in Zen that I’d like to release as OSS --- it’s just a matter of getting the time to split the code off the product and wrap it up.
