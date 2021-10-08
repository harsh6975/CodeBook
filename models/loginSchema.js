const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const login = mongoose.model("login", loginSchema);
module.exports = login;
