const Courses = require("../models/courses");
const Blogs = require("../models/blog");
const Users = require("../models/user");
//courses
const getCoursesAPI = async (req, res) => {
  try {
    const results = await Courses.find({});
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
  const {
    title,
    author,
    description,
    category,
    price,
    duration,
    level,
    lessons,
  } = req.body;

  try {
    const course = await Courses.create({
      title,
      author,
      description,
      category,
      price,
      duration,
      level,
      lessons,
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
  const {
    title,
    author,
    description,
    category,
    price,
    duration,
    level,
    content,
  } = req.body;

  try {
    const updatedCourse = await Courses.findByIdAndUpdate(
      id,
      {
        title,
        author,
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
//blog
const getBlogAPI = async (req, res) => {
  try {
    const results = await Blogs.find({});
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  } catch {
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};
const deleteBlogAPI = async (req, res) => {
  const blogId = req.body._id; // Lấy ID từ body
  console.log("Blog ID to delete:", blogId); // Kiểm tra ID
  try {
    const result = await Blogs.deleteOne({ _id: blogId }); // Xóa blog theo ID
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorCode: 1, message: err.message });
  }
};
const postBlogAPI = async (req, res) => {
  const { title, description, duration, level, owner, blogItems } = req.body;
  try {
    const blog = await Blogs.create({
      title,
      description,
      duration,
      level,
      owner,
      blogItems,
    });
    return res.status(200).json({
      errorCode: 0,
      data: blog,
    });
  } catch {
    console.error(err);
    return res.status(500).json({
      errorCode: 1,
      message: "Có lỗi xảy ra khi tạo khóa học.",
    });
  }
};
const putBlogAPI = async (req, res) => {
  const { _id, title, description, duration, level, owner, blogItems } =
    req.body;
  try {
    const updatedBlog = await Blogs.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        duration,
        level,
        owner,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ errorCode: 1, message: "Blog not found" });
    }

    if (blogItems && blogItems.length > 0) {
      updatedBlog.blogItems = blogItems; // Cập nhật blogItems
      await updatedBlog.save(); // Lưu lại thay đổi
    }

    return res.status(200).json({ errorCode: 0, data: updatedBlog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorCode: 1, message: err.message });
  }
};
// User
const getUserAPI = async (req, res) => {
  console.log(">>getUserAPi");
  try {
    const results = await Users.find({});
    console.log(results);
    return res.status(200).json({
      errorCode: 0,
      data: results,
    });
  } catch {
    return res.status(500).json({
      errorCode: 1,
      message: err.message,
    });
  }
};
const putUserAPI = async (req, res) => {
  const { _id } = req.params;
  const { admin, course } = req.body;

  // Kiểm tra xem admin có phải là boolean không
  if (typeof admin !== "boolean") {
    return res
      .status(400)
      .json({ errorCode: 1, message: "Admin must be a boolean value" });
  }

  try {
    const updateAdmin = await Users.findByIdAndUpdate(
      _id,
      {
        admin,
        course,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updateAdmin) {
      return res.status(404).json({ errorCode: 1, message: "Admin not found" });
    }
    if (course && course.length > 0) {
      updateAdmin.course = course; // Cập nhật nội dung
      await updateAdmin.save(); // Lưu lại thay đổi
    }
    return res.status(200).json({
      errorCode: 0,
      message: "Admin updated successfully",
      data: updateAdmin,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      errorCode: 1,
      message: "An error occurred while updating admin: " + err.message,
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
