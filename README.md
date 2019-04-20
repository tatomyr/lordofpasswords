# Password Generator

The app generates a unique hash password for each service using masterpassword.
We use our own hashing algorithm to ensure the hashed password contains the needed amount of symbols of each type.
These are at least 2 numbers, 1 Latin character in upper case and 1 in lower case.
If the user chose using special symbols, the password should also contain at least 1 special character.

See the live page at [TODO: provide better link](https://sharp-kilby-69a6e3.netlify.com/)

See old versions at https://pw.netlify.com

# Development

To start the project on `localhost:8080` type `$ npm start` in Terminal.

All files are available to edit and deploy inside `src/` folder.

We don't minify nor optimize the code by intent to show users the actual code that run in the application.

You may also try `$ npm run parcel` but you have to put some changes to `src/app.js` file.

# Testing

Start end-to-end testing on `localhost:8080` with `$ npm run cypress`.
Notice that you have to have your development server started.

Run end-to-end tests in terminal with `$ npm run e2e`.

# Deployment

To deploy site on Netlify just push changes to the `master` branch.
Build command for Netlify: `npm run build` or `mkdir dist && cp -R src/* dist/`.
