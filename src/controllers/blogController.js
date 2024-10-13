const {
  getBlog,
  deleteBlog,
  createBlog,
  updateBlog,
  deleteManyBlog,
} = require("../services/blogService");

module.exports = {
  //Blog
  postBlogAPI: async (req, res) => {
    const dataBlogs = req.body;
    let result = await createBlog(dataBlogs);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  getBlogAPI: async (req, res) => {
    let result = await getBlog(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteBlogAPI: async (req, res) => {
    const _id = req.body;
    let result = await deleteBlog(_id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteManyBlogAPI: async (req, res) => {
    let result = await deleteManyBlog(req.body.dataDelete);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putBlogAPI: async (req, res) => {
    const data = req.body;
    let result = await updateBlog(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
