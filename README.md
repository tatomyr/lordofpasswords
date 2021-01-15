# Lord of Passwords

[![Netlify Status](https://api.netlify.com/api/v1/badges/afb7858b-8b7a-44b2-8927-3488748bb000/deploy-status)](https://app.netlify.com/sites/lordofpasswords/deploys)

> **One password to rule them all…**

The app generates a unique hash password for each service using masterpassword.
We use our own hashing algorithm to ensure the hashed password contains the needed amount of symbols of each type.
These are at least 2 numbers, 1 Latin character in upper case and 1 in lower case.
If the user chose using special symbols, the password should also contain at least 1 special character.

See the [live page](https://lordofpasswords.netlify.com/).

See old versions [here](https://pw.netlify.com).

## Development

To start the project on `localhost:8080` type `$ npm start` in Terminal.

All files are available to edit and deploy inside `src/` folder.

We don't minify nor optimize the code by intent to show users the actual code that run in the application.

## Testing

Start end-to-end testing on `localhost:8080` with `$ npm run cypress`.
Notice that you have to have your development server started.

Run end-to-end tests in terminal with `$ npm run e2e`.
This will run separate testing server on port `8081`.

## Deployment

To deploy site on Netlify just push changes to the `master` branch.
Build command for Netlify: `npm run build`.
