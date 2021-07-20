const findEntityByFieldValues = require("./utils/find-entity-by-field-values");

/**
 * @param {array} tickets list of ticket objects from an external source
 * @param {array} subject list of terms to search the ticket subject for
 * @return {array} list of tickets
 */
function findTicketBySubject(tickets, subject) {
  return findEntityByFieldValues(tickets, "subject", subject);
}

/**
 * @param {array} tickets list of ticket objects from an external source
 * @param {array} description list of terms to search the ticket description for
 * @return {array} list of tickets with all the tags
 */
function findTicketByDescription(tickets, description) {
  return findEntityByFieldValues(tickets, "description", description);
}

/**
 * @param {array} tickets list of ticket objects from an external source
 * @param {array} tags list of tags to look for
 * @return {array} list of tickets
 */
function findTicketByTags(tickets, tags) {
  return findEntityByFieldValues(tickets, "tags", tags);
}

module.exports = {
  findTicketBySubject,
  findTicketByDescription,
  findTicketByTags,
};
