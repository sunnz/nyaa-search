#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const inquirer = require("inquirer");
const findOrgByName = require("./findOrgByName");

// load static data
const orgs = require("../data/organizations.json");
const tickets = require("../data/tickets.json");
const users = require("../data/users.json");

// immediately invoked function expression (iife)
// top level async/await not supported yet in nodejs < 16
(async function () {
  // greet smoke test
  const argv = yargs(hideBin(process.argv)).argv;
  const { greet = "hello" } = argv;
  let response = await inquirer.prompt([
    {
      type: "string",
      name: "name",
      message: "what's your name?",
      default: "someone",
    },
  ]);
  console.log(`${greet} ${response.name}`);
  // find org by name smoke test
  response = await inquirer.prompt([
    {
      type: "string",
      name: "name",
      message:
        "please enter the organisation name that you are looking for (case-insensitive)",
      default: "plasmos",
    },
  ]);
  const orgSearchResults = findOrgByName(orgs, response.name);
  console.log(orgSearchResults);
})();
