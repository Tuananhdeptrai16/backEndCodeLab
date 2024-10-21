const express = require("express");
const routerAPI = express.Router();

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
  deleteManyCoursesAPI,
} = require("../controllers/courseController");
const {
  getReviewAPI,
  postReviewAPI,
  deleteReviewAPI,
  putReviewAPI,
} = require("../controllers/reviewController");
const {
  getNotificationAPI,
  postNotificationAPI,
  deleteNotificationAPI,
  putNotificationAPI,
} = require("../controllers/notificationController");
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
const { getUserAPI, postUserAPI } = require("../controllers/userController");
const {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdminAPI,
  deleteAdminAPI,
  deleteManyAdminAPI,
} = require("../controllers/adminController");
// Routes cho admin
routerAPI.get("/api/admin", getAdmin);
routerAPI.get("/api/admins", getAdmins);
routerAPI.post("/api/admin", createAdmin);
routerAPI.delete("/api/admin", deleteAdminAPI);
routerAPI.put("/api/admin", updateAdminAPI);
routerAPI.delete("/api/many_admin", deleteManyAdminAPI);
// Routes cho Courses
routerAPI.get("/api/courses", getCoursesAPI);
routerAPI.post("/api/courses", postCoursesAPI);
routerAPI.delete("/api/courses", deleteCoursesAPI);
routerAPI.put("/api/courses", putCoursesAPI);
routerAPI.delete("/api/manycourses", deleteManyCoursesAPI);

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

// Routes cho Notification
routerAPI.get("/api/notification", getNotificationAPI);
routerAPI.post("/api/notification", postNotificationAPI);
routerAPI.delete("/api/notification", deleteNotificationAPI);
routerAPI.put("/api/notification", putNotificationAPI);
//Routes Lesson
routerAPI.get("/api/lesson", getLessonAPI);
routerAPI.post("/api/lesson", postLessonAPI);
routerAPI.delete("/api/lesson", deleteLessonAPI);
routerAPI.delete("/api/manylesson", deleteManyLessonAPI);
routerAPI.put("/api/lesson", putLessonAPI);

// routerAPI.put("/api/review", putReviewAPI);
routerAPI.get("/api/users", getUserAPI);
routerAPI.post("/api/users", postUserAPI);

module.exports = routerAPI;
