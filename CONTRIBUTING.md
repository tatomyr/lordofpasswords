# Contribution Guide

## Development

To launch the project on `localhost:8080`, run `npm start` in the terminal.

All files are available to edit and deploy inside the root folder.
We intentionally don't minify nor optimize the code to show users the actual code that runs in the application.

## Testing

Run all tests in the terminal with `npm test`.
Playwright starts its own server on port `8081` and stops it after the run.
The first run on a new machine needs the browser: `npx playwright install chromium`.

Open the interactive test runner with `npm run test:ui`.

The `tests` folder holds two kinds of tests.
`app.spec.js` checks the password algorithm in `app.js` without a browser.
`index.spec.js` drives the page in a browser.

## Deployment

The content of the `main` branch will be served via `github-pages`.
Please create a new branch out of `main`, put your changes there and create a merge request to the `main` branch.

Every new release gets an entry in `CHANGELOG.md` and a version bump in `package.json`.
The changelog lists only changes that a user of the app can see, such as a new feature, a changed behaviour, or a fixed bug.
Tests, docs, tooling, and refactoring stay out of it.
Every new release should be signed off with the `npm run build` command (processed automatically on pre-commit).
This will update the `lordofpasswords.sw.js` file, which ensures cache invalidation.
Please do not remove comments like `/* datetime: */` from `index.html` and `lordofpasswords.sw.js` files as the build script relies on them.
