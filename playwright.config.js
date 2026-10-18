import {defineConfig, devices} from "@playwright/test"

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
    command: "npx http-server -p 8081 -c-1 --silent",
    url: "http://localhost:8081",
    reuseExistingServer: !isCI,
  },
})
