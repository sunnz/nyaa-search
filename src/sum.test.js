const sum = require("./sum");

test("sum of 1 and 2 is 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// // uncomment this block to ensure jest can indeed fail
// test('something that always fails', () => {
//     expect(sum('hello', 2)).toBe(3);
// });
