const findEntityByFieldValues = require("./utils/find-entity-by-field-values");

/**
 * @param {array} users list of user objects from an external source
 * @param {array} name list of terms to search the user name for
 * @return {array} list of matching users
 */
function findUserByName(users, name) {
  return findEntityByFieldValues(users, "name", name);
}

/**
 * @param {array} users list of user objects from an external source
 * @param {array} alias list of terms to search the user alias for
 * @return {array} list of matching users
 */
function findUserByAlias(users, alias) {
  return findEntityByFieldValues(users, "alias", alias);
}

/**
 * @param {array} users list of user objects from an external source
 * @param {array} signature list of signature to look for
 * @return {array} list of matching users
 */
function findUserBySignature(users, signature) {
  return findEntityByFieldValues(users, "signature", signature);
}

/**
 * @param {array} users list of user objects from an external source
 * @param {array} role list of role to look for
 * @return {array} list of matching users
 */
function findUserByRole(users, role) {
  return findEntityByFieldValues(users, "role", role);
}

/**
 * @param {array} users list of user objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of matching users
 */
function findUserByTags(users, tags) {
  return findEntityByFieldValues(users, "tags", tags);
}

module.exports = {
  findUserByName,
  findUserByAlias,
  findUserBySignature,
  findUserByRole,
  findUserByTags,
};
