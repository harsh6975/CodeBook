const Post = require("../models/postSchema");

module.exports.home = function (req, res) {
  //To get data from other models
  //Post.find().populate('model).exec(function)
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      if (err) {
        console.log("error in finding the post");
        return;
      }
      return res.render("home", {
        title: "CodeBooks",
        postList: posts,
      });
    });
};
