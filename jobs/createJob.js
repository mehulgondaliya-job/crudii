const { queues } = require('./bullQueue'); // Import the queues

// Function to add a job to a specified queue
const createJob = async (queueName, jobName, jobData) => {
  const queue = queues[queueName];
  if (!queue) {
    logger.error(`Queue ${queueName} does not exist`);
    throw new Error(`Queue ${queueName} does not exist`);
  }

  try {
    await queue.add(jobName, jobData);
    logger.info(`Job ${jobName} added to queue ${queueName}`);
  } catch (error) {
    logger.error(`Error adding job ${jobName} to queue ${queueName}: ${error.message}`);
    throw error; // Re-throw the error after logging it
  }
};

module.exports = {
  createJob,
};
