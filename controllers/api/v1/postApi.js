const Post = require("../../../models/postSchema");
const Comment = require("../../../models/commentSchema");

module.exports.index = async function (req, res) {
  let post = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comment",
      populate: {
        path: "user",
      },
    });
  return res.json(200, {
    posts: post,
    message: "list of post",
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    post.remove();

    await Comment.deleteMany({ post: req.query.id });

    return res.json(200, {
      message: "post deleted successfully",
    });
  } catch (err) {
    console.log("error in post api", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
