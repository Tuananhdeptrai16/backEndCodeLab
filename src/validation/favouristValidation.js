const Joi = require("joi");

// Định nghĩa schema cho validation
const favoriteListValidationSchema = Joi.object({
  message: Joi.string().required(), // Nội dung thông báo, bắt buộc
});

// Hàm để thực hiện validation
const validateFavoriteList = (favoriteListData) => {
  return favoriteListValidationSchema.validate(favoriteListData);
};

module.exports = { validateFavoriteList };
