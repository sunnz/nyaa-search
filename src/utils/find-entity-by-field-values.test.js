const findEntityByFieldValues = require("./find-entity-by-field-values");
const orgs = require("../../test-data/organizations.json");

test("plasmos has both Lindsay and Armstrong in its tags in our test data", () => {
  const results = findEntityByFieldValues(orgs, "tags", [
    "lindsay",
    "armstrong",
  ]);
  const resultNames = results.reduce((names, result) => {
    names.push(result.name.toLowerCase());
    return names;
  }, []);
  expect(results).not.toHaveLength(0);
  expect(resultNames).toContain("plasmos");
});

test("searching for non-existent tag should return empty result", () => {
  const results = findEntityByFieldValues(orgs, "tags", [
    "definitelydoesnotexist",
  ]);
  expect(results).toHaveLength(0);
});
