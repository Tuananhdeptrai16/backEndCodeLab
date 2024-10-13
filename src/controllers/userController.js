const { getUsers, postUser } = require("../services/userService");

module.exports = {
  getUserAPI: async (req, res) => {
    try {
      let result = await getUsers(req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        message: "Error retrieving users: " + error.message,
      });
    }
  },

  postUserAPI: async (req, res) => {
    const dataUser = req.body;
    try {
      let result = await postUser(dataUser);
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
};
