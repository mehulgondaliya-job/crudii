const responseCodes = require('../utility/constant/responseCodes');
const { failureResponse } = require('../utility/responseHandler');

const validate = (validator) => (req, res, next) => {
  const result = validator.validate(req.body);

  if (result.error) {
    logger.error('Validation Error:', result.error.details[0].message);

    return failureResponse({
      res,
      result: {
        message: 'failure.serverError',
        data: result.error.details[0].message,
      },
      responseCodes: responseCodes.BAD_REQUEST, // Corrected to responseCodes
    });
  }

  next(); // Called only if no error
};

module.exports = validate;
