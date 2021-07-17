const findOrgByName = require("./find-org-by-name");
const orgs = require("../data/organizations.json");

test("the id of plasmos org is 103 in our test data", () => {
  const results = findOrgByName(orgs, "plasmos");
  const resultIds = results.reduce((ids, result) => {
    ids.push(result._id);
    return ids;
  }, []);
  expect(results).not.toHaveLength(0);
  expect(resultIds).toContain(103);
});
