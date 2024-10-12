// src/models/course.js
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const FavoriteListSchema = new mongoose.Schema(
  {
    message: String, // Nội dung thông báo
  },
  { timestamps: true }
);
FavoriteListSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// Tạo model từ schema
const FavoriteList = mongoose.model("FavoriteList", FavoriteListSchema);

// Xuất model
module.exports = FavoriteList;
