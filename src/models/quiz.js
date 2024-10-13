// src/models/Quiz.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Schema cho tùy chọn
const optionSchema = new mongoose.Schema({
  option: String, // Thêm required nếu cần thiết
});

// Schema cho câu hỏi
const questionSchema = new mongoose.Schema(
  {
    questionName: String, // Thêm required nếu cần thiết
    optionsSelect: [optionSchema], // Chuyển thành mảng nếu có nhiều tùy chọn
    answersCorrect: String, // Sử dụng mảng cho nhiều câu trả lời đúng
  },
  { timestamps: true }
);

// Áp dụng plugin cho xóa mềm
questionSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Quiz = mongoose.model("Quiz", questionSchema);

// Xuất model
module.exports = Quiz;
