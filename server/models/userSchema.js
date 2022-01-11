const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatar");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    dob: {
      type: String,
    },
    avatar: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Friendship",
      },
    ],
  },
  { timestamps: true }
);

//multer storage to store uploads
let storage = multer.diskStorage({
  //path to store files
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  //editing file name as filename+date of upload to differentiate with other files
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//statics methods (global) to access outside also
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
); //for single file
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;
