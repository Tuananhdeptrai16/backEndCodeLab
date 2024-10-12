// src/models/review.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Định nghĩa schema cho review
const reviewSchema = new mongoose.Schema(
  {
    message: String, // Nội dung thông báo, cần thiết
  },
  { timestamps: true } // Thêm trường timestamp
);

// Áp dụng plugin cho xóa mềm
reviewSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Reviews = mongoose.model("Reviews", reviewSchema);

// Xuất model
module.exports = Reviews; // Xuất đúng model
