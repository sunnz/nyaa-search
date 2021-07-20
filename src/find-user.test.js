const {
  findUserByName,
  findUserByAlias,
  findUserBySignature,
  findUserByRole,
  findUserByTags,
} = require("./find-user");
const users = require("../test-data/users.json");

test("search by name", () => {
  const results = findUserByName(users, ["Denise", "Finch"]);
  expect(results).not.toHaveLength(0);
});

test("search by alias", () => {
  const results = findUserByAlias(users, ["Betsy"]);
  expect(results).not.toHaveLength(0);
});

test("search by tags", () => {
  const results = findUserByTags(users, ["Smock", "Finzel"]);
  expect(results).not.toHaveLength(0);
});

test("search by non-existent tags", () => {
  const emptyResult = findUserByTags(users, ["__doesnotexist__"]);
  expect(emptyResult).toHaveLength(0);
});
