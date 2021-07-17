const words = require("lodash/words");
const compose = require("lodash/fp/compose");
const containsAll = require("./contains-all");
const lowercaseAll = require("./lowercase-all");
// combine lowercaseAll(words()) functions
const lowercaseWords = compose([lowercaseAll, words]);

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} names list of words that must appear in org name
 * @return {array} list of organisations
 */
function findOrgByNames(orgs, names) {
  return orgs.filter((org) =>
    containsAll(lowercaseWords(org.name), lowercaseAll(names))
  );
}

module.exports = findOrgByNames;
