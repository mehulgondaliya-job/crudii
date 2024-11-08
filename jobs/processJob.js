const { sendEmail } = require('../services/common/emailService');

// Function to handle email jobs
const processEmailJob = async (job) => {
  logger.info('Processing email job:');
  const { to, subject, text, html } = job.data;
  await sendEmail(to, subject, text, html); // to, subject, text, html
};

// Function to handle notification jobs
const processNotificationJob = async (job) => {
  logger.info(`Processing notification job: jobData ${job.data}`);
  // Add your custom logic for sending notifications
  // e.g., using a notification service or API
};

module.exports = {
  processEmailJob,
  processNotificationJob,
};
