const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  instructorId: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  level: { type: String, required: true },
});

const Courses = mongoose.model("Courses", courseSchema);

module.exports = Courses;
