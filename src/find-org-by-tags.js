const makeTagsOrgMap = require("./make-tags-org-map");
// internal lookup tables
let map = null;
let orgsMap = null;

/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of organisations with all the tags
 */
function findOrgByTags(orgs, tags) {
  // init lookup tables
  map = map ?? makeTagsOrgMap(orgs);
  orgsMap = orgsMap ?? makeOrgsMap(orgs);

  // find all ids of orgs by tags from the tags to org map
  const orgIds = tags.reduce((orgIds, tag) => {
    const key = tag.toLowerCase();
    const ids = map.get(key) ?? [];
    return new Set([...orgIds, ...ids]);
  }, new Set());

  // return all the org collection from ids
  return [...orgIds].map((id) => orgsMap.get(id));
}

function makeOrgsMap(orgs) {
  const map = new Map();
  orgs.forEach((org) => map.set(org._id, org));
  return map;
}

module.exports = findOrgByTags;
