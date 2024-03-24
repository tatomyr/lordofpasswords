# Lord of Passwords

> **One password to rule them all**

The app generates a unique hashed password for each _service_ using _masterpassword_.
**Lord of Passwords** uses a special hashing algorithm to ensure that generated passwords contain the needed amount of symbols of each type.
Those are at least two numbers, one Latin character in uppercase, and one in lowercase.
If the user chooses to use special symbols, the password should also contain at least one special character.

See the [live page →](https://tatomyr.github.io/lordofpasswords/)

![check](https://github.com/tatomyr/lordofpasswords/actions/workflows/check.yaml/badge.svg)

---

## Why use Lord of Passwords?

It is considered good practice to have different passwords for each site or another service.
And it's also desirable to have passwords that are hard to guess but easy to remember.

![Remembering an old password](https://i.kym-cdn.com/photos/images/original/001/634/432/fb1.jpg)

That's where **Lord of Passwords** comes in handy.
You only need to remember your _masterpassword_.
Also, you have to specify a memorable name for a site or service (for this site it probably could be **lordofpasswords**).
Then the app does the rest -- mixes them both together and ensures that you get the proper password format (e.g., with the required number of different types of characters).

You can access **Lord of Passwords** on a desktop, a tablet or a mobile.
You can even kind of install it!

Then, if you know which service you're trying to get access to and remember your single _masterpassword_, you can always have your key using **Lord of Passwords**.

## Is it safe to use Lord of Passwords?

The short answer is yes, it is. And that's why.

Using this application is completely anonymous.
It doesn't track your identity, so it doesn't know which user has issued the password.

Moreover, it neither sends your data over the Internet nor stores it (except for the password length, which is being stored locally for the sake of convenience, so you don't have to enter the number each time).
You can go completely offline, and your app will continue working because we don't rely on any remote database.
So, no one could crack your sensitive data because it isn't stored anywhere but inside your head.

To ensure that someone else cannot access your data, we don't depend on any third-party library that may change over time and possibly bring malicious instructions.

We don't minify nor uglify the app code, so you can check it using developer tools.
All the application's code is also available on GitHub.
