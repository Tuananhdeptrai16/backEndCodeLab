const Quiz = require("../models/quiz");
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
  deleteQuiz: async (id) => {
    let result = await Quiz.deleteById(id);
    return result;
  },
  putQuiz: async (data) => {
    let result = await Quiz.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
