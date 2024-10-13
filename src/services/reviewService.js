const Reviews = require("../models/reviews");
module.exports = {
  getReview: async () => {
    let result = Reviews.find({});
    return result;
  },
  postReview: async (data) => {
    try {
      let result = await Reviews.create(data);
      return result;
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
