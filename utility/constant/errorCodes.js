// mongoErrorCodes.js

const MONGO_ERROR_CODES = {
  DUPLICATE_KEY: 11000,
  AUTHENTICATION_FAILED: 12000,
  AUTHENTICATION_ERROR: 12001,
  DOCUMENT_VALIDATION_FAILURE: 121,
  DOCUMENT_VALIDATION_ERROR: 122,
  OPERATION_FAILED: 13000,
  COMMAND_NOT_FOUND: 134,
  SHARD_KEY_NOT_FOUND: 136,
  WRITE_CONFLICT: 137,
  WRITE_CONCERN_ERROR: 14000,
  LOCK_TIMEOUT: 16000,
  NO_SUCH_TRANSACTION: 17000,
  TRANSACTION_ERROR: 18000,
  ATLAS_ERROR: 20000,
};

module.exports = {
  MONGO_ERROR_CODES,
};
