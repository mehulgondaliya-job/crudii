// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const config = require('../config/config');
const { failureResponse } = require('../utility/responseHandler');
const responseCodes = require('../utility/constant/responseCodes');
const fs = require('fs');
const path = require('path');
const asyncHandler = require('../utility/asyncHandler');
const Role = require('../model/roleModel');
const Permission = require('../model/permissionModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if there's an authorization header with the JWT token
  if (req.headers.authorization && req.headers.authorization.startsWith('JWT')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token and decode payload
      const publicKeyPath = path.resolve(__dirname, '../key/public.pem');
      const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
      const decoded = jwt.verify(token, publicKey, {
        algorithms: [config.JWT.RSA_ALGO],
      });

      // Attach user to request object
      const user = await User.findOne({ _id: decoded.id })
        .select('-password')
        .populate([
          {
            path: 'role',
            model: Role,
            populate: [{ path: 'permissions', model: Permission }],
          },
        ]);

      if (!user) {
        return failureResponse({
          res,
          result: { message: 'auth.notFound' },
          responseCodes: responseCodes.NOT_FOUND,
        });
      }

      if (!user.isVerified) {
        return failureResponse({
          res,
          result: { message: 'auth.notVerified' },
          responseCodes: responseCodes.UNAUTHORIZED,
        });
      }

      req.user = user; // Corrected assignment

      next();
    } catch (error) {
      logger.error('Auth Error:' + error.message || error);
      return failureResponse({
        res,
        result: { message: 'auth.notAuthorized' },
        responseCodes: responseCodes.UNAUTHORIZED,
      });
    }
  }

  if (!token) {
    return failureResponse({
      res,
      result: { message: 'auth.tokenNotFound' },
      responseCodes: responseCodes.UNAUTHORIZED,
    });
  }
});

module.exports = protect;
