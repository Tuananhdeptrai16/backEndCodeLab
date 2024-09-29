// src/models/course.js
const mongoose = require("mongoose");

// Định nghĩa schema cho bài họ
// Định nghĩa schema cho bài học
const lessonSchema = new mongoose.Schema({
  content: [
    {
      text: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
});

// Định nghĩa schema cho khóa học
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  level: { type: String, required: true },
  content: [lessonSchema], // Định nghĩa content là một mảng chứa lessonSchema
  rating: { type: Number, default: 0 },
  studentsEnrolled: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Tạo model từ schema
const Courses = mongoose.model("Courses", courseSchema);

// Xuất model
module.exports = Courses;
