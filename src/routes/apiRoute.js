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
const {
  getReviewAPI,
  postReviewAPI,
  deleteReviewAPI,
  putReviewAPI,
} = require("../controllers/reviewController");
const { getUser } = require("../controllers/firebase/userController");
// Route để lấy tất cả người dùng

// Routes cho Courses
routerAPI.get("/api/courses", getCoursesAPI);
routerAPI.post("/api/courses", postCoursesAPI);
routerAPI.delete("/api/courses", deleteCoursesAPI);
routerAPI.put("/api/courses", putCoursesAPI);

// Routes cho Blog
routerAPI.get("/api/blog", getBlogAPI);
routerAPI.post("/api/blog", postBlogAPI);
routerAPI.delete("/api/blog", deleteBlogAPI);
routerAPI.put("/api/blog/:id", putBlogAPI);

// Routes cho Review
routerAPI.get("/api/review", getReviewAPI);
routerAPI.post("/api/review", postReviewAPI);
routerAPI.delete("/api/review", deleteReviewAPI);
routerAPI.put("/api/review/:id", putReviewAPI);

//
routerAPI.get("/api/firebase/users", getUser);
routerAPI.get("/api/users", getUserAPI);
routerAPI.put("/api/users/:_id", putUserAPI);

// routerAPI.put("/api/firebase/users/:id", putUser);
routerAPI.get("/api/exercise", getExercisesAPI);
routerAPI.post("/api/exercise", postExerciseAPI);

module.exports = routerAPI;
