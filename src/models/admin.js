// src/models/admin.js
const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
// Schema cho admin
const adminSchema = new mongoose.Schema(
  {
    fullname: { type: String }, // Tên đăng nhập
    username: { type: String }, // Tên đăng nhập
    email: { type: String }, // Địa chỉ email
    address: { type: String }, // Địa chỉ email
    password: { type: String }, // Mật khẩuc
    phone: { type: Number }, // Sdt
    dob: { type: Date },
    placeOfBirth: { type: String },
    idNumber: { type: Number },
    idDate: { type: Date },
    idPlace: { type: String },
    gender: { type: String },
    position: { type: String, default: "Admin" },
    image: { type: String }, // Đường dẫn đến ảnh đại diện
    createdAt: { type: Date, default: Date.now }, // Ngày tạo, mặc định là thời điểm hiện tại
    updatedAt: { type: Date, default: Date.now }, // Ngày cập nhật, mặc định là thời điểm hiện tại
  },
  { timestamps: true }
);
adminSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// Tạo model từ schema
const Admin = mongoose.model("Admin", adminSchema);

// Xuất model
module.exports = Admin;
