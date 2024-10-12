// src/models/quiz.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Định nghĩa schema cho quiz
const QuizSchema = new mongoose.Schema(
  {
    message: String, // Nội dung thông báo, cần thiết
  },
  { timestamps: true } // Thêm trường timestamp
);

// Áp dụng plugin cho xóa mềm
QuizSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Tạo model từ schema
const Quiz = mongoose.model("Quiz", QuizSchema);
// Xuất model
module.exports = Quiz; // Xuất đúng model
