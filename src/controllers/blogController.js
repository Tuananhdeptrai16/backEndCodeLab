const {
  getBlog,
  deleteBlog,
  createBlog,
  updateBlog,
} = require("../services/blogService");

module.exports = {
  //blog
  getBlogAPI: async (req, res) => {
    try {
      let limit = req.query.limit;
      let page = req.query.page;
      let results = null;
      if (limit && page) {
        results = await getBlog(limit, page);
      } else {
        results = await getBlog();
      }
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
  },
  deleteBlogAPI: async (req, res) => {
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
  },
  postBlogAPI: async (req, res) => {
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
  },
  putBlogAPI: async (req, res) => {
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

    try {
      // Gọi hàm updateBlog thay vì updateCourses
      let updatedBlog = await updateBlog(id, dataBlogUpdate);

      if (!updatedBlog) {
        return res
          .status(404)
          .json({ errorCode: 1, message: "Blog not found" });
      }

      return res.status(200).json({ errorCode: 0, data: updatedBlog });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errorCode: 1, message: err.message });
    }
  },
};
