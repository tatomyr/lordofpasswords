import {defineConfig, devices} from "@playwright/test"

// Node 24 defines `process`; ESLint uses the browser env for this project.
/* eslint-disable no-undef */
const isCI = Boolean(process.env.CI)

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? "github" : "list",
  use: {
    baseURL: "http://localhost:8081",
    trace: "on-first-retry",
  },
  projects: [{name: "chromium", use: {...devices["Desktop Chrome"]}}],
  // Playwright starts the static server and stops it after the run.
  webServer: {
    command: "npx static-server -p 8081",
    url: "http://localhost:8081",
    reuseExistingServer: !isCI,
  },
})
