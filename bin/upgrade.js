#!/usr/bin/env node

/* eslint-disable no-console */

import fs from "node:fs"
import {execSync} from "node:child_process"
import {styleText} from "node:util"

const readDevDependencies = () =>
  JSON.parse(fs.readFileSync("./package.json", "utf-8")).devDependencies

const run = command => execSync(command, {stdio: "inherit"})

const devDependencies = readDevDependencies()
const names = Object.keys(devDependencies)

console.log()
console.log(styleText("yellow", "Upgrading dev dependencies. Please wait"))
console.log()
// Uninstall first, so that `npm install` picks the latest major versions.
run(`npm uninstall -D ${names.join(" ")}`)
console.log()
console.log(styleText("yellow", `Removed ${names.length} packages`))
console.log(styleText("yellow", "Installing new ones"))
console.log()
run(`npm install -D ${names.join(" ")}`)

const updatedDependencies = readDevDependencies()
console.log()
console.log(styleText("yellow", `Installed ${names.length} packages`))
for (const name of names) {
  if (devDependencies[name] !== updatedDependencies[name]) {
    console.log(
      styleText(
        "green",
        `  ↑ ${name}: ${devDependencies[name]} → ${updatedDependencies[name]}`
      )
    )
  }
}
