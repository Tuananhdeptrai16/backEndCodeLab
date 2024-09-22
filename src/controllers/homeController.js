const getHomePage = (req, res) => {
  res.send("Hello World! nodemon");
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
