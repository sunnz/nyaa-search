const findOrgByTags = require("./find-org-by-tags");
const orgs = require("../test-data/organizations.json");

test("plasmos has both Lindsay and Armstrong in its tags in our test data", () => {
  const results = findOrgByTags(orgs, ["lindsay", "armstrong"]);
  const resultNames = results.reduce((names, result) => {
    names.push(result.name.toLowerCase());
    return names;
  }, []);
  expect(results).not.toHaveLength(0);
  expect(resultNames).toContain("plasmos");
});
