const { getUsers, updateUser } = require("../services/userService");
//courses
module.exports = {
  //user
  getUserAPI: async (req, res) => {
    return res.send("ok");
  },
  putUserAPI: async (req, res) => {},
};
