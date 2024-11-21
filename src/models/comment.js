const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const CommentSchema = new mongoose.Schema(
  {
    message: String, // Nội dung thông báo,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }, // Đổi tên và thêm required
  },
  { timestamps: true }
);

// Áp dụng plugin cho xóa mềm
CommentSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// Tạo model từ schema
const Comments = mongoose.model("Comments", CommentSchema);

// Xuất model
module.exports = Comments;
