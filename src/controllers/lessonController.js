const {
  getLesson,
  deleteLesson,
  createLesson,
  updateLesson,
  deleteManyLesson,
} = require("../services/lessonService");
const Courses = require("../models/courses");

module.exports = {
  //Lesson
  postLessonAPI: async (req, res) => {
    try {
      const dataLessons = req.body;
      let savedLesson = await createLesson(dataLessons);
      const courseId = req.body.courseId;
      const updatedCourse = await Courses.findByIdAndUpdate(
        courseId,
        { $push: { lessonInfo: savedLesson._id } },
        { new: true }
      );
      res
        .status(200)
        .json({ EC: 0, lesson: savedLesson, course: updatedCourse });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getLessonAPI: async (req, res) => {
    let result = await getLesson(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteLessonAPI: async (req, res) => {
    try {
      const lessonId = req.body.lessonId;
      const courseId = req.body.courseId;
      await deleteLesson(lessonId);
      const updatedCourse = await Courses.findByIdAndUpdate(
        courseId,
        { $pull: { lessonInfo: lessonId } },
        { new: true }
      );
      res.status(200).json({
        EC: 0,
        course: updatedCourse,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
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
