// src/services/adminService.js

const Admin = require("../models/admin");
const aqp = require("api-query-params");

// Hàm thêm admin
const addAdmin = async (adminData) => {
  const newAdmin = new Admin(adminData);
  await newAdmin.save();
  return newAdmin;
};

// Hàm lấy danh sách admin
const getAllAdmins = async (queryString) => {
  const page = queryString.page;
  const { filter, limit } = aqp(queryString);
  delete filter.page;
  let offset = (page - 1) * limit;
  let result = await Admin.find(filter).skip(offset).limit(limit).exec();
  return result;
};

// Hàm lấy admin theo ID
const getAdminById = async (adminId) => {
  return await Admin.findById(adminId);
};

// Hàm cập nhật admin
const updateAdmin = async (data) => {
  let result = await Admin.updateOne({ _id: data.id }, { ...data });
  return result;
};

// Hàm xóa admin
const deleteAdmin = async (adminId) => {
  return await Admin.findByIdAndDelete(adminId.id);
};
// Hàm xóa nhiều admin
const deleteManyAdmin = async (dataDelete) => {
  return await Admin.deleteMany(dataDelete);
};
// Xuất các hàm
module.exports = {
  addAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  deleteManyAdmin,
};
