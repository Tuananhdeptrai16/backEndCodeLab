// src/models/course.js
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const notificationSchema = new mongoose.Schema(
  {
    message: String, // Nội dung thông báo
  },
  { timestamps: true }
);
notificationSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// Tạo model từ schema
const Notifications = mongoose.model("Notifications", notificationSchema);

// Xuất model
module.exports = Notifications;
