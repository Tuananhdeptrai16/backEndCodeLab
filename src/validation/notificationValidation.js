const Joi = require("joi");

// Định nghĩa schema cho validation
const notificationValidationSchema = Joi.object({
  message: Joi.string().required(), // Nội dung thông báo, bắt buộc
});

// Hàm để thực hiện validation
const validateNotification = (notificationData) => {
  return notificationValidationSchema.validate(notificationData);
};

module.exports = { validateNotification };
