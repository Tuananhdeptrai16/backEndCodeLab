// src/models/course.js
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  course: [
    {
      coursesId: { type: String, required: true },
      progress: { type: Number, default: 0 }, // Giá trị tiến độ, bạn có thể thay đổi loại nếu cần
    },
  ],
  admin: { type: Boolean, default: false },
  data: { type: Object },
});
// Tạo model từ schema
const Users = mongoose.model("Users", userSchema);

// Xuất model
module.exports = Users;
