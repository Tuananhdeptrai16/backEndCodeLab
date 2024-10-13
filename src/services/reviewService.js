const Reviews = require("../models/reviews");
module.exports = {
  getReview: async () => {
    let result = Reviews.find({}).populate({
      path: "userInfo", // Tên trường trong schema
      select: "data.email data.photoURL", // Chọn trường nào từ model Users
    });
    return result;
  },
  postReview: async (data) => {
    try {
      if (data.type === "EMPTY_REVIEW") {
        let result = await Reviews.create(data);
        return result;
      }
      if (data.type === "ADD_USER") {
        let myReview = await Reviews.findById(data.reviewId).exec();
        for (let i = 0; i < data.usersArr.length; i++) {
          myReview.userInfo.push(data.usersArr[i]);
        }
        let result1 = await myReview.save();
        return result1;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteReview: async (id) => {
    let result = await Reviews.deleteById(id);
    return result;
  },
  putReview: async (data) => {
    let result = await Reviews.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
