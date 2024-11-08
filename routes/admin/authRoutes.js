const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');
const validate = require('../../middleware/validate');
const { forgotPasswordSchema, resetPasswordSchema, loginSchema, registerSchema, userNameVerifySchema } = require('../../validation/authValidation');

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);
router.post('/username-verify', validate(userNameVerifySchema), authController.userNameVerify);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

module.exports = router;
