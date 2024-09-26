const connection = require("../config/database");
const { use } = require("../routes/web");
const {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserId,
} = require("../services/CRUDService");
const Users = require("../models/user");
const getHomePage = async (req, res) => {
  let results = await Users.find({});
  return res.render("home.ejs", { listUser: results });
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await Users.findById(userId).exec();
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

  await Users.create({
    email,
    name,
    city,
  });
  res.send("Create user success");
};
const postUpdateUser = async (req, res) => {
  let { userId, email, name, city } = req.body;
  await Users.updateOne({ _id: userId }, { name, email, city });
  res.redirect("/");
};
const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  let user = await Users.findById(userId).exec();
  res.render("delete.ejs", { userId: user });
};
const postHandleDeleteUser = async (req, res) => {
  const userId = req.body.userId;
  Users.deleteOne({ _id: userId }, function (err) {
    if (err) return console.log(err);
  });
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
