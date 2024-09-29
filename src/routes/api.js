const express = require("express");
const admin = require("../config/firebase"); // Đường dẫn đến firebaseAdmin.js
const routerAPI = express.Router();

const {
  postCoursesAPI,
  getCoursesAPI,
  deleteCoursesAPI,
  putCoursesAPI,
  getBlogAPI,
  postBlogAPI,
  deleteBlogAPI,
  putBlogAPI,
} = require("../controllers/apiController");

// Route để lấy tất cả người dùng
routerAPI.get("/api/users", async (req, res) => {
  try {
    const users = [];
    let nextPageToken;

    // Sử dụng một vòng lặp để lấy tất cả người dùng
    do {
      const response = await admin.auth().listUsers(1000, nextPageToken);
      users.push(...response.users);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

// Routes cho Courses
routerAPI.get("/api/courses", getCoursesAPI);
routerAPI.post("/api/courses", postCoursesAPI);
routerAPI.delete("/api/courses", deleteCoursesAPI);
routerAPI.put("/api/courses/:id", putCoursesAPI);

// Routes cho Blog
routerAPI.get("/api/blog", getBlogAPI);
routerAPI.post("/api/blog", postBlogAPI);
routerAPI.delete("/api/blog", deleteBlogAPI);
routerAPI.put("/api/blog", putBlogAPI);

module.exports = routerAPI;
