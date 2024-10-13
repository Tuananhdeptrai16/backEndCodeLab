// src/models/user.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema(
  {
    userId: String, // ID người dùng
    course: [
      {
        coursesId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
        progress: { type: Number, default: 0 },
      },
    ],
    star: Number,
    admin: { type: Boolean, default: false },
    data: { type: Object },
    FavoriteList: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FavoriteList" }, // Danh sách yêu thích
    ],
    notifications: [
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
