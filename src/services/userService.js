const aqp = require("api-query-params");
const Users = require("../models/user");
const admin = require("../config/firebase"); // Đảm bảo đã import admin từ firebase
module.exports = {
  getUsers: async (queryString) => {
    try {
      const users = [];
      let nextPageToken;

      // Sử dụng vòng lặp để lấy tất cả người dùng
      do {
        const response = await admin.auth().listUsers(100, nextPageToken);
        users.push(...response.users);
        nextPageToken = response.pageToken;
      } while (nextPageToken);
      for (const user of users) {
        const userData = {
          userId: user.uid,
          data: user,
        };
        await Users.findOneAndUpdate(
          { userId: user.uid }, // Tìm kiếm theo userId
          userData, // Dữ liệu mới
          { upsert: true } // Tạo mới nếu không tìm thấy
        );
      }
      const page = queryString.page;
      const { filter, limit, population } = aqp(queryString);
      delete filter.page;
      let offset = (page - 1) * limit;
      let result = Users.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();
      return result;
    } catch (err) {
      throw new Error("Error retrieving users: " + err.message);
    }
  },
  updateUser: async (dataUser) => {
    try {
      if (dataUser.type === "ADD_MY_FV_COURSE") {
        let myUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.courseArr.length; i++) {
          myUser.favoriteListInfo.push(dataUser.courseArr[i]);
        }
        let result1 = await myUser.save();
        return result1;
      }
      if (dataUser.type === "REMOVE_MY_FV_COURSE") {
        let newUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.courseArr.length; i++) {
          newUser.favoriteListInfo.pull(dataUser.courseArr[i]);
        }
        let result1 = await newUser.save();
        return result1;
      }
      //blog
      if (dataUser.type === "ADD_MY_FV_BLOG") {
        let myUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.blogArr.length; i++) {
          myUser.favoriteBlogInfo.push(dataUser.blogArr[i]);
        }
        let result1 = await myUser.save();
        return result1;
      }
      if (dataUser.type === "REMOVE_MY_FV_BLOG") {
        let newUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.blogArr.length; i++) {
          newUser.favoriteBlogInfo.pull(dataUser.blogArr[i]);
        }
        let result1 = await newUser.save();
        return result1;
      }
      //end blog
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
      if (dataUser.type === "REMOVE_NOTIFICATION") {
        let newUser = await Users.findById(dataUser.userId).exec();
        for (let i = 0; i < dataUser.notificationArr.length; i++) {
          newUser.notificationInfo.pull(dataUser.notificationArr[i]);
        }
        let result1 = await newUser.save();
        return result1;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  },
  deleteManyUser: async (dataDelete) => {
    try {
      // Xóa người dùng từ MongoDB
      const deletedUsers = await Users.find(dataDelete, "userId");
      const results = await Users.deleteMany(dataDelete);
      // Kiểm tra nếu không có người dùng nào bị xóa từ MongoDB
      if (results.deletedCount === 0) {
        return {
          status: 404,
          message: "There are no users from MongoDb.",
        };
      }
      if (deletedUsers.length === 0) {
        return {
          status: 404,
          message: "Users not found to delete from MongoDb",
        };
      }
      // Tạo mảng chứa các UID đã bị xóa
      const uids = deletedUsers.map((user) => user.userId);
      const deleteFirebaseUsersResult = await admin.auth().deleteUsers(uids);

      if (deleteFirebaseUsersResult.failureCount > 0) {
        console.log(
          `There are  ${deleteFirebaseUsersResult.failureCount}users can not delete from Firebase`
        );
        deleteFirebaseUsersResult.errors.forEach((err) => {
          console.error(`Lỗi khi xóa người dùng UID ${err.index}:`, err.error);
        });
      }

      return {
        status: 200,
        message: `Deleted ${results.deletedCount} users from MongoDB and ${deleteFirebaseUsersResult.successCount} users from Firebase.`,
      };
    } catch (error) {
      console.log("Error while deleting user", error);
      return { status: 500, message: "Server error" };
    }
  },
};
