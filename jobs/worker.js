const { Worker } = require('bullmq');
const { queues } = require('./bullQueue'); // Import the queues
const processJob = require('./processJob');
const { JOB_NAME } = require('../utility/constant/constantVariable');

// Function to set up workers for each queue
const setupWorkers = () => {
  Object.keys(queues).forEach((queueName) => {
    const queue = queues[queueName];

    // Create a worker for each queue
    const worker = new Worker(
      queueName,
      async (job) => {
        // This function will process each job
        logger.info(`Processing job ${job.id} from queue ${queueName}`);

        // Example job processing logic:
        try {
          // Simulate some work (like downloading, processing files, etc.)
          if (job.name === JOB_NAME.SEND_EMAIL) {
            await processJob.processEmailJob(job);
          } else if (job.name === JOB_NAME.MY_JOB2) {
            await processJob.processNotificationJob(job);
          } else {
            logger.warn(`Unknown job type ${job.name} for job ${job.id}`);
          }
        } catch (error) {
          logger.error(`Error processing job ${job.id} from queue ${queueName}: ${error.message}`);
        }
      },
      { connection: queue.connection }
    );

    // Optional: Handle worker events like completion, failure
    worker.on('completed', (job) => {
      logger.info(`Job ${job.id} completed successfully!`);
    });

    worker.on('failed', (job, err) => {
      logger.error(`Job ${job.id} failed: ${err.message}`);
    });
  });
};

// Start workers when the file is required
setupWorkers();
