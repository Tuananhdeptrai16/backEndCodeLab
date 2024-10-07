const {
  getCourses,
  createCourses,
  deleteCourses,
  updateCourses,
} = require("../services/coursesServices");
const aqp = require("api-query-params");
module.exports = {
  getCoursesAPI: async (req, res) => {
    try {
      let limit = req.query.limit;
      let page = req.query.page;
      let result = null;
      if (limit && page) {
        result = await getCourses(limit, page, req.query);
      } else {
        result = await getCourses();
      }
      return res.status(200).json({
        errorCode: 0,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        errorCode: 1,
        message: err.message,
      });
    }
  },
  postCoursesAPI: async (req, res) => {
    let coursesData = ({
      title,
      background,
      author,
      description,
      category,
      price,
      duration,
      level,
      lessons,
    } = req.body);

    try {
      let result = await createCourses(coursesData);
      return res.status(201).json({
        errorCode: 0,
        data: result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        errorCode: 1,
        message: "Có lỗi xảy ra khi tạo khóa học.",
      });
    }
  },
  deleteCoursesAPI: async (req, res) => {
    try {
      const courseId = req.body._id;
      let result = await deleteCourses(courseId);
      return res.status(200).json({
        errorCode: 0,
        data: result,
      });
    } catch (error) {
      return res.status(404).json({
        errorCode: 0,
        data: null,
      });
    }
  },
  putCoursesAPI: async (req, res) => {
    const { id } = req.params;
    const dataUpdateCourses = {
      title: req.body.title,
      background: req.body.background,
      author: req.body.author,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      duration: req.body.duration,
      level: req.body.level,
      content: req.body.content, // Thêm content vào đây
    };

    try {
      let updatedCourse = await updateCourses(id, dataUpdateCourses);

      if (!updatedCourse) {
        return res
          .status(404)
          .json({ errorCode: 1, message: "Course not found" });
      }

      return res.status(200).json({ errorCode: 0, data: updatedCourse });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errorCode: 1, message: err.message });
    }
  },
};
