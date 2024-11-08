const asyncHandler = require('../../utility/asyncHandler');
const { handleResponse } = require('../../utility/responseHandler');
const crudService = require('../../services/crudService');

const createUser = asyncHandler(async (req, res) => {
  const result = await crudService.createUser(req.body);
  handleResponse({ res, result });
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await crudService.updateUser(req.body, id);
  handleResponse({ res, result });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await crudService.deleteUser(id);
  handleResponse({ res, result });
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await crudService.getUser(id);
  handleResponse({ res, result });
});

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
