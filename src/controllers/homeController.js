const connection = require("../config/database");
const getHomePage = (req, res) => {
  let users = [];
  //call modal
  connection.query("select * from Users u", function (err, results, fields) {
    users = results;
    console.log(">>> results ==", results); // results contains rows returned by server
    console.log(">>check user", users);
    res.send(JSON.stringify(users));
  });
};
const getABC = (req, res) => {
  res.send("<h1>Xin chao toi la tuan anh</h1>");
};
const getViewEngine = (req, res) => {
  res.render("sample.ejs/");
};
module.exports = {
  getHomePage,
  getABC,
  getViewEngine,
};
