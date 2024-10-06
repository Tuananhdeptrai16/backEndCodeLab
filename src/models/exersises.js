const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

//coursesId
const optionSchema = new mongoose.Schema({
  option: { type: String },
});
const questionSchema = new mongoose.Schema(
  {
    coursesId: { type: String, required: true },
    questions: [
      {
        title: { type: String, required: true },
        correctAnswer: { type: String, required: true },
        options: [optionSchema],
      },
    ],
  },
  { timestamps: true }
);
questionSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Exercises = mongoose.model("Exercises", questionSchema);
module.exports = Exercises;
