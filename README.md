# Lord of Passwords

> **One password to rule them all**

The app generates a unique hashed password for each **service** using **masterpassword**.
We use our own hashing algorithm to ensure the hashed password contains the needed amount of symbols of each type.
These are at least 2 numbers, 1 Latin character in upper case and 1 in lower case.
If the user chose using special symbols, the password should also contain at least 1 special character.

See the [live page →](https://tatomyr.github.io/lordofpasswords/)

![check](https://github.com/tatomyr/lordofpasswords/actions/workflows/check.yaml/badge.svg)
![deploy](https://github.com/tatomyr/lordofpasswords/actions/workflows/deploy.yaml/badge.svg)

---

## Why use Lord of Passwords?

It is considered good practice to have a different password for each site or another service. 
And it's also desirable to have passwords that are hard to guess but easy to remember.

![remembering an old password](./old-password.jpeg)

That's where the **Lord of Passwords** comes in handy. 
You only need to remember your masterpassword. 
Also, you have to specify a memorable name for a site or service (for this site it probably could be **lordofpasswords**). 
Then the app does the rest - mixes them both together and ensures that you'll get the proper password format (e. g. with the required number of different types of characters).

You can access the Lord of Passwords on a desktop, a tablet or on your mobile. 
You can even kind of install it!

Then if you know which service you're trying to get access to and remember your single masterpassword, you can always have your key using Lord of Passwords.

## Is it safe to use Lord of Passwords?

The short answer is yes, it is. And that's why.

Using this application is completely anonymous. 
It doesn't track your identity, so it doesn't know which user has issued the password.

Moreover, it neither sends your data over the internet nor stores it, except for password length. 
It is being stored locally for the sake of users' convenience, so you don't need to enter the number each time.
You can go completely offline, and your app will continue working because we don't rely on any kind of database. 
So no one could crack your sensitive data because it isn't stored anywhere but inside your head.

To ensure that someone else cannot access your data, we don't depend on any third-party library that may change over time and possibly bring some malicious instructions.

Also, we prevent any calls over the internet from this application. 
So even if some malicious extension did read your personal data, they wouldn't have sent them anywhere.

We don't minify nor uglify the app code, so you can check it out using developer tools. 
All the application's code is also available on Github.
