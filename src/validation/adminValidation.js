const Joi = require("joi");

const adminValidationSchema = Joi.object({
  id: Joi.string().optional(),
  fullname: Joi.string().min(3).max(30).optional(),
  username: Joi.string().min(3).max(30).optional(),
  address: Joi.string().min(3).max(70).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(20).optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
  dob: Joi.date().optional(),
  placeOfBirth: Joi.string().optional(),
  idNumber: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .optional(),
  idDate: Joi.date().optional(),
  idPlace: Joi.string().optional(),
  gender: Joi.string().valid("Nam", "Nữ").optional(),
  position: Joi.string().default("Admin"),
  image: Joi.string().uri().optional(), // Đường dẫn URL hợp lệ
});

const validateAdmin = (data) => {
  return adminValidationSchema.validate(data);
};

module.exports = { validateAdmin };
