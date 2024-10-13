const {
  getLesson,
  deleteLesson,
  createLesson,
  updateLesson,
  deleteManyLesson,
} = require("../services/lessonService");

module.exports = {
  //Lesson
  postLessonAPI: async (req, res) => {
    const dataLessons = req.body;
    let result = await createLesson(dataLessons);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  getLessonAPI: async (req, res) => {
    let result = await getLesson(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteLessonAPI: async (req, res) => {
    const _id = req.body;
    let result = await deleteLesson(_id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteManyLessonAPI: async (req, res) => {
    let result = await deleteManyLesson(req.body.dataDelete);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putLessonAPI: async (req, res) => {
    const data = req.body;
    let result = await updateLesson(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
