const makeObjectLookupMap = require("./utils/make-object-lookup-map");
const makeIdMap = require("./utils/make-id-map");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of organisations with all the tags
 */
function findOrgByTags(orgs, tags) {
  // init lookup tables
  const tagToIds = makeObjectLookupMap(orgs, "_id", "tags");
  const idToOrg = makeIdMap(orgs);

  // find all ids of orgs by tags from the tags to id map
  const orgIds = tags.reduce((orgIds, tag) => {
    const key = tag.toLowerCase();
    const ids = tagToIds.get(key) ?? [];
    return new Set([...orgIds, ...ids]);
  }, new Set());

  // return all the org objects from ids
  return [...orgIds].map((id) => idToOrg.get(id));
}

module.exports = findOrgByTags;
