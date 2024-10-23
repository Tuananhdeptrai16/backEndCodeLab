const Joi = require("joi");

// Định nghĩa schema cho validation
const lessonValidationSchema = Joi.object({
  title: Joi.string().required(), // Tiêu đề bài học, bắt buộc
  description: Joi.string().required(), // Mô tả bài học, bắt buộc
  duration: Joi.number().required(), // Thời gian, bắt buộc
  author: Joi.string().required(), // Tác giả, bắt buộc
  urlImage: Joi.string().required(), // URL hình ảnh, bắt buộc
  content: Joi.string().required(),
  comments: Joi.array().items(
    Joi.object({
      commentId: Joi.objectId().required(), // ID bình luận, bắt buộc
      userId: Joi.string().required(), // ID người dùng, bắt buộc
      comment: Joi.string().required(), // Nội dung bình luận, bắt buộc
    })
  ),
  studentsEnrolled: Joi.number().default(0), // Số học viên đã tham gia, mặc định là 0
  commentsCount: Joi.number().default(0), // Số lượng bình luận, mặc định là 0
});

// Hàm để thực hiện validation
const validateLesson = (lessonData) => {
  return lessonValidationSchema.validate(lessonData);
};

module.exports = { validateLesson };
