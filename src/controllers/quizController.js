const {
  getQuiz,
  postQuiz,
  deleteQuiz,
  putQuiz,
  getQuizByLessonId,
} = require("../services/quizService");
const Lessons = require("../models/lesson");

module.exports = {
  getQuizAPI: async (req, res) => {
    try {
      let result = await getQuiz(req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: error.message,
      });
    }
  },

  postQuizAPI: async (req, res) => {
    try {
      const data = req.body;

      const newQuizData = {
        questions: data.questions.map((q) => ({
          questionName: q.questionName,
          optionsSelect: q.optionsSelect.map((opt) => ({ option: opt.option })), // Đảm bảo định dạng cho tùy chọn
          answersCorrect: q.answersCorrect,
        })),
      };

      let result = await postQuiz(newQuizData);
      if (!result) {
        return res.status(500).json({
          EC: 1,
          message: "Lưu quiz thất bại.",
        });
      }
      const lessonId = req.body.lessonId;
      const updatedLesson = await Lessons.findByIdAndUpdate(
        lessonId,
        { $push: { quizInfo: result._id } },
        { new: true }
      );

      res.status(200).json({ EC: 0, quiz: result, lesson: updatedLesson });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: error.message,
      });
    }
  },

  deleteQuizAPI: async (req, res) => {
    const quizId = req.body.quizId;
    const lessonId = req.body.lessonId;
    let result = await deleteQuiz(quizId);
    const updatedLesson = await Lessons.findByIdAndUpdate(
      lessonId,
      { $pull: { quizInfo: quizId } },
      { new: true }
    );
    res.status(200).json({ EC: 0, quiz: result, lesson: updatedLesson });
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
