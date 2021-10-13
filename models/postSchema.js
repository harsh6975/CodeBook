const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // refer to user sechema
    },
    //arrray of comments
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment", // refer to comment sechema
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
