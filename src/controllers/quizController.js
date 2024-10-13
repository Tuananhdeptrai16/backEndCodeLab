const {
  getQuiz,
  postQuiz,
  deleteQuiz,
  putQuiz,
} = require("../services/quizService");
module.exports = {
  getQuizAPI: async (req, res) => {
    try {
      let result = await getQuiz();
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: err.message,
      });
    }
  },
  postQuizAPI: async (req, res) => {
    try {
      let data = req.body;
      let result = await postQuiz(data);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: err.message,
      });
    }
  },
  deleteQuizAPI: async (req, res) => {
    const id = req.body;
    let result = await deleteQuiz(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putQuizAPI: async (req, res) => {
    const data = req.body;
    let result = await putQuiz(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
