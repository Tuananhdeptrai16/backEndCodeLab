// src/models/user.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema(
  {
    userId: String, // ID người dùng
    star: Number,
    data: { type: Object },
    favoriteListInfo: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
    ],
    notificationInfo: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notifications" }, // Thông báo
    ],
    readNotification: { type: Boolean, default: false }, // Đánh dấu thông báo đã đọc
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Áp dụng plugin cho xóa mềm
userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Users = mongoose.model("Users", userSchema);

// Xuất model
module.exports = Users; // Xuất đúng model
