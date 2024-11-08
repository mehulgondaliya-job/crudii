const asyncHandler = require('../../utility/asyncHandler');
const { handleResponse } = require('../../utility/responseHandler');
const testService = require('../../services/testService');

const addQueue = asyncHandler(async (req, res) => {
  const result = await testService.addQueue(req.body);
  handleResponse({ res, result });
});

module.exports = {
  addQueue,
};
