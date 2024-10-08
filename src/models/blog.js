const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const contentBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [
    {
      text: { type: String, required: true },
      imageUrl: { type: String, required: true },
      descImage: { type: String, required: true },
    },
  ],
});
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    author: { type: String, required: true },
    urlImage: { type: String, required: true },
    blogItems: [contentBlogSchema],
    rating: { type: Number, default: 0 },
    studentsEnrolled: { type: Number, default: 0 },
  },
  { timestamps: true }
);
blogSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Blogs = mongoose.model("Blogs", blogSchema);
module.exports = Blogs;
