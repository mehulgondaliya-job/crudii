const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

exports.getToken = (length = config.TOKEN.LENGTH) => {
  const numericLength = parseInt(length);
  return crypto.randomBytes(numericLength).toString('hex');
};

exports.generateToken = (id) => {
  const privateKeyPath = path.resolve(__dirname, '../key/private.pem');
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  return jwt.sign({ id }, privateKey, {
    algorithm: config.JWT.RSA_ALGO, // Specify RSA algorithm
    expiresIn: config.JWT.EXPIRE, // Token expiration time
  });
};

exports.generatePassword = async (newPassword) => {
  const salt = await bcrypt.genSalt(config.CRYPTO.SLAT);
  return await bcrypt.hash(newPassword, salt);
};

exports.matchPassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

exports.getId = (data) => {
  return data ? data?.id : data?._id;
};

exports.buildSearchQuery = (columns = [], searchText = '') => {
  if (!searchText || !columns.length) {
    return {}; // Return empty query if no searchText or columns
  }

  const query = {
    $or: columns.map((column) => ({
      [column]: { $regex: searchText, $options: 'i' }, // Case-insensitive search
    })),
  };

  return query;
};
