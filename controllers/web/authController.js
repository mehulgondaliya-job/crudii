const asyncHandler = require('../../utility/asyncHandler');
const { handleResponse } = require('../../utility/responseHandler');
const authService = require('../../services/authService');
const { ROLES } = require('../../utility/constant/constantVariable');

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  handleResponse({ res, result });
});

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body, ROLES.CLIENT);
  handleResponse({ res, result });
});

const userNameVerify = asyncHandler(async (req, res) => {
  const result = await authService.userNameVerify(req.body);
  handleResponse({ res, result });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body);
  handleResponse({ res, result });
});

const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.body);
  handleResponse({ res, result });
});

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  userNameVerify,
};
