const lowercaseAll = require("./lowercase-all");

test("all strings are in lowercase", () => {
  const allUppercase = ["DELAY", "NO", "MORE"];
  const allLowercase = lowercaseAll(allUppercase);
  expect(allLowercase).toContain("delay");
  expect(allLowercase).toContain("no");
  expect(allLowercase).toContain("more");
  expect(allLowercase).not.toContain("DELAY");
  expect(allLowercase).not.toContain("NO");
  expect(allLowercase).not.toContain("MORE");
});
