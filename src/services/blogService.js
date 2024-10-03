const Blogs = require("../models/blog");

module.exports = {
  getBlog: async () => {
    try {
      const results = await Blogs.find({});
      return results;
    } catch (error) {
      console.log(error);
    }
  },
  deleteBlog: async (blogIdTarget) => {
    try {
      let result = await Blogs.deleteOne({ _id: blogIdTarget });
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  createBlog: async (blogData) => {
    try {
      const result = await Blogs.create({
        title: blogData.title,
        description: blogData.description,
        duration: blogData.duration,
        author: blogData.author,
        urlImage: blogData.urlImage,
        blogItems: blogData.blogItems,
        rating: blogData.rating,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  updateBlog: async (id, dataBlogUpdate) => {
    try {
      // Tìm blog dựa trên id và cập nhật các trường
      const updatedBlog = await Blogs.findByIdAndUpdate(
        id,
        {
          title: dataBlogUpdate.title,
          description: dataBlogUpdate.description,
          duration: dataBlogUpdate.duration,
          author: dataBlogUpdate.author,
          urlImage: dataBlogUpdate.urlImage,
          rating: dataBlogUpdate.rating,
          updatedAt: Date.now(), // Cập nhật thời gian
        },
        { new: true, runValidators: true }
      );

      if (!updatedBlog) {
        return null; // Nếu blog không tìm thấy, trả về null
      }

      // Nếu có blogItems trong `dataBlogUpdate`, cập nhật thêm
      if (dataBlogUpdate.blogItems && dataBlogUpdate.blogItems.length > 0) {
        updatedBlog.blogItems = dataBlogUpdate.blogItems;
        await updatedBlog.save(); // Lưu lại thay đổi
      }

      return updatedBlog;
    } catch (error) {
      console.error(error);
      throw error; // Ném lỗi để controller xử lý
    }
  },
};
