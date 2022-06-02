---
title: Functional Programming and Database Access
date: 2007-09-07T22:19:00
state: archived
type: instructional
category: dotnet
---

{%lead-in %}Something clicked in my head a few weeks ago{% /lead-in %}, and ever since, I've found myself using more and more functional programming techniques. Even with C# 2.0, there are a lot of things you can do to make your code cleaner and easier to read. I recently came up with an interesting pattern for database access using ADO.NET, so I thought I'd share it. Essentially, it's a way to create a quick-and-dirty object/relational mapper via a simple pattern rather than by using a framework.

**Disclaimer:** I _highly_ recommend that, instead of using the pattern described here, you look into a real ORM framework like [NHibernate](http://nhibernate.org/). The only reason I'm using this at all is because I developed it for the .NET compact framework, and as such, I don't have the luxury of real ORM.

Also, if you looked at the length of this post and your tl;dr alarm went off, don't worry, the bulk is mostly code, and the payoff is worth it. :)

First, let's consider a simple database table:

```sql
create table Users (
   UserName varchar(20) primary key,
   FirstName varchar(50) not null,
   LastName varchar(50) not null,
   Email varchar(100) null
);
```

We could easily represent this as an entity in our code using the following simple type (property get/set methods are omitted for brevity):

```csharp
class User {
  private string _userName;
  private string _firstName;
  private string _lastName;
  private string _email;

  public string UserName { ... }
  public string FirstName { ... }
  public string LastName { ... }
  public string Email { ... }
}
```

This is a common pattern that's been around for a long time. When you want to load a user from the database, you run a `SELECT` statement, and use an `IDataReader` to load the information from the query result, and populate the `User` object:

```csharp
public User GetUser(string userName)
{
  string sql = "select UserName, FirstName, LastName, Email "
             + "from Users where UserName = @UserName";

  using (SqlConnection connection = new SqlConnection(...))
  using (SqlCommand command = new SqlCommand(sql, connection))
  {
    command.Parameters.Add("@UserName", SqlDbType.VarChar).Value = userName;
    using (SqlDataReader reader = command.ExecuteReader())
    {
      if (!reader.Read())
        return null;

      User user = new User();
      user.UserName = reader.GetString(0);
      user.FirstName = reader.GetString(1);
      user.LastName = reader.GetString(2);
      user.Email = reader.GetString(3);

      return user;
    }
  }
}
```

This works just fine, but there are a couple of problems. First, our data retrieval code is coupled to the code that populates the object (the "ORM" code). This means that if we wanted to add a method that returned a list of all users with a given last name, we would have to duplicate the ORM code in the other method. Second, there's a hidden bug in the ORM code... the `Email` column is nullable, but we're not checking it with `IsDBNull` before we call `GetString()`. This is easily fixed, but if you've duplicated the code in your search method, you have to be sure to update all copies of it.

This is an example of a violation of the Single Responsibility Principle (as it pertains to methods). A simple way to fix this is to pull the ORM code out into a separate method and call it. This would let us re-use it in our search method:

```csharp
public User GetUser(string userName)
{
  string sql = "select UserName, FirstName, LastName, Email "
             + "from Users where UserName = @UserName";

  using (SqlConnection connection = new SqlConnection(...))
  using (SqlCommand command = new SqlCommand(sql, connection))
  {
    command.Parameters.Add("@UserName", SqlDbType.VarChar).Value = userName;
    using (SqlDataReader reader = command.ExecuteReader())
    {
      if (!reader.Read())
        return null;
      else
        return ReadUser(reader);
    }
  }
}

public List GetAllUsersByLastName(string lastName)
{
  List<User> results = new List<User>();

  string sql = "select UserName, FirstName, LastName, Email "
             + "from Users where LastName = @LastName";

  using (SqlConnection connection = new SqlConnection(...))
  using (SqlCommand command = new SqlCommand(sql, connection))
  {
    command.Parameters.Add("@LastName", SqlDbType.VarChar).Value = lastName;
    using (SqlDataReader reader = command.ExecuteReader())
    {
      while (reader.Read())
        results.Add(ReadUser(reader));
    }
  }

  return results;
}

private User ReadUser(IDataRecord record)
{
  User user = new User();

  user.UserName = record.GetString(0);
  user.FirstName = record.GetString(1);
  user.LastName = record.GetString(2);
  user.Email = record.GetString(3);

  return user;
}
```

This is getting better, but we've still got a bunch of boilerplate code. How do we get rid of it?

First, a quick introduction to the functional programming capabilities in C# 2.0. There are a few basic delegate definitions built into the `System` namespace. If you haven't used them before, here they are:

```csharp
delegate void Action<T>(T obj);
delegate bool Predicate<T>(T obj);
delegate TOutput Converter<TInput, TOutput>(TInput input);
```

These drive the functional capabilities that are seeping into the .NET base class library. For example, `List<T>` has a `ForEach()` method, which accepts an `Action<T>` and executes it for each item in the list.

What might not be immediately apparent is that many existing methods already match the signatures of these delegates. In our case, our `ReadUser()` method is actually a `Converter<IDataRecord, User>`, which just means that it's a method that takes an `code` as input, and returns a `User`. Combined with the automatic delegate creation feature of C# 2.0, this means that anywhere a `Converter<IDataRecord, User>` is expected, we can pass in `ReadUser()`.

Let's try to flex these new-found functional programming muscles to solve our boilerplate code problem. Let's create a "helper" class that can abstract out what we want to do:

```csharp
static class DbHelper
{
  public static T ExecuteAndReadOne<T>(DbCommand command, Converter<IDataRecord, T> readMethod)
  {
    using (DbDataReader reader = command.ExecuteReader())
    {
      if (!reader.Read())
        return default(T);
      else
        return readMethod(reader);
    }
  }

  public static List<T> ExecuteAndReadAll<T>(DbCommand command, Converter<IDataRecord, T> readMethod)
  {
    List<T> results = new List<T>();

    using (DbDataReader reader = command.ExecuteReader())
    {
      while (reader.Read())
        results.Add(readMethod(reader));
    }

    return results;
  }
}
```

Consider for a moment what the `readMethod` parameter actually represents in `ExecuteAndReadOne()` and `ExecuteAndReadAll()`. We'll be passing in a _method_, which will be called to do the actual object creation. Using `DbHelper` means that our original code is simplified significantly:

```csharp
public User GetUser(string userName)
{
  string sql = "select UserName, FirstName, LastName, Email "
             + "from Users where UserName = @UserName";

  using (SqlConnection connection = new SqlConnection(...))
  using (SqlCommand command = new SqlCommand(sql, connection))
  {
    command.Parameters.Add("@UserName", SqlDbType.VarChar).Value = userName;
    return DbHelper.ExecuteAndReadOne<User>(command, ReadUser);
  }
}

public List<User> GetAllUsersByLastName(string lastName)
{
  string sql = "select UserName, FirstName, LastName, Email "
             + "from Users where LastName = @LastName";

  using (SqlConnection connection = new SqlConnection(...))
  using (SqlCommand command = new SqlCommand(sql, connection))
  {
    command.Parameters.Add("@LastName", SqlDbType.VarChar).Value = lastName;
    return DbHelper.ExecuteAndReadAll<User>(command, ReadUser);
  }
}

private User ReadUser(IDataRecord record)
{
  User user = new User();

  user.UserName = record.GetString(0);
  user.FirstName = record.GetString(1);
  user.LastName = record.GetString(2);
  user.Email = record.GetString(3);

  return user;
}
```

See how we're passing in the `ReadUser` method to the `Execute*()` calls? When you build this code, the compiler actually creates a `Converter<IDataRecord, User>` delegate for `ReadUser()` and passes that into the `Execute*()` methods of the `DbHelper` type.

This is great so far, but we can do better still. Remember the problem with the `Email` column being nullable? Adding `IsDBNull()` calls to our reader methods gets old fast, and makes the code look pretty ugly:

```csharp
private User ReadUser(IDataRecord record)
{
  User user = new User();

  user.UserName = record.GetString(0);
  user.FirstName = record.GetString(1);
  user.LastName = record.GetString(2);
  user.Email = (record.IsDBNull(3) ? null : record.GetString(3));

  return user;
}
```

Doesn't look too bad now, but in a realistic database table with 50 columns, 25 of which are nullable, it'll get irritating. Also, if we change the nullability of a field, we have to always remember to add the check to our `ReadUser()` method. (What? A database that changes? Never! :)

However, consider the`GetString` method of the `IDataRecord` interface (which our `SqlDataReader` implements). It takes an integer (the index of the column) and returns a string. That means it qualifies as a `Converter<int, string>`!

We can use this knowledge to add a couple methods to `DbHelper` to abstract out the `DBNull` checks:

```csharp
static class DbHelper
{
  // ...
  public static T SafeRead(IDataRecord record, int index, Converter readMethod)
  {
    return SafeRead(record, index, readMethod, default(T));
  }

  public static T SafeRead(IDataRecord record, int index, Converter readMethod, T defaultValue)
  {
    if (record.IsDBNull(index))
      return defaultValue;
    else
      return readMethod(index);
  }
}
```

The first `SafeRead` overload will return the default value for the specified type if the field is null. The second overload lets you specify your own value to return on null instead. This is useful in cases when you want to return a special flag value for null entries --- for example, if it's an integer column, but zero is a valid value.

Now, we don't need to worry about nulls in our `ReadUser` method:

```csharp
private User ReadUser(IDataRecord record)
{
  User user = new User();

  user.UserName = DBHelper.SafeRead<string>(record, 0, record.GetString);
  user.FirstName = DBHelper.SafeRead<string>(record, 1, record.GetString);
  user.LastName = DBHelper.SafeRead<string>(record, 2, record.GetString);
  user.Email = DBHelper.SafeRead<string>(record, 3, record.GetString);

  return user;
}
```

We're actually passing the `GetString` method of our record object to the `SafeRead` method. The `SafeRead` method will do the null check, and if the field is not null, it will call the `GetString` method to get its value. If the field contains a null value, `GetString` will not be called.

There's one final thing to implement, and in my opinion, is pretty friggin' cool. There's a static type in the `System` namespace called `Convert`, which contains a bunch of static methods that do conversion. For example, there's a method called `Convert.ToDateTime` that takes an `object` and returns a `DateTime`. Get it? It's a `Converter<object, DateTime>`!

Here's a couple additional methods to add to `DbHelper`:

```csharp
static class DbHelper
{
  //...
  public static T ExecuteScalar<T>(DbCommand command, Converter<object, T> converter)
  {
    return ExecuteScalar<T>(command, converter, default(T));
  }

  public static T ExecuteScalar<T>(DbCommand command, Converter<object, T> converter, T defaultValue)
  {
    object result = command.ExecuteScalar();
    return (result == DBNull.Value) ? defaultValue : converter(result);
  }
}
```

These methods work essentially like the `SafeRead` methods, only calling the provided conversion method if the scalar value returned by the query is not null. Now, if you want to run a query that returns a single value (say a `string`), which may be null, it's easy:

```csharp
public string GetEmail(string userName)
{
  string sql = "select Email "
             + "from Users where UserName = @UserName";

  using (SqlConnection connection = new SqlConnection(...))
  using (SqlCommand command = new SqlCommand(sql, connection))
  {
    command.Parameters.Add("@UserName", SqlDbType.VarChar).Value = userName;
    return DbHelper.ExecuteScalar<string>(command, Convert.ToString);
  }
}
```

If you're used to a static language, it takes some time to get used to treating methods more like variables. However, as you can see, it can make your code cleaner and more elegant --- not to mention smarter and less prone to bugs!
