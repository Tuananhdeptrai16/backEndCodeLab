const Joi = require("joi");

// Định nghĩa schema cho validation
const productValidationSchema = Joi.object({
  type: Joi.string().optional(), // Tiêu đề product
  linkProduct: Joi.string().uri().required(), // Tiêu đề product
  title: Joi.string().required(), // Tiêu đề product
  description: Joi.string().required(), // Mô tả product
  duration: Joi.number().required(), // Thời gian (số phút)
  author: Joi.string().required(), // Tác giả product
  urlImage: Joi.string().uri().required(), // URL hình ảnh product
  content: Joi.string().required(),
  category: Joi.array().required(), // Danh mục ReactJS , JavaScript
  comments: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().required(), // ID người dùng
        comment: Joi.string().required(), // Bình luận, bắt buộc
      })
    )
    .optional(), // Bình luận, tùy chọn
  views: Joi.number().default(0), // Số lượt xem, mặc định 0
  likes: Joi.number().default(0), // Số lượt thích, mặc định 0
  studentsEnrolled: Joi.number().default(0), // Số lượng học viên đã ghi danh, mặc định 0
});

// Hàm để thực hiện validation
const validateProduct = (productData) => {
  return productValidationSchema.validate(productData);
};

module.exports = { validateProduct };
