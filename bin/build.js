#!/urs/bin/node

/* eslint-disable no-console */

const fs = require("fs")
const execSync = require('child_process').execSync;

const date = new Date().toDateString()
const datetime = new Date().toISOString()

const html = fs.readFileSync("./index.html", "utf8")
const newHtml = html.replace(
  /<!-- date: -->.*<!-- :date -->/,
  `<!-- date: -->${date}<!-- :date -->`
)
fs.writeFileSync("./index.html", newHtml)

const serviceWorker = fs.readFileSync("./lordofpasswords.sw.js", "utf8")
const newServiceWorker = serviceWorker
  .replaceAll(
    /\/\* datetime: \*\/.*\/\* :datetime \*\//g,
    `/* datetime: */"${datetime}"/* :datetime */`
  )

fs.writeFileSync("./lordofpasswords.sw.js", newServiceWorker)

execSync('git add index.html lordofpasswords.sw.js')

console.log('Built on ' + datetime)