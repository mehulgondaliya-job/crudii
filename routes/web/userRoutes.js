const express = require('express');
const router = express.Router();
const userController = require('../../controllers/web/userController');
const protect = require('../../middleware/protect');
const checkPermission = require('../../middleware/checkPermission');
const validate = require('../../middleware/validate');
const { updateUserSchema, updatePasswordSchema } = require('../../validation/userValidation');

router.put('/update', validate(updateUserSchema), protect, checkPermission, userController.userUpdate).descriptor('client.user.update');
router.put('/update-password', validate(updatePasswordSchema), protect, checkPermission, userController.userUpdatePassword).descriptor('client.user.updatePassword');
router.get('/', protect, checkPermission, userController.user).descriptor('client.user.get');

module.exports = router;
