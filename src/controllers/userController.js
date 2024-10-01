const UserModel = require("../models/userModel");
const admin = require("../config/firebase"); // Đảm bảo đã import admin từ firebase

// Hàm lấy tất cả người dùng từ Firebase và lưu vào MongoDB
const getUser = async (req, res) => {
  try {
    const users = [];
    let nextPageToken;

    // Sử dụng vòng lặp để lấy tất cả người dùng
    do {
      const response = await admin.auth().listUsers(1000, nextPageToken);
      users.push(...response.users);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    for (const user of users) {
      const userData = {
        userId: user.uid,
        admin: false, // Hoặc bạn có thể thay đổi điều này tùy thuộc vào logic của bạn
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

// Hàm cập nhật người dùng
const putUser = async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  // Kiểm tra xem admin có phải là kiểu boolean không
  if (typeof admin !== "boolean") {
    return res
      .status(400)
      .json({ errorCode: 1, message: "Admin must be a boolean value" });
  }

  try {
    // Lấy dữ liệu từ Firebase
    const userFromFirebase = await getUserById(id);

    // Cập nhật dữ liệu
    userFromFirebase.admin = admin;

    // Lưu dữ liệu vào MongoDB
    await saveUserToMongoDB(userFromFirebase); // Gọi hàm lưu ở đây

    return res.status(200).json({ errorCode: 0, data: userFromFirebase });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorCode: 1, message: err.message });
  }
};

// Hàm lưu người dùng vào MongoDB
const saveUserToMongoDB = async (user) => {
  const userModel = new UserModel(user);
  await userModel.save();
};

// Xuất các hàm
module.exports = { getUser, putUser, saveUserToMongoDB };
