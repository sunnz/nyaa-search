const { loadRelatedEntitiesForOrgs } = require("./load-related-entities");
const users = require("../../test-data/users.json");
const tickets = require("../../test-data/tickets.json");
const orgs = [
  {
    _id: 119,
    url: "http://nyaa.test/api/v2/organizations/119.json",
    external_id: "2386db7c-5056-49c9-8dc4-46775e464cb7",
    name: "Multron",
    domain_names: ["bleeko.com", "pulze.com", "xoggle.com", "sultraxin.com"],
    created_at: "2016-02-29T03:45:12 -11:00",
    details: "Non profit",
    shared_tickets: false,
    tags: ["Erickson", "Mccoy", "Wiggins", "Brooks"],
  },
];

test("at least one user related to our organisation is loaded under users property", () => {
  const results = loadRelatedEntitiesForOrgs(orgs, "users", users);
  expect(results).not.toHaveLength(0);
  expect(results[0]).toHaveProperty("users");
  expect(results[0].users).not.toHaveLength(0);
  expect(results[0].users[0]).toHaveProperty("organization_id");
  expect(results[0].users[0].organization_id).toBe(119);
});

test("at least one ticket related to our organisation is loaded under tickets property", () => {
  const results = loadRelatedEntitiesForOrgs(orgs, "tickets", tickets);
  expect(results).not.toHaveLength(0);
  expect(results[0]).toHaveProperty("tickets");
  expect(results[0].tickets).not.toHaveLength(0);
  expect(results[0].tickets[0]).toHaveProperty("organization_id");
  expect(results[0].tickets[0].organization_id).toBe(119);
});

test("empty input should return an empty result", () => {
  const results = loadRelatedEntitiesForOrgs([], "users", users);
  expect(results).toHaveLength(0);
});

test("organisations without tickets should still have tickets property of an empty array", () => {
  const results = loadRelatedEntitiesForOrgs(
    [{ _id: "__noSuchId__" }],
    "tickets",
    tickets
  );
  expect(results).not.toHaveLength(0);
  expect(results[0]).toHaveProperty("tickets");
  expect(results[0].tickets).toHaveLength(0);
});
