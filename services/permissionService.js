const Permission = require('../model/permissionModel');
const Role = require('../model/roleModel');
const { ROLES } = require('../utility/constant/constantVariable');

const permissionStore = async (endpoints) => {
  try {
    // Filter out endpoints with defined descriptors
    const validEndpoints = endpoints
      .flatMap((endpoint) => endpoint?.descriptor || [])
      .filter(Boolean)
      .flat();

    // Use Promise.all to handle asynchronous operations
    await Promise.all(
      validEndpoints.map(async (descriptor) => {
        const [roleName, permissionCategory, permission] = descriptor.split('.');

        const query = { descriptor: descriptor };

        // Use upsert to either update or create the permission in a single operation
        await Permission.updateOne(
          query,
          {
            permission: permission,
            categoryName: permissionCategory,
            roleName: roleName,
            descriptor: descriptor,
          },
          { upsert: true } // This will insert a new document if no match is found
        );
      })
    );
    logger.info('Permissions have been seeded successfully');
  } catch (error) {
    logger.error('Error in seeding to store permission:', error);
  }
};

const adminAllPermissionAllow = async () => {
  try {
    const query = {
      roleName: { $eq: ROLES.ADMIN },
    };
    const adminAllPermission = await Permission.find(query).select('-descriptor');
    const permissionIds = adminAllPermission.map((permission) => permission?._id);
    await Role.findOneAndUpdate(query, {
      $set: { permissions: permissionIds },
    });
    logger.info('Admin all permissions added successfully');
  } catch (error) {
    logger.error(`Error in admin all permission allow ${error}`);
  }
};

const webAllPermissionAllow = async () => {
  try {
    const query = {
      roleName: { $eq: ROLES.CLIENT },
    };
    const webAllPermission = await Permission.find(query).select('-descriptor');
    const permissionIds = webAllPermission.map((permission) => permission?._id);
    await Role.findOneAndUpdate(query, {
      $set: { permissions: permissionIds },
    });
    logger.info('Web all permissions added successfully');
  } catch (error) {
    logger.error(`Error in web all permission allow ${error}`);
  }
};

// role wise permission
const permissionList = async (data) => {
  try {
    const query = { ...data };
    const result = await Role.find(query).populate([{ path: 'permissions', model: Permission, select: '-descriptor' }]);
    return { success: true, message: 'success.default', data: result };
  } catch (error) {
    logger.error(`Error in get userlist ${error}`);
  }
};

const permissionUpdate = async (data, id) => {
  try {
    const query = { $set: { permissions: data?.permissions } };
    const user = await Role.findByIdAndUpdate(id, query, {
      new: true,
      upsert: true,
    });
    return {
      success: true,
      message: 'update.success',
      data: user,
      module: 'user',
    };
  } catch (error) {
    logger.error(`Error in updating user: ${error}`);
    return {
      success: false,
      message: 'error.updateUser',
      error: error.message,
    };
  }
};

module.exports = {
  permissionStore,
  permissionList,
  permissionUpdate,
  adminAllPermissionAllow,
  webAllPermissionAllow,
};
