const {
  findTicketBySubject,
  findTicketByDescription,
  findTicketByTags,
} = require("./find-ticket");
const tickets = require("../test-data/tickets.json");

test("search by subject", () => {
  const results = findTicketBySubject(tickets, ["Nuisance"]);
  expect(results).not.toHaveLength(0);
});

test("search by description", () => {
  const results = findTicketByDescription(tickets, [
    "amet",
    "nisi",
    "dolor",
    "reprehenderit",
  ]);
  expect(results).not.toHaveLength(0);
});

test("search by tags", () => {
  const results = findTicketByTags(tickets, ["Arizona", "Delaware"]);
  expect(results).not.toHaveLength(0);
});

test("search by non-existent tags", () => {
  const emptyResult = findTicketByTags(tickets, ["__doesnotexist__"]);
  expect(emptyResult).toHaveLength(0);
});
