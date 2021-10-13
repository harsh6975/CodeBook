const Post = require("../models/postSchema");

//controller for post
module.exports.create_post = function (req, res) {
  // console.log(req.body);
  //console.log(req.user);
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error in post while creating post");
        return;
      }
      return res.redirect("back");
    }
  );
};
