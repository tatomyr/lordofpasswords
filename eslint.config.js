import js from "@eslint/js"
import globals from "globals"
import {defineConfig, globalIgnores} from "eslint/config"

export default defineConfig([
  globalIgnores(["test-results/", "playwright-report/"]),
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      "no-console": "error",
    },
  },
  {
    files: ["lordofpasswords.sw.js"],
    languageOptions: {globals: globals.serviceworker},
  },
  {
    files: ["bin/**/*.js", "playwright.config.js", "tests/**/*.js"],
    languageOptions: {globals: globals.node},
  },
])
