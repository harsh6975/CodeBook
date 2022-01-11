const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "OnModel", //dynamic reference
    },
    // dynamically defining type of like
    OnModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"], //if not define then it will be for all schema
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
