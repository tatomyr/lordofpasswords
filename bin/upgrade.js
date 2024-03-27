#!/usr/bin/env node

/* eslint-disable no-undef, no-console */

const {exec} = require("child_process")
const fs = require("fs")
const chalk = require("chalk")
const {devDependencies} = require("../package.json")

console.log()
console.log(chalk.yellow("Upgrading dev dependencies. Please wait"))
console.log()
const dependensiesList = Object.keys(devDependencies).join(" ")
const processOutput = (error, stdout, stderr) => {
  if (error) {
    console.log(chalk.red(error))
    return
  }
  console.log(chalk.blue(stdout))
  console.log(chalk.red(stderr))
}
const uninstallProcess = exec(
  `npm uninstall -D ${dependensiesList}`,
  processOutput
)
uninstallProcess.on("exit", command1 => {
  if (command1 !== 0) {
    console.log("Exit command:", command1)
  }
  console.log()
  console.log(
    chalk.yellow(`Removed ${Object.keys(devDependencies).length} packages`)
  )
  console.log(chalk.yellow("Installing new ones"))
  console.log()
  const installProcess = exec(
    `npm install -D ${dependensiesList}`,
    processOutput
  )
  installProcess.on("exit", command2 => {
    if (command2 !== 0) {
      console.log("Exit command:", command2)
    }
    const updatedDependencies = JSON.parse(
      fs.readFileSync("./package.json", "utf-8")
    ).devDependencies
    console.log()
    console.log(
      chalk.yellow(`Installed ${Object.keys(devDependencies).length} packages`)
    )
    // eslint-disable-next-line no-restricted-syntax
    for (const name in devDependencies) {
      if (devDependencies[name] !== updatedDependencies[name]) {
        console.log(
          chalk.green(
            `  ↑ ${name}: ${devDependencies[name]} → ${updatedDependencies[name]}`
          )
        )
      }
    }
  })
})
