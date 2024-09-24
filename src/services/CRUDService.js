const connection = require("../config/database");
const { use } = require("../routes/web");
const getAllUser = async () => {
  const [results, fields] = await connection.query("select * from Users u ");
  return results;
};
const getUserById = async (userId) => {
  const [results, fields] = await connection.query(
    `select * from Users u where id = ?`,
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};
  return user;
};
const updateUserById = async (email, name, city, userId) => {
  const [results, fields] = await connection.query(
    `update Users SET name = ?, email = ?, city = ? WHERE  id  = ?`,
    [email, name, city, userId]
  );
};
module.exports = {
  getAllUser,
  getUserById,
  updateUserById,
};
