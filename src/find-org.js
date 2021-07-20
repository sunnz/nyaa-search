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

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} urlTerms list of terms to look for in url field
 * @return {array} list of organisations with words present in the url field
 */
 function findOrgByUrl(orgs, urlTerms) {
  return findEntityByFieldValues(orgs, "url", urlTerms);
}

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} domainNames domains to search
 * @return {array} list of organisations with domain names
 */
 function findOrgByDomainNames(orgs, domainNames) {
  return findEntityByFieldValues(orgs, "domain_names", domainNames);
}

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} dateTime date time to search
 * @return {array} list of organisations with date and time
 */
 function findOrgByDateTime(orgs, dateTime) {
  return findEntityByFieldValues(orgs, "created_at", dateTime);
}

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} orgType organisation type to search for eg "MegaCorp"
 * @return {array} list of organisations with organisation type
 */
 function findOrgByOrgType(orgs, orgType) {
  return findEntityByFieldValues(orgs, "details", orgType);
}

module.exports = {
  findOrgByNames,
  findOrgByTags,
  findOrgByUrl,
  findOrgByDomainNames,
  findOrgByDateTime,
  findOrgByOrgType,
 };
