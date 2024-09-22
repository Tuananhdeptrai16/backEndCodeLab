const express = require("express");
const {
  getHomePage,
  getABC,
  getViewEngine,
  postCreateNewUser,
} = require("../controllers/homeController");
const router = express.Router();
//khai bao route
// router.Method('route', 'handle
router.get("/", getHomePage);
router.get("/abc", getABC);
router.get("/tuananh", getViewEngine);
router.post("/create-user", postCreateNewUser);

module.exports = router;
