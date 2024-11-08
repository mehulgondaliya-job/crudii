const Crud = require('../model/crudModel');

const createUser = async (data) => {
  try {
    const newDoc = new Crud({ data });
    await newDoc.save();
    return { success: true, message: 'success' };
  } catch (error) {
    logger.error('Error creating user:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

const updateUser = async (data, id) => {
  try {
    const updatedData = await Crud.findOneAndUpdate(
      { _id: id },
      { $set: { data } },
      { new: true, upsert: true } // Use 'new: true' to return updated data
    );
    return { success: true, message: 'success', data: updatedData };
  } catch (error) {
    logger.error('Error updating user:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

const getUser = async (id) => {
  try {
    const userData = await Crud.findById(id);
    return { success: true, message: 'success', data: userData };
  } catch (error) {
    logger.error('Error fetching user:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

const deleteUser = async (id) => {
  try {
    await Crud.findByIdAndDelete(id);
    return { success: true, message: 'success' };
  } catch (error) {
    logger.error('Error deleting user:', error);
    return { success: false, message: 'error.default', data: error.message };
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
