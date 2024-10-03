const Users = require("../models/user");
module.exports = {
  getUsers: async () => {
    try {
      const results = await Users.find({});
      return results;
    } catch (err) {
      throw new Error("Error retrieving users: " + err.message);
    }
  },
  updateUser: async (id, dataUpdateUser) => {
    const { admin, course } = dataUpdateUser;
    if (typeof admin !== "boolean") {
      throw new Error("Admin must be a boolean value");
    }

    try {
      const updateAdmin = await Users.findByIdAndUpdate(
        id,
        {
          admin,
          course,
          updatedAt: Date.now(),
        },
        { new: true, runValidators: true }
      );

      if (!updateAdmin) {
        throw new Error("User not found");
      }

      if (course && course.length > 0) {
        updateAdmin.course = course; // Cập nhật khóa học
        await updateAdmin.save(); // Lưu lại thay đổi
      }

      return updateAdmin;
    } catch (err) {
      throw new Error("Error updating user: " + err.message);
    }
  },
};
