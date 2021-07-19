const makeObjectLookupMap = require("./make-object-lookup-map");
const orgs = [
  {
    _id: 101,
    name: "Mental Health First Aid",
    tags: ["Fulton", "West", "Rodriguez", "Farley"],
  },
  {
    _id: 102,
    name: "Nutralab",
    tags: ["Cherry", "Collier", "Fuentes", "Farley"],
  },
];

test("given a tag cherry the map returns 102 by direct lookup", () => {
  const map = makeObjectLookupMap(orgs, "_id", "tags");
  expect(map).toBeInstanceOf(Map);

  const ids = map.get("cherry");
  expect(ids).toBeInstanceOf(Set);
  expect(ids).not.toContain(101);
  expect(ids).toContain(102);
});

test("given a tag farley the map returns both 101 and 102 by direct lookup", () => {
  const map = makeObjectLookupMap(orgs, "_id", "tags");
  expect(map).toBeInstanceOf(Map);

  const ids = map.get("farley");
  expect(ids).toBeInstanceOf(Set);
  expect(ids).toContain(101);
  expect(ids).toContain(102);
});
