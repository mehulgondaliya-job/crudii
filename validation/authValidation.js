const Joi = require('joi');

const registerSchema = Joi.object({
  fullName: Joi.string(),
  userName: Joi.string()
    .min(8)
    .pattern(/^[a-zA-Z0-9_]+$/) // Allows letters, numbers, and underscores
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.pattern.base': 'Username must only contain letters, numbers, and underscores',
    }),
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false);

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false);

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
  }),
});

const resetPasswordSchema = Joi.object({
  resetToken: Joi.string().required().messages({
    'string.empty': 'Reset token is required',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'New password is required',
  }),
});

const userNameVerifySchema = Joi.object({
  userName: Joi.string().required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userNameVerifySchema,
};
