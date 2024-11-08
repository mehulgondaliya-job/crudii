const express = require('express');
// const api = require('express-list-endpoints-descriptor')(express);
const app = express();

const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const cluster = require('cluster');
const os = require('os');
const i18n = require('./config/i18nConfig');
const config = require('./config/config');
const allRouter = require('./routes/index');
// const initSeeder = require('./seeds/seeder');
// require('./jobs/worker');

global.logger = require('./utility/logger');


if (cluster.isMaster && config.PRODUCTION === 'true') {
  const numCPUs = os.cpus().length;
  logger.info(`Master process is running. Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.error(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Establish database connection
  connectDB();
  // Middleware setup
  app.use(express.json());
  app.use(i18n.init);

  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use('/', allRouter);
  // app.use('/admin/queues', require('./jobs/bullBoard'));
  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  // Error handling
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception: ' + err.message, { stack: err.stack });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection at: reason:' + reason);
    process.exit(1);
  });

  const port = config.PORT || 4747;
  app.listen(port, async () => {
    logger.info(`Worker ${process.pid} started and server is running on port: ${port}`);

    // global.apiEndPoint = api.listAllEndpoints(app);
    // await initSeeder();
  });
}
