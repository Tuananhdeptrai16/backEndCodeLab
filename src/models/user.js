// src/models/course.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  admin: { type: Boolean, default: false },
  data: { type: Object },
});
// Tạo model từ schema
const Users = mongoose.model("Users", userSchema);

// Xuất model
module.exports = Users;
