const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/admin/permissionController');
const protect = require('../../middleware/protect');
const checkPermission = require('../../middleware/checkPermission');
const validate = require('../../middleware/validate');
const { permissionListSchema, permissionUpdateSchema } = require('../../validation/permissionValidation');
const checkRateLimit = require('../../middleware/checkRateLimit');

router.post('/list', validate(permissionListSchema), protect, checkRateLimit(5), checkPermission, permissionController.permissionList).descriptor('admin.permission.list');
router.put('/update/:id', validate(permissionUpdateSchema), protect, checkPermission, permissionController.permissionUpdate).descriptor('admin.permission.update');

module.exports = router;
