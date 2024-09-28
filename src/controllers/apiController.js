const Courses = require("../models/courses");

const getCoursesAPI = async (req, res) => {
  let results = await Courses.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCoursesAPI = async (req, res) => {
  const { instructorId, title, description, category, price, duration, level } =
    req.body;

  try {
    let courses = await Courses.create({
      instructorId,
      title,
      description,
      category,
      price,
      duration,
      level,
    });
    console.log(courses);
    return res.status(200).json({
      errorCode: 0,
      data: courses,
    });
  } catch (err) {
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};

//post course api

module.exports = {
  getCoursesAPI,
  postCoursesAPI,
};
