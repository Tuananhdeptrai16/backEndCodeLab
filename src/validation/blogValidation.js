const Joi = require("joi");

// Định nghĩa schema cho validation
const blogValidationSchema = Joi.object({
  title: Joi.string().required(), // Tiêu đề blog
  description: Joi.string().required(), // Mô tả blog
  duration: Joi.number().required(), // Thời gian (số phút)
  author: Joi.string().required(), // Tác giả blog
  urlImage: Joi.string().uri().required(), // URL hình ảnh blog
  blogItems: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(), // Tiêu đề nội dung blog
        content: Joi.array()
          .items(
            Joi.object({
              text: Joi.string().required(), // Nội dung văn bản
              imageUrl: Joi.string().uri().required(), // URL hình ảnh
              descImage: Joi.string().required(), // Mô tả hình ảnh
            })
          )
          .required(), // Mảng nội dung, bắt buộc
      })
    )
    .required(), // Mảng các mục blog, bắt buộc
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
const validateBlog = (blogData) => {
  return blogValidationSchema.validate(blogData);
};

module.exports = { validateBlog };
