// src/models/products.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Schema cho bình luận
const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }, // Đổi tên và thêm required
    comment: String, // Đảm bảo bình luận không để trống
  },
  { timestamps: true }
);

// Schema cho product
const productSchema = new mongoose.Schema(
  {
    title: String,
    linkProduct: String,
    description: String,
    duration: Number, // Có thể là thời gian (ví dụ: số phút)
    author: String,
    urlImage: String,
    category: [],
    content: String,
    comments: [commentSchema], // Đổi tên thành comments để phản ánh chính xác hơn
    views: { type: Number, default: 0 }, // Thêm giá trị mặc định
    likes: { type: Number, default: 0 }, // Thêm giá trị mặc định
    studentsEnrolled: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Áp dụng plugin cho xóa mềm
productSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Products = mongoose.model("Products", productSchema);

// Xuất model
module.exports = Products;
