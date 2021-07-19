const difference = require("lodash/difference");

/**
 * @param {array} list
 * @param {array} values
 * @return {boolean} true if all values are found in list, false otherwise
 */
function containsAll(list, values) {
  // difference() returns an array of all values that are not in list,
  // so, if it returns an empty array, then all values are in the list.
  return difference(values, list).length === 0;
}

module.exports = containsAll;
