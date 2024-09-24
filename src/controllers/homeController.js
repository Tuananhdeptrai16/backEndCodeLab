const connection = require("../config/database");
const {
  getAllUser,
  getUserById,
  updateUserById,
} = require("../services/CRUDService");
const getHomePage = async (req, res) => {
  let results = await getAllUser();
  return res.render("home.ejs", { listUser: results });
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  console.log(user);
  return res.render("edit.ejs", { userEdit: user });
};
const getABC = (req, res) => {
  res.send("<h1>Xin chao toi la tuan anh</h1>");
};
const getCreatePage = (req, res) => {
  return res.render("create.ejs");
};
const getViewEngine = (req, res) => {
  res.render("sample.ejs/");
};
const postCreateNewUser = async (req, res) => {
  let { email, name, city } = req.body;
  const [results, fields] = await connection.query(
    ` INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
    [email, name, city]
  );
  res.send("Create user success");
};
const postUpdateUser = async (req, res) => {
  let { userId, email, name, city } = req.body;
  await updateUserById(email, name, city, userId);
  res.redirect("/");
};
module.exports = {
  getHomePage,
  getABC,
  getViewEngine,
  postCreateNewUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
};
