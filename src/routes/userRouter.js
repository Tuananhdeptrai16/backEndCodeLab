const express = require("express");
const admin = require("../config/firebase"); // Đường dẫn đến firebaseAdmin.js
const router = express.Router();

// Route để lấy tất cả người dùng
router.get("/api/users", async (req, res) => {
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

module.exports = router;
