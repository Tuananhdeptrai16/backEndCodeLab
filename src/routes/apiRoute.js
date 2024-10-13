const express = require("express");
const admin = require("../config/firebase"); // Đường dẫn đến firebaseAdmin.js
const routerAPI = express.Router();
const { getUserAPI, putUserAPI } = require("../controllers/userController");

const {
  getBlogAPI,
  postBlogAPI,
  deleteBlogAPI,
  deleteManyBlogAPI,
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
const {
  getQuizAPI,
  postQuizAPI,
  deleteQuizAPI,
  putQuizAPI,
} = require("../controllers/quizController");
const {
  postLessonAPI,
  getLessonAPI,
  deleteLessonAPI,
  deleteManyLessonAPI,
  putLessonAPI,
} = require("../controllers/lessonController");
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
routerAPI.delete("/api/manyblog", deleteManyBlogAPI);
routerAPI.put("/api/blog", putBlogAPI);

// Routes cho Review
routerAPI.get("/api/review", getReviewAPI);
routerAPI.post("/api/review", postReviewAPI);
routerAPI.delete("/api/review", deleteReviewAPI);
routerAPI.put("/api/review", putReviewAPI);

//route Quiz
routerAPI.get("/api/quiz", getQuizAPI);
routerAPI.post("/api/quiz", postQuizAPI);
routerAPI.delete("/api/quiz", deleteQuizAPI);
routerAPI.put("/api/quiz", putQuizAPI);

//Routes Lesson
routerAPI.get("/api/lesson", getLessonAPI);
routerAPI.post("/api/lesson", postLessonAPI);
routerAPI.delete("/api/lesson", deleteLessonAPI);
routerAPI.delete("/api/manylesson", deleteManyLessonAPI);
routerAPI.put("/api/lesson", putLessonAPI);

// routerAPI.put("/api/review", putReviewAPI);
routerAPI.get("/api/firebase/users", getUser);
routerAPI.get("/api/users", getUserAPI);
routerAPI.put("/api/users/:_id", putUserAPI);

module.exports = routerAPI;
