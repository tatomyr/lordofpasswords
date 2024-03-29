# Contribution Guide

## Development

To launch the project on `localhost:8080`, run `npm start` in the terminal.

All files are available to edit and deploy inside the root folder.
We intentionally don't minify nor optimize the code to show users the actual code that runs in the application.

## Testing

Start end-to-end testing on `localhost:8080` with `$ npm run cypress`.
Notice that you have to have your development server started.

Run end-to-end tests in the terminal with `$ npm run e2e`.
It will run a separate testing server on port `8081`.

## Deployment

The content of the `main` branch will be served via `github-pages`.
Please create a new branch out of `main`, put your changes there and create a merge request to the `main` branch.

Every new release should be signed off with the `npm run build` command (processed automatically on pre-commit).
This will update `service-worker.js` file, what ensures cache invalidation.
Please do not remove comments like `/* datetime: */` from `index.html` and `lordofpasswrods.sw.js` files as the build script relies on them.
