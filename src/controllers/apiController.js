const { text } = require("express");
const Courses = require("../models/courses");
const Lesson = require("../models/lesson"); // Đảm bảo bạn đã import model Lesson

const getCoursesAPI = async (req, res) => {
  try {
    const results = await Courses.find({});
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  } catch (err) {
    console.error(err); // Ghi lại lỗi nếu có
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};

const postCoursesAPI = async (req, res) => {
  const { title, description, category, price, duration, level, lessons } =
    req.body;

  try {
    const course = await Courses.create({
      title,
      description,
      category,
      price,
      duration,
      level,
      content: lessons,
    });

    return res.status(201).json({
      errorCode: 0,
      data: course,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      errorCode: 1,
      message: "Có lỗi xảy ra khi tạo khóa học.",
    });
  }
};

const deleteCoursesAPI = async (req, res) => {
  const courseId = req.body._id;
  let result = await Courses.deleteOne({ _id: courseId });
  return res.status(200).json({
    errorCode: 0,
    data: result,
  });
};
const putCoursesAPI = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, price, duration, level, content } =
    req.body;

  try {
    const updatedCourse = await Courses.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        price,
        duration,
        level,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ errorCode: 1, message: "Course not found" });
    }

    if (content && content.length > 0) {
      updatedCourse.content = content; // Cập nhật nội dung
      await updatedCourse.save(); // Lưu lại thay đổi
    }

    return res.status(200).json({ errorCode: 0, data: updatedCourse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorCode: 1, message: err.message });
  }
};

// Xuất các API
module.exports = {
  getCoursesAPI,
  postCoursesAPI,
  deleteCoursesAPI,
  putCoursesAPI,
};
