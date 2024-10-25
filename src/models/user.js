const { mongoose } = require("mongoose");
// const db = require("../../config/firebase");
const mongoose_delete = require("mongoose-delete");

// Function to get user data from Firebase by ID
// const getUserById = async (userId) => {
//   const userRef = db.collection("users").doc(userId);
//   const doc = await userRef.get();
//   if (!doc.exists) {
//     throw new Error("User not found");
//   }
//   return { id: doc.id, ...doc.data() };
// };

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    userId: String, // ID người dùng
    star: Number,
    data: { type: Object },
    favoriteListInfo: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
    ],
    favoriteBlogInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blogs" }],
    notificationInfo: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notifications" }, // Thông báo
    ],
    readNotification: { type: Boolean, default: false }, // Đánh dấu thông báo đã đọc
    data: { type: Object },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);
userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

// Create the model
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
