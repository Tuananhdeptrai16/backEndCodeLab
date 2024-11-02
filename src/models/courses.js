// src/models/course.js
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Schema cho giá
const priceSchema = new mongoose.Schema({
  amount: Number, // Bắt buộc
  currency: String, // Bắt buộc
  discount: {
    percentage: { type: Number, default: 0 }, // Đặt mặc định nếu không có giảm giá
  },
});

// Schema cho khóa học
const courseSchema = new mongoose.Schema(
  {
    title: String,
    instructor: {
      name: String,
      profileImage: { type: String },
    },
    registerInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    description: String,
    duration: String,
    level: String,
    category: String,
    price: priceSchema,
    star: { type: Number, default: 0 },
    studentsEnrolled: { type: Number, default: 0 },
    enrollmentStatus: { type: String, default: "Open" },
    courseImage: String,
    completionCertificate: { type: Boolean, default: false },
    lessonInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    reviewsInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Áp dụng plugin cho xóa mềm
courseSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Courses = mongoose.model("Courses", courseSchema);

// Xuất model
module.exports = Courses;
