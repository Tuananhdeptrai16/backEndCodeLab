const UserModel = require("../../models/firebase/userModel");
const admin = require("../../config/firebase"); // Đảm bảo đã import admin từ firebase

// Hàm lấy tất cả người dùng từ Firebase và lưu vào MongoDB
const getUser = async (req, res) => {
  console.log(">>getUserAPi");
  try {
    const users = [];
    let nextPageToken;

    // Sử dụng vòng lặp để lấy tất cả người dùng
    do {
      const response = await admin.auth().listUsers(100, nextPageToken);
      users.push(...response.users);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    for (const user of users) {
      const userData = {
        userId: user.uid,
        data: user, // Lưu toàn bộ thông tin người dùng
      };

      // Tìm kiếm và cập nhật người dùng trong MongoDB
      await UserModel.findOneAndUpdate(
        { userId: user.uid }, // Tìm kiếm theo userId
        userData, // Dữ liệu mới
        { upsert: true } // Tạo mới nếu không tìm thấy
      );
      console.log("User saved successfully:", userData);
    }
    res.status(200).json(users); // Trả về danh sách người dùng
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};

// Hàm lấy người dùng theo ID
// const getUserById = async (userId) => {
//   try {
//     const userRecord = await admin.auth().getUser(userId);
//     return userRecord;
//   } catch (error) {
//     console.error("Error fetching user from Firebase:", error);
//     throw error;
//   }
// };

// const putUser = async (req, res) => {
//   const { id } = req.params;
//   const { admin: isAdmin } = req.body;
//   if (typeof isAdmin !== "boolean") {
//     return res
//       .status(400)
//       .json({ errorCode: 1, message: "Admin must be a boolean value" });
//   }

//   try {
//     const userFromFirebase = await getUserById(id);
//     userFromFirebase.admin = isAdmin;
//     await saveUserToMongoDB(userFromFirebase); // Gọi hàm lưu ở đây
//     return res.status(200).json({ errorCode: 0, data: userFromFirebase });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ errorCode: 1, message: err.message });
//   }
// };

// const saveUserToMongoDB = async (user) => {
//   const userModel = new UserModel(user);
//   await userModel.save();
// };

// Xuất các hàm
module.exports = { getUser };
