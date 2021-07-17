#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const inquirer = require("inquirer");
const words = require("lodash/words");
const findOrgByName = require("./find-org-by-name");
const findOrgByTags = require("./find-org-by-tags");

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
  console.log(greet);
  // find org by name/tag smoke test
  const { field, query } = await inquirer.prompt([
    {
      type: "list",
      name: "field",
      message: "select field",
      choices: ["name", "tags", "all"],
      default: "all",
    },
    {
      type: "string",
      name: "query",
      message: "please enter search terms",
      default: "plasmos",
    },
  ]);
  const queryWords = words(query);
  const results = [
    ...(field === "name" || field === "all" ? findOrgByName(orgs, query) : []),
    ...(field === "tags" || field === "all"
      ? findOrgByTags(orgs, queryWords)
      : []),
  ];
  console.log(results);
})();
