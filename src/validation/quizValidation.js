const Joi = require("joi");

// Định nghĩa schema cho validation
const quizValidationSchema = Joi.object({
  message: Joi.string().required(), // Nội dung quiz, bắt buộc
});

// Hàm để thực hiện validation
const validateQuiz = (quizData) => {
  return quizValidationSchema.validate(quizData);
};

module.exports = { validateQuiz };
