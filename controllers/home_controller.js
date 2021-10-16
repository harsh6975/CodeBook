const Post = require("../models/postSchema");
const User = require("../models/userSchema");

module.exports.home = function (req, res) {
  //To get data from other models
  //Post.find().populate('model).exec(function)
  Post.find({})
    .populate("user")
    .populate({
      path: "comment",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("error in finding the post ", err);
        return;
      }
      User.find({}, function (err, user) {
        if (err) {
          console.log("err in findeing user");
          return;
        }
        return res.render("home", {
          title: "CodeBooks",
          postList: posts,
          user_friend: user,
        });
      });
    });
};
