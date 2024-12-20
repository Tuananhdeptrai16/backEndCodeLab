// src/controllers/adminController.js

const {
  addAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteManyAdmin,
  deleteAdmin,
  loginService,
} = require("../services/adminService");
const { validateAdmin } = require("../validation/adminValidation");

// Controller để thêm admin
const createAdmin = async (req, res) => {
  try {
    const { error } = validateAdmin(req.body); // Xác thực dữ liệu
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newAdmin = await addAdmin(req.body);
    res
      .status(201)
      .json({ message: "Admin created successfully", data: newAdmin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating admin", error: err.message });
  }
};

//handle Login
const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log("check email, password", req.body);
  const data = await loginService(username, password);
  res.status(200).json(data);
};

// Controller để lấy danh sách admin
const getAdmins = async (req, res) => {
  try {
    const admins = await getAllAdmins(req.query);
    res.status(200).json(admins);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching admins", error: err.message });
  }
};

// Controller để lấy admin theo ID
const getAdmin = async (req, res) => {
  try {
    const admin = await getAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching admin", error: err.message });
  }
};

// Controller để cập nhật admin
const updateAdminAPI = async (req, res) => {
  try {
    const { error } = validateAdmin(req.body); // Xác thực dữ liệu
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    console.log("req.body", req.body);
    const updatedAdmin = await updateAdmin(req.body);
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res
      .status(200)
      .json({ message: "Admin updated successfully", data: updatedAdmin });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating admin", error: err.message });
  }
};

// Controller để xóa admin
const deleteAdminAPI = async (req, res) => {
  try {
    const deletedAdmin = await deleteAdmin(req.body);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting admin", error: err.message });
  }
};
const deleteManyAdminAPI = async (req, res) => {
  try {
    const deletedAdmin = await deleteManyAdmin(req.body.dataDelete);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting admin", error: err.message });
  }
};
// Xuất các controller
module.exports = {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdminAPI,
  deleteAdminAPI,
  deleteManyAdminAPI,
  handleLogin,
};
