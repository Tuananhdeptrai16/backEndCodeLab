const { default: mongoose } = require("mongoose");
const db = require("../../config/firebase");

// Function to get user data from Firebase by ID
const getUserById = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new Error("User not found");
  }
  return { id: doc.id, ...doc.data() };
};

// Define the user schema
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  course: [
    {
      coursesId: { type: String, required: true },
      progress: { type: Number, default: 0 }, // Giá trị tiến độ, bạn có thể thay đổi loại nếu cần
    },
  ],
  admin: { type: Boolean, default: false },
  data: { type: Object },
});

// Pre-save middleware to get Firebase data before saving
userSchema.pre("save", async function (next) {
  const user = this;
  // Fetch the data from Firebase using the userId field
  try {
    const firebaseData = await getUserById(user.userId);
    user.data = firebaseData; // Set the data field with Firebase data
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware if fetching fails
  }
});

// Create the model
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
