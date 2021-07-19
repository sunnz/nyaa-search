const makeObjectLookupMap = require("./utils/make-object-lookup-map");
const makeIdMap = require("./utils/make-id-map");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} names list of words that must appear in org name
 * @return {array} list of organisations
 */
function findOrgByNames(orgs, names) {
  // init lookup tables
  const nameToIds = makeObjectLookupMap(orgs, "_id", "name");
  const idToOrg = makeIdMap(orgs);

  // find all ids of org by name from the name-to-id map
  const orgIds = names.reduce((orgIds, name) => {
    const key = name.toLowerCase();
    const ids = nameToIds.get(key) ?? [];
    return new Set([...orgIds, ...ids]);
  }, new Set());

  // return all the org objects from ids
  return [...orgIds].map((id) => idToOrg.get(id));
}

module.exports = findOrgByNames;
