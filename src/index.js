#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const inquirer = require("inquirer");

// load static data
const orgs = require("../data/organizations.json");
const tickets = require("../data/tickets.json");
const users = require("../data/users.json");

// immediately invoked function expression (iife)
// top level async/await not supported yet in nodejs < 16
(async function () {
  const argv = yargs(hideBin(process.argv)).argv;
  const { greet = "hello" } = argv;
  const response = await inquirer.prompt([
    {
      type: "string",
      name: "name",
      message: "what's your name?",
      default: "someone",
    },
  ]);
  console.log(`${greet} ${response.name}`);
  console.log(orgs[0]);
})();
