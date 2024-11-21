const Comments = require("../models/comment");
module.exports = {
  getComments: async () => {
    let result = Comments.find({});
    return result;
  },
  postComments: async (data) => {
    try {
      let result = await Comments.create(data);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteComments: async (id) => {
    let result = await Comments.deleteById(id);
    return result;
  },
  putComments: async (data) => {
    let result = await Comments.updateOne({ _id: data.id }, { ...data });
    return result;
  },
};
