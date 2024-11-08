const mongoose = require('mongoose');

// Define the Permission schema
const permissionSchema = new mongoose.Schema(
  {
    permission: {
      type: String,
      required: true, // Add required constraint
    },
    categoryName: {
      type: String,
      required: true, // Add required constraint
    },
    roleName: {
      type: String,
      required: true, // Add required const
    },
    descriptor: {
      type: String,
      required: true, // Add required constraint
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Permission model
const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;
