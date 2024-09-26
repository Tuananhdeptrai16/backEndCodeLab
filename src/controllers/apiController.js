const Users = require("../models/user");
const getUsersApi = async (req, res) => {
  let results = await Users.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};
module.exports = { getUsersApi };
