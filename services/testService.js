const { createJob } = require('../jobs/createJob');
const { QUEUE_NAME, JOB_NAME } = require('../utility/constant/constantVariable');

const addQueue = async (data) => {
  try {
    createJob(QUEUE_NAME.EMAIL_QUEUE, JOB_NAME.SEND_EMAIL, data);
    return { success: true, message: 'success' };
  } catch (error) {
    logger.error('Error Check Exist User:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

module.exports = {
  addQueue,
};
