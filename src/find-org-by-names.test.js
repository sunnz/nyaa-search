const findOrgByNames = require("./find-org-by-names");
const orgs = require("../test-data/organizations.json");

test("search by multiple words", () => {
  const existent = findOrgByNames(orgs, ["mental", "Health"]);
  expect(existent).not.toHaveLength(0);
  const inexistent = findOrgByNames(orgs, ["Zen", "Desk"]);
  expect(inexistent).toHaveLength(0);
});
