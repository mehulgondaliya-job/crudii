const { generateToken, generatePassword, getToken, matchPassword, getId } = require('../utility/helper');
const User = require('../model/userModel');
const { getCurrentDate, addTimeToDate } = require('../utility/timeFunction');
const config = require('../config/config');
const { QUEUE_NAME, JOB_NAME } = require('../utility/constant/constantVariable');
const { createJob } = require('../jobs/createJob');
const { MONGO_ERROR_CODES } = require('../utility/constant/errorCodes');
const Role = require('../model/roleModel');

const checkUserExists = async (data) => {
  try {
    const { email } = data;
    const userExists = await User.findOne({ email });
    return userExists;
  } catch (error) {
    logger.error('Error Check Exist User:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

const checkUserNameExists = async (data) => {
  try {
    const { userName } = data;
    const userNameExists = await User.findOne({ userName });
    return userNameExists;
  } catch (error) {
    logger.error('Error Check Exist User:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

const login = async (data) => {
  try {
    const { email } = data;
    const userExists = await checkUserExists({ email });

    if (!userExists) {
      return { success: false, message: 'auth.notFound' };
    }

    const isVerifiedPassword = await matchPassword(data.password, userExists.password);

    if (!isVerifiedPassword) {
      return { success: false, message: 'auth.passwordWrong' };
    }

    const token = generateToken(userExists._id);

    // Convert Mongoose document to a plain JavaScript object
    const user = userExists.toObject();
    delete user.password;

    const responseData = {
      token,
      user,
    };

    return { success: true, message: 'auth.login', data: responseData };
  } catch (error) {
    logger.error('Error Login:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

const register = async (data, role) => {
  try {
    const { fullName, userName, email, password } = data;
    const userExists = await checkUserExists({ email });

    if (userExists) {
      return { success: false, message: 'auth.exists', module: 'Email' };
    }

    const cryptoPassword = await generatePassword(password);

    const roleId = await Role.findOne({ roleName: role });

    const query = {
      fullName,
      userName,
      email,
      password: cryptoPassword,
      role: getId(roleId),
    };

    // Create a new user
    await User.create(query);
    return { success: true, message: 'auth.created' };
  } catch (error) {
    logger.error('Error Register:', error);
    if (error.code === MONGO_ERROR_CODES.DUPLICATE_KEY) {
      // Handle duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return { success: false, message: 'auth.exists', module: field };
    } else {
      return { success: false, message: 'error.default', data: error.message };
    }
  }
};

const userNameVerify = async (data) => {
  try {
    const { userName } = data;
    const userNameExists = await checkUserNameExists({ userName });

    if (userNameExists) {
      return { success: false, message: 'auth.exists', module: 'Username' };
    }

    return { success: true, message: 'auth.verified', module: 'Username' };
  } catch (error) {
    logger.error('Error Register:', error);
    if (error.code === MONGO_ERROR_CODES.DUPLICATE_KEY) {
      // Handle duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return { success: false, message: 'auth.exists', module: field };
    } else {
      return { success: false, message: 'error.default', data: error.message };
    }
  }
};

const forgotPassword = async (data) => {
  try {
    const { email } = data;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return { success: false, message: 'auth.notFound' };
    }

    // Generate reset token
    const resetToken = getToken();
    userExists.resetPasswordToken = resetToken;
    userExists.resetPasswordExpire = addTimeToDate(getCurrentDate(), config.TOKEN.EXIPIRE_IN); // Token valid for 10 minutes
    await userExists.save();

    // Send the reset email
    const emailData = {
      to: email,
      subject: 'Forgot Password Link',
      text: `${config.WEBSITE.ORIGIN}/${resetToken}`,
    };
    createJob(QUEUE_NAME.EMAIL_QUEUE, JOB_NAME.SEND_EMAIL, emailData);

    return { success: true, message: 'auth.resetEmailSent' };
  } catch (error) {
    logger.error('Error in forgotPassword:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

const resetPassword = async (data) => {
  try {
    const { resetToken, newPassword } = data;

    const query = {
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: getCurrentDate() },
    };

    // Find user by reset token and check token expiration
    const user = await User.findOne(query);

    if (!user) {
      return { success: false, message: 'auth.invalidOrExpiredToken' };
    }

    // Set the new password
    user.password = await generatePassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return { success: true, message: 'auth.passwordResetSuccess' };
  } catch (error) {
    logger.error('Error in resetPassword:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  userNameVerify,
};
