const {
  getReview,
  postReview,
  deleteReview,
  putReview,
} = require("../services/reviewService");
module.exports = {
  getReviewAPI: async (req, res) => {
    try {
      let result = await getReview();
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: err.message,
      });
    }
  },
  postReviewAPI: async (req, res) => {
    try {
      let data = req.body;
      let result = await postReview(data);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EC: 1,
        message: err.message,
      });
    }
  },
  deleteReviewAPI: async (req, res) => {
    const id = req.body;
    let result = await deleteReview(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putReviewAPI: async (req, res) => {
    const data = req.body;
    let result = await putReview(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
