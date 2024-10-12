// src/models/exercises.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Schema cho tùy chọn
const optionSchema = new mongoose.Schema({
  option: String, // Thêm required nếu cần thiết
});

// Schema cho câu hỏi
const questionSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lessons",
      required: true,
    }, // Sử dụng singular cho lessonId
    question: String, // Thêm required nếu cần thiết
    options: [optionSchema], // Chuyển thành mảng nếu có nhiều tùy chọn
    answers: String, // Sử dụng mảng cho nhiều câu trả lời đúng
  },
  { timestamps: true }
);

// Áp dụng plugin cho xóa mềm
questionSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Exercises = mongoose.model("Exercises", questionSchema);

// Xuất model
module.exports = Exercises;
