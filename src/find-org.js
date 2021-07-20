const findEntityByFieldValues = require("./utils/find-entity-by-field-values");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} names list of words that must appear in org name
 * @return {array} list of organisations
 */
function findOrgByNames(orgs, names) {
  return findEntityByFieldValues(orgs, "name", names);
}

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of organisations with all the tags
 */
function findOrgByTags(orgs, tags) {
  return findEntityByFieldValues(orgs, "tags", tags);
}

module.exports = { findOrgByNames, findOrgByTags };
