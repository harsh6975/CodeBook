const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");

module.exports.create = function (req, res) {
  //check if post is present or not
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post, //in form we are taking post_id as post
          user: req.user.id,
        },
        function (err, comment) {
          if (err) {
            console.log("Error in creating comment");
            return;
          }
          //push comments into post
          console.log(post);
          post.comment.push(comment);
          post.save();
          return res.redirect("back");
        }
      );
    }
  });
};

module.exports.destroy = function (req, res) {
  Comment.findById(req.query.id, function (err, comment) {
    if (err) {
      console.log("error in deleting post");
    }
    var postId = comment.post;
    comment.remove();
    Post.findByIdAndUpdate(postId, { $pull: { comment: req.query.id } });
    res.redirect("back");
  });
};
