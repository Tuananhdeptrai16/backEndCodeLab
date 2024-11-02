const Products = require("../models/product");
const aqp = require("api-query-params");

module.exports = {
  createProduct: async (productData) => {
    try {
      if (productData.type === "EMPTY_PRODUCT") {
        let result = await Products.create(productData);
        return result;
      }
      if (productData.type === "ADD_COMMENT_USERS") {
        let myProduct = await Products.findById(productData.ProductId).exec();
        myProduct.comments.push({
          userId: productData.userId,
          comment: productData.comment || "",
        });

        let result1 = await myProduct.save();
        return result1;
      }
      if (productData.type === "REMOVE_ALL_COMMENT_USERS") {
        let myProduct = await Products.findById(productData.ProductId).exec();
        myProduct.comments = myProduct.comments.filter(
          (comment) => comment.userId.toString() !== productData.userId
        );

        let result1 = await myProduct.save();
        return result1;
      }
      console.log("Check Product data", productData);
      if (productData.type === "REMOVE_COMMENT") {
        let myProduct = await Products.findById(productData.ProductId).exec();

        // Xóa bình luận của người dùng
        const commentIndex = myProduct.comments.findIndex(
          (comment) => comment._id.toString() === productData.commentId
        );
        // Nếu tìm thấy bình luận, xóa nó
        if (commentIndex !== -1) {
          myProduct.comments.splice(commentIndex, 1);
          let result2 = await myProduct.save();
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
  getProductById: async (id) => {
    let result = await Products.findById(id);
    return result;
  },
  getProduct: async (queryString) => {
    const page = queryString.page;
    const { filter, limit } = aqp(queryString);
    delete filter.page;
    let offset = (page - 1) * limit;

    let result = Products.find(filter)
      .populate({
        path: "comments.userId", // Tên trường trong schema
        select: "data.email data.photoURL", // Chọn trường nào từ model Users
      })
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  },
  deleteProduct: async (_id) => {
    let result = await Products.deleteById(_id);
    return result;
  },
  deleteManyProduct: async (dataDelete) => {
    console.log(">>>>>>Check data delete", dataDelete);
    try {
      let results = await Products.deleteMany(dataDelete);
      if (results.deletedCount === 0) {
        console.log("No Products were deleted.");
      } else {
        console.log(`${results.deletedCount} Products were deleted.`);
      }

      return results;
    } catch (error) {
      console.log("Error deleting Products:", error);
      throw new Error("Failed to delete Products");
    }
  },
  updateProduct: async (data) => {
    let result = await Products.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
