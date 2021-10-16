const Post = require("../models/postSchema");
const Comment = require("../models/commentSchema");
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

module.exports.destroy = function (req, res) {
  //console.log(req.params.id);
  // Post.findById( req.params.id, function (err, post) {
  //   if (err) {
  //     console.log("error in deleting post");
  //   }
  //   post.remove();
  //   Comment.deleteMany({ post: req.params.id }, function (err) {
  //     if (err) {
  //       console.log("error in deleting the comment while deleting the post");
  //       return;
  //     }
  //     return res.redirect("back");
  //   });
  // });
  console.log(req.query);
  Post.findById( req.query.id, function (err, post) {
    if (err) {
      console.log("error in deleting post");
    }
    post.remove();
    Comment.deleteMany({ post: req.query.id }, function (err) {
      if (err) {
        console.log("error in deleting the comment while deleting the post");
        return;
      }
      return res.redirect("back");
    });
  });
};
