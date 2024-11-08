const Role = require('../model/roleModel'); // Update the path to your role model

const rolesStore = async (roles) => {
  try {
    // Use Promise.all to handle multiple async operations
    await Promise.all(
      roles.map(async (role) => {
        // Use upsert to create a new role or update if it already exists
        await Role.updateOne(
          { roleName: role.name }, // Find by roleName
          {
            $set: {
              roleName: role.name,
              weight: role.weight,
            },
          },
          { upsert: true } // Create if not exists
        );
      })
    );
    logger.info('Roles have been seeded successfully');
  } catch (error) {
    logger.error('Error seeding roles:', error);
  }
};

module.exports = rolesStore;
