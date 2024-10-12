const Joi = require("joi");

// Định nghĩa schema cho validation
const userValidationSchema = Joi.object({
  userId: Joi.string().required(), // ID người dùng
  email: Joi.string().email().required(), // Email phải hợp lệ
  password: Joi.string().min(6).required(), // Mật khẩu, tối thiểu 6 ký tự
  // Thêm các trường khác nếu cần thiết
});

// Hàm để thực hiện validation
const validateUser = (userData) => {
  return userValidationSchema.validate(userData);
};

module.exports = { validateUser };
