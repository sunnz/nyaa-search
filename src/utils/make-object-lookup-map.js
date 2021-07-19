const get = require("lodash/get");
const words = require("lodash/words");
const memoize = require("lodash/memoize");

/**
 * @param {array<object>} objects list of objects from an external source (json)
 * @returns {Map<Set>} Map of each value to one or more ids
 */
function makeObjectLookupMap(objects, identifier, path) {
  const map = new Map();
  // add id of the object to each values found in the object's path
  objects.forEach((object) => {
    if (identifier in object) {
      const id = object[identifier];
      const values = words(get(object, path, ""));
      values.forEach((value) => {
        const key = value.toLowerCase();
        // create new set as required
        map.has(key) || map.set(key, new Set());
        // add id to map
        map.get(key).add(id);
      });
    }
  });
  return map;
}

module.exports = memoize(makeObjectLookupMap);
