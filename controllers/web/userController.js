const asyncHandler = require('../../utility/asyncHandler');
const { handleResponse } = require('../../utility/responseHandler');
const userService = require('../../services/userService');
const { getId } = require('../../utility/helper');

const userUpdate = asyncHandler(async (req, res) => {
  const id = getId(req.user);
  const result = await userService.userUpdate(req.body, id);
  handleResponse({ res, result });
});

const userUpdatePassword = asyncHandler(async (req, res) => {
  const id = getId(req.user);
  const result = await userService.userUpdatePassword(req.body, req.user, id);
  handleResponse({ res, result });
});

const user = asyncHandler(async (req, res) => {
  const id = getId(req.user);
  const result = await userService.user(id);
  handleResponse({ res, result });
});

module.exports = {
  userUpdatePassword,
  userUpdate,
  user,
};
