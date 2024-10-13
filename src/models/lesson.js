// src/models/lesson.js

const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

// Schema cho nội dung bài học
const contentLessonSchema = new mongoose.Schema({
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
    },
    comment: String,
  },
  { timestamps: true }
);

// Schema cho bài học
const lessonSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    duration: Number,
    author: String,
    urlImage: String,
    contentLesson: [contentLessonSchema],
    comments: [commentSchema], // Thay thế commentsNumber bằng comments
    studentsEnrolled: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 }, // Số lượng bình luận
  },
  { timestamps: true }
);

// Áp dụng plugin cho xóa mềm
lessonSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
