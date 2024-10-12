const Courses = require("../models/courses");
const aqp = require("api-query-params");

module.exports = {
  getCourses: async (limit, page, queryString) => {},
  createCourses: async (coursesData) => {
    try {
      if (coursesData.type === "ADD-LESSON") {
        const result = await Courses.create(coursesData);
        return result;
      }

      if (coursesData.type === "ADD") {
        console.log("Check coursesData._idcourse:", coursesData._idcourse);

        // Tìm khóa học dựa trên ID của khóa học
        let myLesson = await Courses.findById(coursesData._idcourse).exec();

        if (!myLesson) {
          console.log("Khóa học không tồn tại với ID:", coursesData._idcourse);
          return null; // Trả về null nếu không tìm thấy khóa học
        }

        console.log("Found myLesson:", myLesson);

        // Kiểm tra nếu arrLessons tồn tại và có nội dung
        if (coursesData.arrLessons && coursesData.arrLessons.length > 0) {
          for (let i = 0; i < coursesData.arrLessons.length; i++) {
            // Thêm bài học vào khóa học
            myLesson.Lessons.push(coursesData.arrLessons[i]);
          }
          console.log("Updated lessons for the course:", myLesson);

          // Lưu lại khóa học sau khi cập nhật
          let result1 = await myLesson.save();
          return result1;
        } else {
          console.log("Không có bài học để thêm");
          return null;
        }
      }

      return null;
    } catch (error) {
      console.log("Lỗi trong createCourses:", error);
      throw error; // Ném lỗi để controller bắt
    }
  },

  deleteCourses: async (courseId) => {},
  updateCourses: async (id, dataUpdateCourses) => {},
};
