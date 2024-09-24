const connection = require("../config/database");
const getAllUser = async () => {
  const [results, fields] = await connection.query("select * from Users u ");
  return results;
};
module.exports = {
  getAllUser,
};
