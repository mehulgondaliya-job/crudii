const responseCodes = require('./constant/responseCodes');

const translateAndReplace = ({ res, key, module }) => {
  let message = res.__(key); // Translate the key
  if (module) {
    message = message.replace(/{module}/g, module); // Replace placeholder if module is provided
  }
  return message;
};

const handleResponse = ({ res, result }) => {
  if (result?.success) {
    successfulResponse({ res, result, responseCodes: responseCodes.OK });
  } else {
    failureResponse({ res, result, responseCodes: responseCodes.BAD_REQUEST });
  }
};

const successfulResponse = ({ res, result, responseCodes }) => {
  return sendResponse({ res, responseCodes, result });
};

const failureResponse = ({ res, result, responseCodes }) => {
  return sendResponse({ res, responseCodes, result });
};

const sendResponse = ({ res, responseCodes, result }) => {
  const message = result?.message ? translateAndReplace({ res, key: result.message, module: result?.module }) : '';
  const response = {
    status: responseCodes,
    message: message,
  };

  if (result?.data) {
    response.data = result?.data;
  }

  return res.status(responseCodes).json(response); // Use responseCodes instead of statusCode
};

module.exports = {
  successfulResponse,
  failureResponse,
  handleResponse,
};
