const makeObjectLookupMap = require("./make-object-lookup-map");
const makeIdMap = require("./make-id-map");

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

/**
 * @param {array<object>} tickets
 * @param {string} fieldName field name of the ticket to load entity id
 * @param {string} type name of the property to be added to each ticket
 * to contain all the related entities, for example, "submitters"
 * @param {array<object>} entities
 * @return {array<object>}
 */
function loadRelatedEntitiesForTickets(tickets, fieldName, type, entities) {
  // map to get the actual entity object from its own id
  const idToEntity = makeIdMap(entities);
  // add them into each object
  return tickets.map((ticket) => {
    const entityId = ticket[fieldName];
    const entity = idToEntity.get(entityId);
    return { ...ticket, [type]: entity };
  });
}

/**
 * @param {array<object>} users
 * @param {string} fieldName field name of the ticket to load entity id
 * @param {string} type name of the property to be added to each ticket
 * to contain all the related entities, for example, "submitters"
 * @param {array<object>} orgs
 * @return {array<object>}
 */
function loadRelatedOrgForUsers(users, orgs) {
  // map to get the actual entity object from its own id
  const idToOrg = makeIdMap(orgs);
  // add them into each object
  return users.map((user) => {
    const orgId = user.organization_id;
    const org = idToOrg.get(orgId);
    return { ...user, org };
  });
}

module.exports = {
  loadRelatedEntitiesForOrgs,
  loadRelatedEntitiesForTickets,
  loadRelatedOrgForUsers,
};
