// src/services/adminService.js

const Admin = require("../models/admin");

// Hàm thêm admin
const addAdmin = async (adminData) => {
  const newAdmin = new Admin(adminData);
  await newAdmin.save();
  return newAdmin;
};

// Hàm lấy danh sách admin
const getAllAdmins = async () => {
  return await Admin.find({});
};

// Hàm lấy admin theo ID
const getAdminById = async (adminId) => {
  return await Admin.findById(adminId);
};

// Hàm cập nhật admin
const updateAdmin = async (adminId, adminData) => {
  return await Admin.findByIdAndUpdate(adminId, adminData, { new: true });
};

// Hàm xóa admin
const deleteAdmin = async (adminId) => {
  return await Admin.findByIdAndDelete(adminId.id);
};

// Xuất các hàm
module.exports = {
  addAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
