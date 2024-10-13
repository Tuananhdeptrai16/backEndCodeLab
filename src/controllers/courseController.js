const {
  getCourses,
  createCourses,
  deleteCourses,
  updateCourses,
} = require("../services/coursesServices");
module.exports = {
  getCoursesAPI: async (req, res) => {
    try {
      let result = await getCourses(req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        EC: 1,
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
  deleteCoursesAPI: async (req, res) => {
    const id = req.body;
    let result = await deleteCourses(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putCoursesAPI: async (req, res) => {
    const data = req.body;
    let result = await updateCourses(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
