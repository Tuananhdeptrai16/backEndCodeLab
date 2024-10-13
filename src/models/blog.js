// src/models/blogs.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Schema cho nội dung blog
const contentBlogSchema = new mongoose.Schema({
  title: String,
  content: [
    {
      text: String,
      imageUrl: String,
      descImage: String,
    },
  ],
});

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

// Schema cho blog
const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    duration: Number, // Có thể là thời gian (ví dụ: số phút)
    author: String,
    urlImage: String,
    contentBlog: [contentBlogSchema],
    comments: [commentSchema], // Đổi tên thành comments để phản ánh chính xác hơn
    views: { type: Number, default: 0 }, // Thêm giá trị mặc định
    likes: { type: Number, default: 0 }, // Thêm giá trị mặc định
    studentsEnrolled: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Áp dụng plugin cho xóa mềm
blogSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Blogs = mongoose.model("Blogs", blogSchema);

// Xuất model
module.exports = Blogs;
