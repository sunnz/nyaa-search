const makeObjectLookupMap = require("./make-object-lookup-map");
const makeIdMap = require("./make-id-map");

/**
 * @param {array} entities list of entities (orgs/users/tickets) objects from an external source
 * @param {string} fieldName
 * @param {array} values list of values to look for
 * @return {array} list of entities with all values
 */
function findEntityByFieldValues(entities, fieldName, values) {
  // init lookup tables
  const valuesToIds = makeObjectLookupMap(entities, "_id", fieldName);
  const idToEntity = makeIdMap(entities);

  // find all ids of entities by values from the values to id map
  const entityIds = values.reduce((entityIds, value) => {
    const key = value.toLowerCase();
    const ids = valuesToIds.get(key) ?? [];
    return new Set([...entityIds, ...ids]);
  }, new Set());

  // return all the entities
  return [...entityIds].map((id) => idToEntity.get(id));
}

module.exports = findEntityByFieldValues;
