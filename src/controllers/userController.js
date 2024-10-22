const {
  getUsers,
  updateUser,
  deleteManyUser,
} = require("../services/userService");
module.exports = {
  getUserAPI: async (req, res) => {
    try {
      let result = await getUsers(req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users");
    }
  },
  postUserAPI: async (req, res) => {
    const dataUser = req.body;
    try {
      console.log("dataUsser", dataUser);
      let result = await updateUser(dataUser);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        message: "Error adding favorite course: " + error.message,
      });
    }
  },
  deleteUsersAPI: async (req, res) => {
    try {
      let result = await deleteManyUser(req.body.dataDelete);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
// Hàm lấy tất cả người dùng từ Firebase và lưu vào MongoDB

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
