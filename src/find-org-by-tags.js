const containsAll = require("./contains-all");
const lowercaseAll = require("./lowercase-all");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of organisations with all the tags
 */
function findOrgByTags(orgs, tags) {
  return orgs.filter((org) =>
    containsAll(lowercaseAll(org.tags), lowercaseAll(tags))
  );
}

module.exports = findOrgByTags;
