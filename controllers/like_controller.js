const Post = require("../models/postSchema");
const Comment = require("../models/commentSchema");
const Like = require("../models/likeSchema");

module.exports.tooglelike = async function (req, res) {
  // like link will be /likes/toogle/?id=id&type=type
  try {
    let isLiked = true;
    let likepostOrcomment;
    // check like is on post or comment
    if (req.query.type == "Post") {
      likepostOrcomment = await Post.findById(req.query.id).populate("likes");
    } else {
      likepostOrcomment = await Comment.findById(req.query.id).populate(
        "likes"
      );
    }

    //check if likes exist or not
    let existLike = await Like.findOne({
      user: req.user.id,
      likeable: req.query.id,
      OnModel: req.query.type,
    });
    // if like is already present
    if (existLike) {
      likepostOrcomment.likes.pull(existLike.id);
      likepostOrcomment.save();

      existLike.remove();
      isLiked = false;
    } else {
      //make new like
      let newlike = await Like.create({
        user: req.user.id,
        likeable: req.query.id,
        OnModel: req.query.type,
      });

      likepostOrcomment.likes.push(newlike.id);
      likepostOrcomment.save();
    }
    return res.redirect("back");
  } catch (err) {
    console.log("error in creating like", err);
    return;
  }
};
