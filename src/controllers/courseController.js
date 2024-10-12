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
    let coursesData = req.body;
    console.log(">>coursesData", coursesData);
    try {
      let result = await createCourses(coursesData);
      return res.status(201).json({
        EC: 0,
        data: result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        EC: 1,
        message: "Có lỗi xảy ra khi tạo khóa học.",
      });
    }
  },
  deleteCoursesAPI: async (req, res) => {},
  putCoursesAPI: async (req, res) => {},
};
