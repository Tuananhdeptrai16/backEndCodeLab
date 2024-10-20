const Quiz = require("../models/quiz");
const Lessons = require("../models/lesson");

module.exports = {
  getQuiz: async () => {
    let result = Quiz.find({});
    return result;
  },
  postQuiz: async (data) => {
    try {
      let result = await Quiz.create(data);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteQuiz: async (quizId) => {
    let result = await Quiz.deleteById(quizId);
    return result;
  },
  putQuiz: async (data) => {
    let result = await Quiz.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
