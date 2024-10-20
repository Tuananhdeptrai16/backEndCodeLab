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
    questions: [
      {
        questionName: String,
        optionsSelect: [optionSchema], // Đảm bảo content là một mảng
        answersCorrect: String,
      },
    ],
  },
  { timestamps: true }
);

// Áp dụng plugin cho xóa mềm
questionSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Quiz = mongoose.model("Quiz", questionSchema);

// Xuất model
module.exports = Quiz;
