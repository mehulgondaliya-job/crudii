const { failureResponse } = require('../utility/responseHandler'); // Assuming sendResponse is in the same directory
const responseCodes = require('../utility/constant/responseCodes'); // Assuming responseCodes is in the same directory

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logger.error(err.message ?? err ?? 'Internal Server Error');

    // Send failure response with error message
    failureResponse({
      res,
      result: {
        message: 'failure.serverError',
      },
      responseCodes: responseCodes.INTERNAL_SERVER_ERROR, // Corrected to responseCodes
    });

    // No need to call next(err) after sending a response
    return;
  });
};

module.exports = asyncHandler;
