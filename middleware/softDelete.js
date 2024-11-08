const { handleResponse } = require('../utility/responseHandler');
const { getCurrentDate } = require('../utility/timeFunction');
const asyncHandler = require('../utility/asyncHandler');

const softDeleted = (model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id; // Assuming req.user contains the authenticated user

    try {
      const query = {
        $set: { softDeletedAt: getCurrentDate() },
      };

      const softDeletedUser = await model.findByIdAndUpdate(id, query, {
        new: true,
      });

      let result;
      if (softDeletedUser) {
        result = {
          success: true,
          message: 'softdelete.deleted',
          module: model.modelName,
        }; // Use model.modelName instead of model.name
      } else {
        result = {
          success: false,
          message: 'softdelete.notFound',
          module: model.modelName,
        }; // Use model.modelName instead of model.name
      }

      handleResponse({ res, result });
    } catch (error) {
      logger.error(`Error in soft delete: ${error.message}`);
      handleResponse({
        res,
        result: { success: false, message: 'failure.serverError' },
      }); // Optionally handle error responses
    }
  });

module.exports = softDeleted;
