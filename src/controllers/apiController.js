const {
  getCourses,
  createCourses,
  deleteCourses,
  updateCourses,
} = require("../services/coursesServices");
const {
  getBlog,
  deleteBlog,
  createBlog,
  updateBlog,
} = require("../services/blogService");
const { getUsers, updateUser } = require("../services/userService");
//courses
const getCoursesAPI = async (req, res) => {
  try {
    const results = await getCourses();
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};
const postCoursesAPI = async (req, res) => {
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
};
const deleteCoursesAPI = async (req, res) => {
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
};
const putCoursesAPI = async (req, res) => {
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
};

//blog
const getBlogAPI = async (req, res) => {
  try {
    let result = await getBlog();
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch {
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};
const deleteBlogAPI = async (req, res) => {
  const blogIdTarget = req.body._id;
  try {
    let result = await deleteBlog(blogIdTarget);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: 1,
      data: null,
    });
  }
};
const postBlogAPI = async (req, res) => {
  const blogData = ({
    title,
    description,
    duration,
    author,
    urlImage,
    blogItems,
    rating,
  } = req.body);
  try {
    let result = await createBlog(blogData);
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
};
const putBlogAPI = async (req, res) => {
  const { id } = req.params;
  const dataBlogUpdate = {
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration,
    author: req.body.author,
    urlImage: req.body.urlImage,
    blogItems: req.body.blogItems,
    rating: req.body.rating,
  };

  console.log(">>check before", id, dataBlogUpdate);
  try {
    // Gọi hàm updateBlog thay vì updateCourses
    let updatedBlog = await updateBlog(id, dataBlogUpdate);

    if (!updatedBlog) {
      return res.status(404).json({ errorCode: 1, message: "Blog not found" });
    }

    return res.status(200).json({ errorCode: 0, data: updatedBlog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorCode: 1, message: err.message });
  }
};

// User
const getUserAPI = async (req, res) => {
  try {
    const results = await getUsers(); // Gọi hàm getUsers từ service
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};

// Cập nhật admin và course của user
const putUserAPI = async (req, res) => {
  const { _id } = req.params;
  const { admin, course } = req.body;

  try {
    const updatedUser = await updateUser(_id, { admin, course }); // Gọi hàm updateUser từ service
    return res.status(200).json({
      errorCode: 0,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};

// Xuất các API
module.exports = {
  getCoursesAPI,
  postCoursesAPI,
  deleteCoursesAPI,
  putCoursesAPI,
  getBlogAPI,
  deleteBlogAPI,
  postBlogAPI,
  putBlogAPI,
  getUserAPI,
  putUserAPI,
};
