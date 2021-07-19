const makeTagsOrgMap = require("./make-tags-org-map");
const makeIdMap = require("./utils/make-id-map");

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of organisations with all the tags
 */
function findOrgByTags(orgs, tags) {
  // init lookup tables
  const map = makeTagsOrgMap(orgs);
  const orgsMap = makeIdMap(orgs);

  // find all ids of orgs by tags from the tags to org map
  const orgIds = tags.reduce((orgIds, tag) => {
    const key = tag.toLowerCase();
    const ids = map.get(key) ?? [];
    return new Set([...orgIds, ...ids]);
  }, new Set());

  // return all the org collection from ids
  return [...orgIds].map((id) => orgsMap.get(id));
}

module.exports = findOrgByTags;
