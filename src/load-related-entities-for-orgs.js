const makeObjectLookupMap = require("./utils/make-object-lookup-map");
const makeIdMap = require("./utils/make-id-map");

/**
 * @param {array<object>} orgs
 * @param {string} type name of the property to be added to each org
 * to contain all the related entities, for example, "users"
 * @param {array<object>} entities
 * @return {array<object>}
 */
function loadRelatedEntitiesForOrgs(orgs, type, entities) {
  // map to find one or more entity ids for each org id
  const orgIdToEntitiesIds = makeObjectLookupMap(
    entities,
    "_id",
    "organization_id"
  );
  // map to get the actual entity object from its own id
  const idToEntity = makeIdMap(entities);
  return orgs.map((org) => {
    const entityIds = orgIdToEntitiesIds.get(`${org._id}`);
    const relatedEntities = entityIds
      ? [...entityIds].map((id) => idToEntity.get(id))
      : [];
    return { ...org, [type]: relatedEntities };
  });
}

module.exports = loadRelatedEntitiesForOrgs;
