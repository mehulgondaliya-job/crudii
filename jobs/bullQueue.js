const { Queue } = require('bullmq');
const Redis = require('ioredis');
const { QUEUE_NAME } = require('../utility/constant/constantVariable');

// Create a Redis connection using ioredis
const redisConnection = new Redis({
  host: 'localhost', // Replace with your Redis host
  port: 6379, // Replace with your Redis port
});

// Define your queues with the ioredis connection
const queues = {
  [QUEUE_NAME.EMAIL_QUEUE]: new Queue(QUEUE_NAME.EMAIL_QUEUE, {
    connection: redisConnection,
  }),
};

module.exports = {
  queues,
};
