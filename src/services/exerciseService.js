const Exercises = require("../models/exersises");

module.exports = {
  getExercises: async () => {
    try {
      const results = await Exercises.find({});
      return results;
    } catch (error) {
      console.log(error);
    }
  },
  postExercises: async (ExercisesData) => {
    try {
      const result = await Exercises.create({
        coursesId: ExercisesData.coursesId,
        questions: ExercisesData.questions,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
