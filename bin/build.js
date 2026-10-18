#!/usr/bin/env node

/* eslint-disable no-console */

import fs from "node:fs"
import {execSync} from "node:child_process"

const date = new Date().toDateString()
const datetime = new Date().toISOString()

const html = fs.readFileSync("./index.html", "utf8")
const newHtml = html.replace(
  /<!-- date: -->.*<!-- :date -->/,
  `<!-- date: --> ${date} <!-- :date -->`
)
fs.writeFileSync("./index.html", newHtml)

const serviceWorker = fs.readFileSync("./lordofpasswords.sw.js", "utf8")
const newServiceWorker = serviceWorker.replaceAll(
  /\/\* datetime: \*\/.*\/\* :datetime \*\//g,
  `/* datetime: */ "${datetime}" /* :datetime */`
)

fs.writeFileSync("./lordofpasswords.sw.js", newServiceWorker)

execSync("git add index.html lordofpasswords.sw.js")

console.log("Built on " + datetime)
