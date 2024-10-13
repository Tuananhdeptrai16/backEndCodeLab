// src/models/favoriteList.js
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Schema cho FavoriteList
const FavoriteListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // Liên kết tới model Users
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses", // Liên kết tới model Courses (nếu có)
    },
    message: {
      type: String,
      default: "Added to favorites", // Nội dung thông báo mặc định
    },
  },
  { timestamps: true } // Tự động thêm thời gian tạo và cập nhật
);

// Áp dụng plugin cho xóa mềm (soft delete)
FavoriteListSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const FavoriteList = mongoose.model("FavoriteList", FavoriteListSchema);

// Xuất model
module.exports = FavoriteList;
