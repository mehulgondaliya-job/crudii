const asyncHandler = require('../../utility/asyncHandler');
const { handleResponse } = require('../../utility/responseHandler');
const permissionService = require('../../services/permissionService');

const permissionList = asyncHandler(async (req, res) => {
  const result = await permissionService.permissionList(req.body);
  handleResponse({ res, result });
});

const permissionUpdate = asyncHandler(async (req, res) => {
  const result = await permissionService.permissionUpdate(req.body, req.params.id);
  handleResponse({ res, result });
});

module.exports = {
  permissionList,
  permissionUpdate,
};
