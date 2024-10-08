const express = require("express");
const admin = require("../config/firebase"); // Đường dẫn đến firebaseAdmin.js
const routerAPI = express.Router();
const { getUserAPI, putUserAPI } = require("../controllers/userController");
const {
  getExercisesAPI,
  postExerciseAPI,
} = require("../controllers/exerciseController");
const {
  getBlogAPI,
  postBlogAPI,
  deleteBlogAPI,
  putBlogAPI,
} = require("../controllers/blogController");
const {
  postCoursesAPI,
  getCoursesAPI,
  deleteCoursesAPI,
  putCoursesAPI,
} = require("../controllers/courseController");
const { getUser } = require("../controllers/firebase/userController");
// Route để lấy tất cả người dùng

// Routes cho Courses
routerAPI.get("/api/courses", getCoursesAPI);
routerAPI.post("/api/courses", postCoursesAPI);
routerAPI.delete("/api/courses", deleteCoursesAPI);
routerAPI.put("/api/courses/:id", putCoursesAPI);

// Routes cho Blog
routerAPI.get("/api/blog", getBlogAPI);
routerAPI.post("/api/blog", postBlogAPI);
routerAPI.delete("/api/blog", deleteBlogAPI);
routerAPI.put("/api/blog/:id", putBlogAPI);

//
routerAPI.get("/api/firebase/users", getUser);
routerAPI.get("/api/users", getUserAPI);
routerAPI.put("/api/users/:_id", putUserAPI);

// routerAPI.put("/api/firebase/users/:id", putUser);
routerAPI.get("/api/exercise", getExercisesAPI);
routerAPI.post("/api/exercise", postExerciseAPI);

module.exports = routerAPI;
