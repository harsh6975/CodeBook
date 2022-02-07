const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");
const Like = require("../models/likeSchema");
const nodemailer = require("../mailer/commentMailer");

module.exports.create = async function (req, res) {
  //check if post is present or not
  // Post.findById(req.body.post, function (err, post) {
  //   if (post) {
  //     Comment.create(
  //       {
  //         content: req.body.content,
  //         post: req.body.post, //in form we are taking post_id as post
  //         user: req.user.id,
  //       },
  //       function (err, comment) {
  //         if (err) {
  //           console.log("Error in creating comment");
  //           return;
  //         }
  //         //push comments into post
  //         console.log(post);
  //         post.comment.push(comment);
  //         post.save();
  //         return res.redirect("back");
  //       }
  //     );
  //   }
  // });

  //async await
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post, //in form we are taking post_id as post
        user: req.user.id,
      });
      post.comment.push(comment);
      post.save();
      comment = await comment.populate("user");
      //to send mail useing nodemailer
      nodemailer.newComment(comment);

      req.flash("sucess", "comment sucessfully created");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  // Comment.findById(req.query.id, function (err, comment) {
  //   if (err) {
  //     console.log("error in deleting post");
  //   }
  //   var postId = comment.post;
  //   comment.remove();
  //   Post.findByIdAndUpdate(
  //     postId,
  //     { $pull: { comment: req.query.id } },
  //     function (err, post) {
  //       res.redirect("back");
  //     }
  //   );
  // });
  try {
    let comment = await Comment.findById(req.query.id);
    let postId = comment.post;
    comment.remove();

    await Post.findByIdAndUpdate(postId, { $pull: { comment: req.query.id } });

    //delete all likes on comment
    await Like.deleteMany({ likeable: comment, onModel: "Comment" });

    req.flash("sucess", "comment sucessfully deleted");
    res.redirect("back");
  } catch (err) {
    req.flash("sucess", err);
    return;
  }
};
