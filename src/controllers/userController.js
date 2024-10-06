const { getUsers, updateUser } = require("../services/userService");
//courses
module.exports = {
  //user
  getUserAPI: async (req, res) => {
    try {
      const results = await getUsers(); // Gọi hàm getUsers từ service
      return res.status(200).json({
        errorCode: 0,
        data: results,
      });
    } catch (err) {
      return res.status(500).json({
        errorCode: 1,
        message: err.message,
      });
    }
  },
  putUserAPI: async (req, res) => {
    const { _id } = req.params;
    const { admin, course } = req.body;

    try {
      const updatedUser = await updateUser(_id, { admin, course }); // Gọi hàm updateUser từ service
      return res.status(200).json({
        errorCode: 0,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      return res.status(500).json({
        errorCode: 1,
        message: err.message,
      });
    }
  },
};
