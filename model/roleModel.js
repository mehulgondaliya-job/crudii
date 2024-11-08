const mongoose = require('mongoose');

// Define the Role schema
const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      unique: true, // Ensure the roleName is unique
    },
    weight: {
      type: Number,
      unique: true,
    },
    permissions: [
      {
        // Change 'permission' to 'permissions' to indicate an array
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission', // Reference to the 'Permission' model (case-sensitive)
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Role model
const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
