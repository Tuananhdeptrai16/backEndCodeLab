const { getExercises, postExercises } = require("../services/exerciseService");
module.exports = {
  //exercise
  getExercisesAPI: async (req, res) => {
    try {
      const results = await getExercises(); // Gọi hàm getUsers từ service
      return res.status(200).json({
        errorCode: 0,
        data: results,
      });
    } catch (err) {
      return res.status(500).json({
        errorCode: 1,
        message: err.message,
      });
    }
  },
  postExerciseAPI: async (req, res) => {
    const exerciseData = ({ coursesId, title, options } = req.body);
    try {
      let result = await postExercises(exerciseData);
      return res.status(201).json({
        errorCode: 0,
        data: result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        errorCode: 1,
        message: "Có lỗi xảy ra khi tạo caau hoi",
      });
    }
  },
};
