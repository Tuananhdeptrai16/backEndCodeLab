const express = require("express");
const router = express.Router();
//khai bao route
router.get("/", (req, res) => {
  res.send("Hello World! nodemon");
});
router.get("/abc", (req, res) => {
  res.send("<h1>Xin chao toi la tuan anh</h1>");
});
router.get("/tuananh", (req, res) => {
  res.render("sample.ejs/");
});
module.exports = router;
