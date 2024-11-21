// src/services/adminService.js
require("dotenv").config();
const Admin = require("../models/admin");
const aqp = require("api-query-params");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
// Hàm thêm admin
const addAdmin = async (adminData) => {
  try {
    const hashPassword = await bcrypt.hash(adminData.password, saltRounds);
    const newAdmin = new Admin({ ...adminData, password: hashPassword });
    await newAdmin.save();
    return newAdmin;
  } catch (error) {
    console.log("err", error);
  }
};
const loginService = async (username, password) => {
  try {
    //fetch user by email
    const user = await Admin.findOne({ username: username });
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/ Pass invalid",
        };
      } else {
        const payLoad = {
          username: user.username,
          password: user.password,
        };
        const accessToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          accessToken,
          user: {
            username: user.username,
            password: user.password,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/ Pass invalid",
      };
    }
  } catch (error) {
    console.log("err", error);
  }
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
  const hashPassword = await bcrypt.hash(data.password, saltRounds);
  let result = await Admin.updateOne(
    { _id: data.id },
    { ...data, password: hashPassword }
  );
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
  loginService,
};
