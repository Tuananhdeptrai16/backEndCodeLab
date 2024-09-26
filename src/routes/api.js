const express = require("express");
const routerAPI = express.Router();
const { getUsersApi } = require("../controllers/apiController");
routerAPI.get("/", (req, res) => {
  res.send("Hello World with apis");
});
routerAPI.get("/abc", (req, res) => {
  res.status(200).json({
    data: "Hello word with tuananh ",
  });
});
routerAPI.get("/users", getUsersApi);

module.exports = routerAPI;
