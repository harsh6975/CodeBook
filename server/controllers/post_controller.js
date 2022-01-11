const Post = require("../models/postSchema");
const Comment = require("../models/commentSchema");
const Like = require("../models/likeSchema");

//controller for post
module.exports.create_post = async function (req, res) {
  // console.log(req.body);
  //console.log(req.user);
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created!",
      });
    }

    req.flash("sucess", "Post sucessfully created");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
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

    //deleting all like associated to post and its comment
    await Like.deleteMany({ likeable: post, onModel: "Post" });
    console.log(post.comment);
    await Like.deleteMany({ id: { $in: post.comment } });

    post.remove();

    await Comment.deleteMany({ post: req.query.id });

    req.flash("sucess", "Post sucessfully Deleted");
    return res.redirect("back");
  } catch (err) {
    console.log("err in deleting the post");
    return;
  }
};
