const express = require("express"); // comon node
const path = require("path");
require("dotenv").config();

// import express from express // es modules
const app = express(); // khai baos
const port = process.env.PORT; /// port
const hostname = process.env.HOST_NAME || 8888;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// config static file
app.use(express.static(path.join(__dirname, "public")));
//khai bao route
app.get("/", (req, res) => {
  res.send("Hello World! nodemon");
});
app.get("/abc", (req, res) => {
  res.send("<h1>Xin chao toi la tuan anh</h1>");
});
app.get("/tuananh", (req, res) => {
  res.render("sample.ejs/");
});
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
