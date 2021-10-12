const Post = require("../models/postSchema");
//controller for post
module.exports.create_post = function (req, res) {
  // console.log(req.body);
  //console.log(req.user);
  if (req.isAuthenticated()) {
    Post.create(
      {
        content: req.body.content,
        user: req.user.id,
      },
      function (err, post) {
        if (err) {
          console.log("Error in post while creating post");
          return;
        }
        return res.redirect("back");
      }
    );
  } else {
    return res.redirect("back");
  }
};
