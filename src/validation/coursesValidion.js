const Joi = require("joi");

// Định nghĩa schema cho validation
const courseValidationSchema = Joi.object({
  type: Joi.string().optional(), // Trường type không bắt buộc
  id: Joi.string().optional(), // Trường type không bắt buộc
  title: Joi.string().required(), // Tiêu đề khóa học
  instructor: Joi.object({
    name: Joi.string().required(), // Tên giảng viên
    profileImage: Joi.string().uri().optional(), // Hình ảnh hồ sơ, nếu có
  }).required(),
  description: Joi.string().required(), // Mô tả khóa học
  duration: Joi.string().required(), // Thời gian khóa học
  level: Joi.string().valid("Cơ bản", "Trung cấp", "Nâng cao").required(), // Cấp độ khóa học
  category: Joi.string().required(), // Danh mục khóa học
  price: Joi.object({
    amount: Joi.number().required(), // Số tiền
    currency: Joi.string().required(), // Tiền tệ
    discount: Joi.object({
      percentage: Joi.number().min(0).max(100).default(0), // Phần trăm giảm giá
    }).optional(),
    _id: Joi.string().optional(), // Trường type không bắt buộc
  }).required(),
  star: Joi.number().min(0).max(100).default(0), // Xếp hạng, mặc định 0
  studentsEnrolled: Joi.number().default(0), // Số lượng học viên đã ghi danh, mặc định 0
  enrollmentStatus: Joi.string().valid("Open", "Closed").default("Open"), // Trạng thái ghi danh
  courseImage: Joi.string().uri().optional(), // Hình ảnh khóa học
  completionCertificate: Joi.boolean().default(false), // Chứng nhận hoàn thành, mặc định false
  lessons: Joi.array().items(Joi.object()).optional(), // Mảng ID bài học
  reviews: Joi.array().items(Joi.object()).optional(), // Mảng ID đánh giá
});

// Hàm để thực hiện validation
const validateCourse = (courseData) => {
  return courseValidationSchema.validate(courseData);
};

module.exports = { validateCourse };
