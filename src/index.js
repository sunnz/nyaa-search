#!/usr/bin/env node
const { inspect } = require("util");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const inquirer = require("inquirer");
const words = require("lodash/words");
const {
  findOrgByNames,
  findOrgByTags,
  findOrgByUrl,
  findOrgByDomainNames,
  findOrgByDateTime,
  findOrgByOrgType,
} = require("./find-org");
const {
  findTicketBySubject,
  findTicketByDescription,
  findTicketByTags,
} = require("./find-ticket");
const {
  findUserByName,
  findUserByAlias,
  findUserBySignature,
  findUserByRole,
  findUserByTags,
} = require("./find-user");
const {
  loadRelatedEntitiesForOrgs,
  loadRelatedEntitiesForTickets,
  loadRelatedOrgForUsers,
} = require("./utils/load-related-entities");

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
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "what would you like to search today?",
        choices: ["organisations", "tickets", "users"],
        default: "organisations",
      },
    ]);
    if (type === "organisations") {
      const { field, query } = await inquirer.prompt([
        {
          type: "list",
          name: "field",
          message: "select field",
          choices: [
            "all",
            "name",
            "tags",
            "url",
            "domain names",
            "date time",
            "organisation type (MegaCorp/Artisan/Non profit)",
          ],
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
      prettyPrint(results);
    } else if (type === "tickets") {
      const { field, query } = await inquirer.prompt([
        {
          type: "list",
          name: "field",
          message: "select field",
          choices: ["all", "subject", "description", "tags"],
          default: "all",
        },
        {
          type: "string",
          name: "query",
          message:
            "please enter search terms (separate terms by comma, space, camelCase, etc)",
          default: "Delaware",
        },
      ]);
      const results = findTickets(field, query);
      prettyPrint(results);
    } else if (type === "users") {
      const { field, query } = await inquirer.prompt([
        {
          type: "list",
          name: "field",
          message: "select field",
          choices: ["all", "name", "alias", "signature", "role", "tags"],
          default: "all",
        },
        {
          type: "string",
          name: "query",
          message:
            "please enter search terms (separate terms by comma, space, camelCase, etc)",
          default: "Daniel",
        },
      ]);
      const results = findUsers(field, query);
      prettyPrint(results);
    }
  }
})();

function findOrgs(field, query) {
  const queryWords = words(query);
  const orgsByName =
    field === "name" || field === "all" ? findOrgByNames(orgs, queryWords) : [];
  const orgsByTags =
    field === "tags" || field === "all" ? findOrgByTags(orgs, queryWords) : [];
  const orgsByUrl =
    field === "url" || field === "all" ? findOrgByUrl(orgs, queryWords) : [];
  const orgsByDomainNames =
    field === "domain names" || field === "all"
      ? findOrgByDomainNames(orgs, queryWords)
      : [];
  const orgsByDateTime =
    field === "date time" || field === "all"
      ? findOrgByDateTime(orgs, queryWords)
      : [];
  const orgsByOrgType =
    field === "organisation type (MegaCorp/Artisan/Non profit)" ||
    field === "all"
      ? findOrgByOrgType(orgs, queryWords)
      : [];

  const uniqueResults = new Set([
    ...orgsByName,
    ...orgsByTags,
    ...orgsByUrl,
    ...orgsByDomainNames,
    ...orgsByDateTime,
    ...orgsByOrgType,
  ]);
  const resultsWithUsers = loadRelatedEntitiesForOrgs(
    [...uniqueResults],
    "users",
    users
  );
  const resultsWithTickets = loadRelatedEntitiesForOrgs(
    resultsWithUsers,
    "tickets",
    tickets
  );
  return resultsWithTickets;
}

function findTickets(field, query) {
  const queryWords = words(query);
  const ticketsByName =
    field === "subject" || field === "all"
      ? findTicketBySubject(tickets, queryWords)
      : [];
  const ticketsByDescription =
    field === "description" || field === "all"
      ? findTicketByDescription(tickets, queryWords)
      : [];
  const ticketsByTags =
    field === "tags" || field === "all"
      ? findTicketByTags(tickets, queryWords)
      : [];

  const uniqueResults = new Set([
    ...ticketsByName,
    ...ticketsByDescription,
    ...ticketsByTags,
  ]);
  const withSubmitters = loadRelatedEntitiesForTickets(
    [...uniqueResults],
    "submitter_id",
    "submitter",
    users
  );
  const withAssignees = loadRelatedEntitiesForTickets(
    withSubmitters,
    "assignee_id",
    "assignee",
    users
  );
  const withOrgs = loadRelatedEntitiesForTickets(
    withAssignees,
    "organization_id",
    "organization",
    orgs
  );
  return withOrgs;
}

function findUsers(field, query) {
  const queryWords = words(query);
  const usersByName =
    field === "name" || field === "all"
      ? findUserByName(users, queryWords)
      : [];
  const usersByAlias =
    field === "alias" || field === "all"
      ? findUserByAlias(users, queryWords)
      : [];
  const usersBySignature =
    field === "signature" || field === "all"
      ? findUserBySignature(users, queryWords)
      : [];
  const usersByRole =
    field === "role" || field === "all"
      ? findUserByRole(users, queryWords)
      : [];
  const usersByTags =
    field === "tags" || field === "all"
      ? findUserByTags(users, queryWords)
      : [];

  const uniqueResults = new Set([
    ...usersByName,
    ...usersByAlias,
    ...usersBySignature,
    ...usersByRole,
    ...usersByTags,
  ]);
  const withOrgs = loadRelatedOrgForUsers([...uniqueResults], orgs);
  return withOrgs;
}

function prettyPrint(data) {
  console.log(
    inspect(data, {
      colors: true,
      depth: null,
    })
  );
}
