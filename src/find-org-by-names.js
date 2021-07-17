const words = require("lodash/words");
const containsAll = require("./contains-all");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} names list of words that must appear in org name
 * @return {array} list of organisations
 */
function findOrgByNames(orgs, names) {
  return orgs.filter((org) => containsAll(words(org.name), names));
}

module.exports = findOrgByNames;
