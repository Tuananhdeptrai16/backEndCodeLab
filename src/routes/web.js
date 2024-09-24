const express = require("express");
const {
  getHomePage,
  getABC,
  getViewEngine,
  postCreateNewUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
} = require("../controllers/homeController");
const router = express.Router();
//khai bao route
// router.Method('route', 'handle
router.get("/", getHomePage);
router.get("/abc", getABC);
router.get("/tuananh", getViewEngine);
router.get("/create", getCreatePage);
router.get("/update/:id", getUpdatePage);
router.post("/create-user", postCreateNewUser);
router.post("/update-user", postUpdateUser);

module.exports = router;
