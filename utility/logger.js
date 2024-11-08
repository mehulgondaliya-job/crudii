// logger.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const moment = require('moment-timezone');
const config = require('../config/config');

const timezone = config.TimeZone || 'Asia/Kolkata'; // Set your desired timezone

// Custom timestamp format with timezone
const timestampFormat = () => moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss');

// Define the daily rotate file transport for info logs
const infoTransport = new DailyRotateFile({
  filename: path.join(__dirname, '../logs/info/%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d', // Retain log files for 14 days
  level: 'info',
});

// Define the daily rotate file transport for error logs
const errorTransport = new DailyRotateFile({
  filename: path.join(__dirname, '../logs/error/%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d', // Retain log files for 14 days
  level: 'error',
});

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: timestampFormat }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    infoTransport,
    errorTransport,
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

// Handle exceptions and rejections
logger.exceptions.handle(
  new DailyRotateFile({
    filename: path.join(__dirname, '../logs/error/exceptions-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
  })
);

logger.rejections.handle(
  new DailyRotateFile({
    filename: path.join(__dirname, '../logs/error/rejections-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
  })
);

module.exports = logger;
