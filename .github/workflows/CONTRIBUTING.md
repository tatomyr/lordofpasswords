# Contribution Guide

## Development

To start the project on `localhost:8080` type `$ npm start` in Terminal.

All files are available to edit and deploy inside `src/` folder.

We don't minify nor optimize the code by intent to show users the actual code that run in the application.

## Testing

Start end-to-end testing on `localhost:8080` with `$ npm run cypress`.
Notice that you have to have your development server started.

Run end-to-end tests in terminal with `$ npm run e2e`.
This will run separate testing server on port `8081`.

## Deployment on Netlify (deprecated)

To deploy site on Netlify just push changes to the `master` branch.
Build command for Netlify: `npm run build`.
