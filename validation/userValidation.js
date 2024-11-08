const Joi = require('joi');

// Define the Joi schema for user validation
const updateUserSchema = Joi.object({
  fullName: Joi.string().optional().allow(null, ''), // Optional, must be a valid URL
}).unknown(false); // Disallow unknown fields

const isActiveSchema = Joi.object({
  isActive: Joi.boolean().required(),
});

const isverifiedSchema = Joi.object({
  isVerified: Joi.boolean().required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

module.exports = {
  updateUserSchema,
  isActiveSchema,
  isverifiedSchema,
  updatePasswordSchema,
};
