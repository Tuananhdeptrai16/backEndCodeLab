// src/models/course.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [
    {
      text: { type: String, required: true },
      imageUrl: { type: String, required: true },
      descImage: { type: String, required: true },
    },
  ],
});

// Định nghĩa schema cho khóa học
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    background: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    level: { type: String, required: true },
    lessons: [lessonSchema], // Định nghĩa content là một mảng chứa lessonSchema
    rating: { type: Number, default: 0 },
    studentsEnrolled: { type: Number, default: 0 },
  },
  { timestamps: true }
);
courseSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// Tạo model từ schema
const Courses = mongoose.model("Courses", courseSchema);

// Xuất model
module.exports = Courses;
