/**
 * @param {string[]} strings an array of strings
 * @returns {string[]} an array of strings in lowercase
 */
function lowercaseAll(strings) {
  return strings.map((str) => str.toLowerCase());
}

module.exports = lowercaseAll;
