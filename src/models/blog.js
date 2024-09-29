const mongoose = require("mongoose");
const contentBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [
    {
      text: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
});
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  level: { type: String, required: true },
  owner: { type: String, required: true },
  blogItems: [contentBlogSchema],
  rating: { type: Number, default: 0 },
  studentsEnrolled: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
