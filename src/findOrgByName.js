/**
 * @param {array} orgs list of organisation objects from an external source
 * @param {string} name name of the organisation to look for
 * @return {array} list of organisations with the name
 */
function findOrgByName(orgs, name) {
  return orgs.filter((org) =>
    org.name.toLowerCase().includes(name.toLocaleLowerCase())
  );
}

module.exports = findOrgByName;
