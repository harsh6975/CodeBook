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
        req.flash('err',err);
        return;
      }
      req.flash('sucess','Post sucessfully created');
      return res.redirect("back");
    }
  );
};

module.exports.destroy = async function (req, res) {
  // using param;

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

  // using query;

  // Post.findById(req.query.id, function (err, post) {
  //   if (err) {
  //     console.log("error in deleting post");
  //   }
  //   post.remove();
  //   Comment.deleteMany({ post: req.query.id }, function (err) {
  //     if (err) {
  //       console.log("error in deleting the comment while deleting the post");
  //       return;
  //     }
  //     return res.redirect("back");
  //   });
  // });

  //async wait and query
  try {
    let post = await Post.findById(req.query.id);
    post.remove();
    await Comment.deleteMany({ post: req.query.id });
    req.flash('sucess','Post sucessfully Deleted');
    return res.redirect("back");
  } catch (err) {
    console.log("err in deleting the post");
    return;
  }
};
