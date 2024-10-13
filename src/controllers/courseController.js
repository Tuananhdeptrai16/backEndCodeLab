const {
  getCourses,
  createCourses,
  deleteCourses,
  updateCourses,
  deleteManyCourses,
} = require("../services/coursesServices");
const { validateCourse } = require("../validation/coursesValidion");
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
    try {
      let coursesData = req.body;
      const { error } = validateCourse(coursesData);
      if (error) {
        return res.status(400).json({
          status: "error", // Trạng thái lỗi
          message: error.details[0].message, // Thông báo lỗi cụ thể
          details: error.details, // (Tùy chọn) Thông tin chi tiết hơn về lỗi
        });
      }
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
  deleteManyCoursesAPI: async (req, res) => {
    let result = await deleteManyCourses(req.body.dataDelete);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putCoursesAPI: async (req, res) => {
    const data = req.body;
    const { error } = validateCourse(data);
    if (error) {
      return res.status(400).json({
        status: "error", // Trạng thái lỗi
        message: error.details[0].message, // Thông báo lỗi cụ thể
        details: error.details, // (Tùy chọn) Thông tin chi tiết hơn về lỗi
      });
    }
    let result = await updateCourses(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
