const Joi = require('joi');

// Define the Joi schema for user validation
const permissionListSchema = Joi.object({
  roleName: Joi.string().required(),
}).unknown(false); // Disallow unknown fields

const permissionUpdateSchema = Joi.object({
  permissions: Joi.array()
    .items(
      Joi.string().optional() // Validates each item in the array as a required string
    )
    .required(),
}).unknown(false); // Disallow unknown fields

module.exports = {
  permissionListSchema,
  permissionUpdateSchema,
};
