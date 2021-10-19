const Post = require("../models/postSchema");
const User = require("../models/userSchema");

// module.exports.home = function (req, res) {
//   //To get data from other models
//   //Post.find().populate('model).exec(function)
//   Post.find({})
//     .populate("user")
//     .populate({
//       path: "comment",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec(function (err, posts) {
//       if (err) {
//         console.log("error in finding the post ", err);
//         return;
//       }
//       User.find({}, function (err, user) {
//         if (err) {
//           console.log("err in findeing user");
//           return;
//         }
//         return res.render("home", {
//           title: "CodeBooks",
//           postList: posts,
//           user_friend: user,
//         });
//       });
//     });
// };

// async wait
module.exports.home = async function (req, res) {
  try {
    let post = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      });

    post.forEach(post => {
      post.comment.sort((commentA, commentB) => {
        if (commentA.createdAt.getTime() > commentB.createdAt.getTime()) {
          return -1;
        }
        else {
          return 1;
        }
      })
    })

    let user = await User.find({});

    return res.render("home", {
      title: "CodeBooks",
      postList: post,
      user_friend: user,
    });
  } catch (err) {
    console.log("Error in finding post", err);
    return;
  }
};
