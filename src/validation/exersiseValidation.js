const Joi = require("joi");

// Định nghĩa schema cho validation
const exerciseValidationSchema = Joi.object({
  lessonId: Joi.string().required(), // ID của bài học, bắt buộc
  question: Joi.string().required(), // Câu hỏi, bắt buộc
  options: Joi.array()
    .items(
      Joi.object({
        option: Joi.string().required(), // Tùy chọn, bắt buộc
      })
    )
    .min(1)
    .required(), // Mảng các tùy chọn, ít nhất 1 tùy chọn là bắt buộc
  answers: Joi.array().items(Joi.string()).min(1).required(), // Mảng các câu trả lời đúng, ít nhất 1 câu trả lời là bắt buộc
});

// Hàm để thực hiện validation
const validateExercise = (exerciseData) => {
  return exerciseValidationSchema.validate(exerciseData);
};

module.exports = { validateExercise };
