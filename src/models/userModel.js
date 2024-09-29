// models/userModel.js
const db = require("../config/firebase");

class UserModel {
  static async getUserById(userId) {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      throw new Error("User not found");
    }
    return { id: doc.id, ...doc.data() };
  }
}

module.exports = UserModel;
