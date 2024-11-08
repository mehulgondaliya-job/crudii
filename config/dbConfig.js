// config/db.js
const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    let mongoURL;
    if (config.PRODUCTION) {
      mongoURL = `mongodb+srv://${config.DB.USER}:${config.DB.PASS}@cluster0.ih0dg.mongodb.net/${config.DB.NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    } else {
      mongoURL = `mongodb://${config.DB.HOST}:${config.DB.PORT}/${config.DB.NAME}`;
    }

    const conn = await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
