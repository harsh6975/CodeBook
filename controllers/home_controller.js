const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const FriendShip = require("../models/friendSchema");
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
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      })
      .populate("likes");

    post.forEach((post) => {
      post.comment.sort((commentA, commentB) => {
        if (commentA.createdAt.getTime() > commentB.createdAt.getTime()) {
          return -1;
        } else {
          return 1;
        }
      });
    });

    let users = await User.find({});
    let userFriend = new Array();
    //if user is logged in
    if (req.user) {
      for (friend of req.user.friends) {
        let friend1 = await FriendShip.findById(friend);

        let user1 = await User.findById(friend1.to_user);
        let user2 = await User.findById(friend1.from_user);
        if (user1.id != req.user.id) {
          userFriend.push(user1);
          for (var i = 0; i < users.length; i++) {
            if (users[i].id == user1.id) {
              users.splice(i, 1);
              break;
            }
          }
        } else if (user2.id != req.user.id) {
          userFriend.push(user2);
          for (var i = 0; i < users.length; i++) {
            if (users[i].id == user1.id) {
              users.splice(i, 1);
              break;
            }
          }
        }
      }
      users.splice(users.indexOf(req.user._id), 1);
    }

    return res.render("home", {
      title: "CodeBooks",
      postList: post,
      AllUser: users,
      friends: userFriend,
    });
  } catch (err) {
    console.log("Error in finding post", err);
    return;
  }
};
