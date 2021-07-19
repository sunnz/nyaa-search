#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const inquirer = require("inquirer");
const words = require("lodash/words");
const findOrgByNames = require("./find-org-by-names");
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
  while (true) {
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
        message:
          "please enter search terms (separate terms by comma, space, camelCase, etc)",
        default: "Plasmos",
      },
    ]);
    const results = findOrgs(field, query);
    console.log(results);
  }
})();

function findOrgs(field, query) {
  const queryWords = words(query);
  const orgsByName =
    field === "name" || field === "all" ? findOrgByNames(orgs, queryWords) : [];
  const orgsByTags =
    field === "tags" || field === "all" ? findOrgByTags(orgs, queryWords) : [];
  return [...orgsByName, ...orgsByTags];
}
