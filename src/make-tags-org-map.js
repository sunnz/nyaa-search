const memoize = require("lodash/memoize");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @returns {Map<Set>} Map of tags to one or more organisation ids in a Set
 */
function makeTagsOrgMap(orgs) {
  const tagsOrgMap = new Map();
  // add the org to each tag found in the orgs array
  orgs.forEach((org) => {
    org.tags.forEach((tag) => {
      const key = tag.toLowerCase();
      // create new set as required
      tagsOrgMap.has(key) || tagsOrgMap.set(key, new Set());
      // add org id to map
      org._id && tagsOrgMap.get(key).add(org._id);
    });
  });
  return tagsOrgMap;
}

module.exports = memoize(makeTagsOrgMap);
