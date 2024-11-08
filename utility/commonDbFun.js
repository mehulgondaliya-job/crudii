const Role = require('../model/roleModel');

const roleId = async (roleName) => {
  return Role.findOne({ roleName });
};

module.exports = {
  roleId,
};
