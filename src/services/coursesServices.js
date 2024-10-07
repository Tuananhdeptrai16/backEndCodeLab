const Courses = require("../models/courses");
const aqp = require("api-query-params");

module.exports = {
  getCourses: async (limit, page, queryString) => {
    try {
      let result = null;
      if (limit && page) {
        const { filter } = aqp(queryString);
        delete filter.page;
        let offset = (page - 1) * limit;
        result = await Courses.find(filter).skip(offset).limit(limit).exec();
      } else {
        result = await Courses.find({});
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  createCourses: async (coursesData) => {
    try {
      const result = await Courses.create({
        title: coursesData.title,
        background: coursesData.background,
        author: coursesData.author,
        description: coursesData.description,
        category: coursesData.category,
        price: coursesData.price,
        duration: coursesData.duration,
        level: coursesData.level,
        lessons: coursesData.lessons,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCourses: async (courseId) => {
    try {
      let result = await Courses.deleteById(courseId);
      return result;
    } catch (error) {}
  },
  updateCourses: async (id, dataUpdateCourses) => {
    try {
      const updatedCourse = await Courses.findByIdAndUpdate(
        id,
        {
          title: dataUpdateCourses.title,
          author: dataUpdateCourses.author,
          background: dataUpdateCourses.background,
          description: dataUpdateCourses.description,
          category: dataUpdateCourses.category,
          price: dataUpdateCourses.price,
          duration: dataUpdateCourses.duration,
          level: dataUpdateCourses.level,
          updatedAt: Date.now(),
        },
        { new: true, runValidators: true }
      );

      if (!updatedCourse) {
        return null; // Trả về null để controller xử lý
      }

      // Cập nhật nội dung nếu tồn tại
      if (dataUpdateCourses.content && dataUpdateCourses.content.length > 0) {
        updatedCourse.content = dataUpdateCourses.content;
        await updatedCourse.save(); // Lưu thay đổi
      }

      return updatedCourse;
    } catch (error) {
      console.log(error);
      throw error; // Ném lỗi để controller bắt
    }
  },
};
