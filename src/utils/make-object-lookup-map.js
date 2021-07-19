const get = require("lodash/get");
const words = require("lodash/words");
const memoize = require("lodash/memoize");
const hashObject = memoize(require("hash-obj"));

/**
 * create a Map of objects such that you can access any objects via a values scrapped from given path
 * @param {array<object>} objects list of objects from an external source (json)
 * @param {string} identifier property name of the object that contains the identifier eg "_id"
 * @param {string} path the path of the property to use as the map key
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

module.exports = memoize(makeObjectLookupMap, (objects, identifier, path) => {
  return `${hashObject(objects)},${identifier},${path}`;
});
