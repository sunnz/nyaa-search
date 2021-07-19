const memoize = require("lodash/memoize");
const hashObject = memoize(require("hash-obj"));

/**
 * create a Map of objects such that you can access any objects via an identifier
 * @param {array<object>} objects array of objects
 * @param {string} identifier the object's identifier to use as a key to the map
 * @returns {Map<object>} Map of objects keyed by the identifier
 */
function makeIdMap(objects, identifier = "_id") {
  return new Map(objects.map((object) => [object[identifier], object]));
}

module.exports = memoize(makeIdMap, (objects, identifier) => {
  return `${hashObject(objects)},${identifier}`;
});
