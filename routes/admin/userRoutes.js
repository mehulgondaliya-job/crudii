const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');
const protect = require('../../middleware/protect');
const checkPermission = require('../../middleware/checkPermission');
const softDeleted = require('../../middleware/softDelete');
const User = require('../../model/userModel');
const validate = require('../../middleware/validate');
const { isverifiedSchema, updateUserSchema } = require('../../validation/userValidation');
// const checkRateLimit = require('../../middleware/checkRateLimit');

router.post('/list', protect, checkPermission, userController.userList).descriptor('admin.user.list');
router.put('/update/:id', validate(updateUserSchema), protect, checkPermission, userController.userUpdate).descriptor('admin.user.update');
router.put('/isVerified/:id', validate(isverifiedSchema), protect, checkPermission, userController.userVerified).descriptor('admin.user.verified');
router.put('/delete/:id', protect, checkPermission, softDeleted(User)).descriptor('admin.user.softdelete');

module.exports = router;
