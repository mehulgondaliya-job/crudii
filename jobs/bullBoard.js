const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { queues } = require('./bullQueue'); // Import queues from bullQueue.js

// Create the Express adapter for BullBoard
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// Create the Bull Board
const { addQueue } = createBullBoard({
  queues: [], // Initially empty, we will add queues dynamically
  serverAdapter,
});

// Dynamically add the queues to BullBoard
Object.values(queues).forEach((queue) => {
  addQueue(new BullMQAdapter(queue));
});

// Export the router
module.exports = serverAdapter.getRouter();
