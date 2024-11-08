const { permissionStore, adminAllPermissionAllow, webAllPermissionAllow } = require('../services/permissionService');
const path = require('path');
const fs = require('fs');
const rolesStore = require('../services/rolesService');
const config = require('../config/config');

async function initSeeder() {
  try {
    if (config.SEED === 'false') {
      return;
    }
    const rolesData = fs.readFileSync(path.join(__dirname, 'roles.json'), 'utf8');
    const roles = JSON.parse(rolesData);

    await permissionStore(apiEndPoint); // permission seeder
    await rolesStore(roles); //roleSeeder
    await adminAllPermissionAllow(); //admin user all permission allow
    await webAllPermissionAllow(); // web user all permission allow
  } catch (error) {
    logger.error('Error initializing seeder:', error);
  }
}

module.exports = initSeeder;
