const mongoose = require('mongoose');

// Define the Permission schema
const crudSchema = new mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Permission model
const Crud = mongoose.model('Crud', crudSchema);
module.exports = Crud;
