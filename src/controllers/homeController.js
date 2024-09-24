const connection = require("../config/database");
const { getAllUser } = require("../services/CRUDService");
const getHomePage = async (req, res) => {
  let results = await getAllUser();
  return res.render("home.ejs", { listUser: results });
};
const getUpdatePage = async (req, res) => {
  console.log(req.params);
  const userId = req.params.id;
  const [results, fields] = await connection.query(
    `select * from Users u where id = ?`,
    [userId]
  );
  let user = results && results.length > 0 ? results[0] : {};
  console.log(">>>result", results);
  console.log(">>>>fields", fields);
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
  // connection.query(
  //   ` INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
  //   [email, name, city],
  //   function (err, results) {
  //     console.log(results);
  //     res.send("Create user success");
  //   }
  // );
  const [results, fields] = await connection.query(
    ` INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
    [email, name, city]
  );
  res.send("Create user success");
};
module.exports = {
  getHomePage,
  getABC,
  getViewEngine,
  postCreateNewUser,
  getCreatePage,
  getUpdatePage,
};
