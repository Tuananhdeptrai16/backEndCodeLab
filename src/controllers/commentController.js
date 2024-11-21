const {
  getComments,
  postComments,
  deleteComments,
  putComments,
} = require("../services/commentService");
module.exports = {
  getCommentsAPI: async (req, res) => {
    try {
      let result = await getComments();
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
  postCommentsAPI: async (req, res) => {
    try {
      let data = req.body;
      let result = await postComments(data);
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
  deleteCommentsAPI: async (req, res) => {
    const id = req.body;
    let result = await deleteComments(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putCommentsAPI: async (req, res) => {
    const data = req.body;
    let result = await putComments(data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
