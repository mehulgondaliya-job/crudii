const asyncHandler = require('../../utility/asyncHandler');
const { handleResponse } = require('../../utility/responseHandler');
const userService = require('../../services/userService');

const userList = asyncHandler(async (req, res) => {
  const result = await userService.userList(req.body);
  handleResponse({ res, result });
});

const userUpdate = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await userService.userUpdate(req.body, id);
  handleResponse({ res, result });
});

const userVerified = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await userService.userVerified(req.body, id);
  handleResponse({ res, result });
});

module.exports = {
  userList,
  userUpdate,
  userVerified,
};
