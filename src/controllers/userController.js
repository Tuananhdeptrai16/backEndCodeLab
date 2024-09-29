// controllers/userController.js
const UserModel = require("../models/userModel");

class UserController {
  static async getUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await UserModel.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = UserController;
