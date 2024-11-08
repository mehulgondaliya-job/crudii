const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, // Ensure the email is unique
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpire: {
      type: Date,
      default: undefined,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
    },
    isVerified: {
      type: Boolean,
      default: false, // Optionally, set a default value for isVerified
    },
    softDeletedAt: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

userSchema.pre(['find', 'findOne'], function () {
  this.where({ softDeletedAt: { $exists: false } });
});

// Export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
