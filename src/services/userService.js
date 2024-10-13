const Users = require("../models/user");
const aqp = require("api-query-params");
module.exports = {
  getUsers: async (queryString) => {
    try {
      const page = queryString.page;
      const { filter, limit } = aqp(queryString);
      delete filter.page;
      let offset = (page - 1) * limit;
      let result = Users.find(filter)
        .populate({
          path: "favoriteListInfo",
          select: "courseImage title description",
        })
        .populate({
          path: "notificationInfo",
        })
        .skip(offset)
        .limit(limit)
        .exec();
      return result;
    } catch (err) {
      throw new Error("Error retrieving users: " + err.message);
    }
  },
  postUser: async (dataUser) => {
    try {
      if (dataUser.type === "ADD_MY_FV_COURSE") {
        let myUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.courseArr.length; i++) {
          myUser.favoriteListInfo.push(dataUser.courseArr[i]);
        }
        let result1 = await myUser.save();
        return result1;
      }
      if (dataUser.type === "ADD_MY_FV_COURSE") {
        let myUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.courseArr.length; i++) {
          myUser.favoriteListInfo.push(dataUser.courseArr[i]);
        }
        let result1 = await myUser.save();
        return result1;
      }
      if (dataUser.type === "ADD_NOTIFICATION") {
        let myUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.notificationArr.length; i++) {
          myUser.notificationInfo.push(dataUser.notificationArr[i]);
        }
        let result1 = await myUser.save();
        return result1;
      }
      return null;
    } catch (error) {
      console.log(error);
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
