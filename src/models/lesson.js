const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("mongoose-delete");
const lessonSchema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses", // Tham chiếu đến model Courses
      required: true,
    },
    title: {
      type: String,
      required: true, // Tiêu đề bài học là bắt buộc
    },
    content: {
      type: String,
      required: false, // Nội dung bài học, không bắt buộc
    },
    createdAt: {
      type: Date,
      default: Date.now, // Tự động thêm ngày giờ tạo
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Tự động thêm ngày giờ cập nhật
    },
  },
  { timestamps: true }
);

lessonSchema.pre("save", function (next) {
  this.updatedAt = Date.now(); // Cập nhật updatedAt mỗi khi lưu
  next();
});
lessonSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
