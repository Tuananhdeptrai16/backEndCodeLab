const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  city: String,
});
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
