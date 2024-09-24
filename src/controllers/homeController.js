const connection = require("../config/database");
const { use } = require("../routes/web");
const {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserId,
} = require("../services/CRUDService");
const getHomePage = async (req, res) => {
  let results = await getAllUser();
  return res.render("home.ejs", { listUser: results });
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
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
const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("delete.ejs", { userId: user });
};
const postHandleDeleteUser = async (req, res) => {
  const userId = req.body.userId;
  await deleteUserId(userId);
  res.send("OK delete");
};
module.exports = {
  getHomePage,
  getABC,
  getViewEngine,
  postCreateNewUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleDeleteUser,
};
