const containsAll = require("./contains-all");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of organisations with all the tags
 */
function findOrgByTags(orgs, tags) {
  return orgs.filter((org) => containsAll(org.tags, tags));
}

module.exports = findOrgByTags;
