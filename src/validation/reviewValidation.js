const Joi = require("joi");

// Định nghĩa schema cho validation
const reviewValidationSchema = Joi.object({
  message: Joi.string().required(), // Nội dung review, bắt buộc
});

// Hàm để thực hiện validation
const validateReview = (reviewData) => {
  return reviewValidationSchema.validate(reviewData);
};

module.exports = { validateReview };
