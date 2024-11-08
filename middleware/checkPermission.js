const asyncHandler = require('../utility/asyncHandler');
const { failureResponse, handleResponse } = require('../utility/responseHandler');
const responseCodes = require('../utility/constant/responseCodes');

const checkPermission = asyncHandler(async (req, res, next) => {
  try {
    // Fetch the user from the request object (assumes user is already authenticated)
    const user = req.user;
    // Check if the user or role is not present
    if (!user || !user.role) {
      return failureResponse({
        res,
        result: { message: 'auth.notFound' },
        responseCodes: responseCodes.NOT_FOUND,
      });
    }

    const { role } = user;

    // Check if the role has the required permissions for the requested route/action
    const requiredPermission = Object.prototype.hasOwnProperty.call(req.route, 'o') && req.route.o;

    const hasPermission = role.permissions.some((permission) => {
      return permission.descriptor === requiredPermission;
    });

    if (!hasPermission) {
      return failureResponse({
        res,
        result: { message: 'auth.noPermission' },
        responseCodes: responseCodes.FORBIDDEN,
      });
    }

    // If permission check passed, proceed to the next middleware
    next();
  } catch (error) {
    logger.error(`Error in checkPermission: ${error.message}`);
    handleResponse({
      res,
      result: { success: false, message: 'failure.serverError' },
    }); // Optionally handle error responses
  }
});

module.exports = checkPermission;
