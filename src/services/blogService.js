const Blogs = require("../models/blog");
const aqp = require("api-query-params");

module.exports = {
  createBlog: async (BlogData) => {
    try {
      if (BlogData.type === "EMPTY_BLOG") {
        let result = await Blogs.create(BlogData);
        return result;
      }
      if (BlogData.type === "ADD_COMMENT_USERS") {
        let myBlog = await Blogs.findById(BlogData.blogId).exec();
        console.log("Check my Blog", myBlog);
        // Thêm bình luận mới vào bài học
        myBlog.comments.push({
          userId: BlogData.userId, // ID người dùng
          comment: BlogData.comment || "", // Thêm bình luận nếu có
        });

        let result1 = await myBlog.save();
        return result1;
      }
      if (BlogData.type === "REMOVE_ALL_COMMENT_USERS") {
        let myBlog = await Blogs.findById(BlogData.blogId).exec();
        myBlog.comments = myBlog.comments.filter(
          (comment) => comment.userId.toString() !== BlogData.userId
        );

        let result1 = await myBlog.save();
        return result1;
      }
      console.log("Check blog data", BlogData);
      if (BlogData.type === "REMOVE_COMMENT") {
        let myBlog = await Blogs.findById(BlogData.blogId).exec();

        // Xóa bình luận của người dùng
        const commentIndex = myBlog.comments.findIndex(
          (comment) => comment._id.toString() === BlogData.commentId
        );
        // Nếu tìm thấy bình luận, xóa nó
        if (commentIndex !== -1) {
          myBlog.comments.splice(commentIndex, 1);
          let result2 = await myBlog.save();
          return result2;
        } else {
          // Trả về thông báo hoặc xử lý khi không tìm thấy bình luận
          return { message: "Comment not found." };
        }
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  },
  getBlogById: async (id) => {
    let result = await Blogs.findById(id);
    return result;
  },
  getBlog: async (queryString) => {
    const page = queryString.page;
    const { filter, limit } = aqp(queryString);
    delete filter.page;
    let offset = (page - 1) * limit;

    let result = Blogs.find(filter)
      .populate({
        path: "comments.userId", // Tên trường trong schema
        select: "data.email data.photoURL", // Chọn trường nào từ model Users
      })
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  },
  deleteBlog: async (_id) => {
    let result = await Blogs.deleteById(_id);
    return result;
  },
  deleteManyBlog: async (dataDelete) => {
    console.log(">>>>>>Check data delete", dataDelete);
    try {
      let results = await Blogs.deleteMany(dataDelete);
      if (results.deletedCount === 0) {
        console.log("No Blogs were deleted.");
      } else {
        console.log(`${results.deletedCount} Blogs were deleted.`);
      }

      return results;
    } catch (error) {
      console.log("Error deleting Blogs:", error);
      throw new Error("Failed to delete Blogs");
    }
  },
  updateBlog: async (data) => {
    let result = await Blogs.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
