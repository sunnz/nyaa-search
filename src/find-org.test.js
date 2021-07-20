const { findOrgByNames, findOrgByTags } = require("./find-org");
const orgs = require("../test-data/organizations.json");

test("search by multiple names", () => {
  const existent = findOrgByNames(orgs, ["mental", "Health"]);
  expect(existent).not.toHaveLength(0);
  const inexistent = findOrgByNames(orgs, ["Zen", "Desk"]);
  expect(inexistent).toHaveLength(0);
});

test("searching for non-existent name should return empty result", () => {
  const results = findOrgByNames(orgs, ["__definitelydoesnotexist__"]);
  expect(results).toHaveLength(0);
});

test("plasmos has both Lindsay and Armstrong in its tags in our test data", () => {
  const results = findOrgByTags(orgs, ["lindsay", "armstrong"]);
  const resultNames = results.reduce((names, result) => {
    names.push(result.name.toLowerCase());
    return names;
  }, []);
  expect(results).not.toHaveLength(0);
  expect(resultNames).toContain("plasmos");
});

test("searching for non-existent tag should return empty result", () => {
  const results = findOrgByTags(orgs, ["__definitelydoesnotexist__"]);
  expect(results).toHaveLength(0);
});
