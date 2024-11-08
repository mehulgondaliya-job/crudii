const asyncHandler = require('../utility/asyncHandler');
const { getId } = require('../utility/helper');
const { failureResponse } = require('../utility/responseHandler');
const responseCodes = require('../utility/constant/responseCodes');
const Redis = require('ioredis');
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { convertTimeToMiliSeconds } = require('../utility/timeFunction');
const { TIME_UNIT } = require('../utility/constant/constantVariable');

// Create Redis connection
const redisConnection = new Redis({
  host: 'localhost', // Replace with your Redis host
  port: 6379, // Replace with your Redis port
});

// Dynamic rate limiting middleware
const checkRateLimit = (max, timeFrame, timeUnit) => {
  const Time = convertTimeToMiliSeconds(timeFrame, timeUnit);

  const limiter = rateLimit({
    store: new RedisStore({
      sendCommand: (...args) => redisConnection.call(...args),
    }),
    windowMs: Time,
    max: max,
    keyGenerator: (req) => {
      const routePermission = Object.prototype.hasOwnProperty.call(req.route, 'o') && req.route.o;

      return `${getId(req.user)}:${routePermission}`;
    }, // Ensure this returns a valid user ID
    handler: (req, res) => {
      return failureResponse({
        res,
        result: { message: 'error.rateLimitExceed', module: `${timeFrame ?? 1} ${timeUnit ?? TIME_UNIT.DAY}` },
        responseCodes: responseCodes.RATE_LIMIT_EXCEED,
      });
    },
  });

  return asyncHandler(async (req, res, next) => {
    try {
      // Call the rate limiter
      limiter(req, res, next);
    } catch (error) {
      logger.error(`Error in checkRateLimit: ${error.message || error}`); // Ensure logger is defined
      return failureResponse({
        res,
        result: { message: 'failure.serverError' },
        responseCodes: responseCodes.INTERNAL_SERVER_ERROR,
      });
    }
  });
};

module.exports = checkRateLimit;
