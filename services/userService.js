const User = require('../model/userModel');
const { roleId } = require('../utility/commonDbFun');
const { buildSearchQuery, matchPassword, generatePassword, getId } = require('../utility/helper');
const customPaginationData = require('../utility/paginationFunction');

const userList = async (data) => {
  try {
    const { page, pageSize } = data.options;
    const query = buildSearchQuery(data?.searchColumns, data?.search);
    if (data?.role) {
      const roleDetails = await roleId(data?.role);
      query.role = getId(roleDetails);
    }
    const result = await customPaginationData({
      model: User,
      query,
      page,
      pageSize,
      select: '-password -resetPasswordToken -resetPasswordExpire -role',
    });
    return { success: true, message: 'success.default', data: result };
  } catch (error) {
    logger.error(`Error in get userlist ${error}`);
  }
};

const user = async (id) => {
  try {
    const result = User.findById(id).select('-password -resetPasswordToken -resetPasswordExpire -role');
    return { success: true, message: 'success.default', data: result };
  } catch (error) {
    logger.error(`Error in get userlist ${error}`);
  }
};

const userUpdate = async (data, id) => {
  try {
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      upsert: true,
    }).select('-password -resetPasswordToken -resetPasswordExpire -role');
    return {
      success: true,
      message: 'update.success',
      data: user,
      module: 'user',
    };
  } catch (error) {
    logger.error(`Error in updating user: ${error}`);
    return {
      success: false,
      message: 'error.updateUser',
      error: error.message,
    };
  }
};

const userUpdatePassword = async (data, userDetails, id) => {
  try {
    const isVerifiedPassword = await matchPassword(data.oldPassword, userDetails.password);

    if (!isVerifiedPassword) {
      return {
        success: false,
        message: 'user.samePassword',
      };
    }

    const cryptoPassword = await generatePassword(data.newPassword);

    const query = {
      $set: { password: cryptoPassword },
    };

    const user = await User.findByIdAndUpdate(id, query, {
      new: true,
      upsert: true,
    }).select('-password -resetPasswordToken -resetPasswordExpire -role');
    return {
      success: true,
      message: 'update.success',
      data: user,
      module: 'user',
    };
  } catch (error) {
    logger.error(`Error in updating user: ${error}`);
    return {
      success: false,
      message: 'error.updateUser',
      error: error.message,
    };
  }
};

const userVerified = async (data, id) => {
  try {
    const query = { $set: { isVerified: data?.isVerified } };
    const user = await User.findByIdAndUpdate(id, query, {
      new: true,
      upsert: true,
    }).select('isVerified');
    return {
      success: true,
      message: 'update.success',
      data: user,
      module: 'user',
    };
  } catch (error) {
    logger.error(`Error in updating user: ${error}`);
    return {
      success: false,
      message: 'error.updateUser',
      error: error.message,
    };
  }
};

module.exports = {
  user,
  userList,
  userUpdate,
  userVerified,
  userUpdatePassword,
};
