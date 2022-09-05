const User = require("../models/userSchema");
const Friendship = require("../models/friendSchema");

const fs = require("fs");
const path = require("path");
//controller for profile page
module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    let friend1 = await Friendship.findOne({
      to_user: req.params.id,
      from_user: req.user.id,
    });
    let friend2 = await Friendship.findOne({
      from_user: req.params.id,
      to_user: req.user.id,
    });
    let isFriend = false;
    if (friend1 || friend2) {
      isFriend = true;
    }
    return res.render("profile", {
      user_profile: user,
      isFriend: isFriend,
    });
  } catch (err) {
    console.log("Error in profile", err);
    return;
  }
};

//controller for updating profile
module.exports.update = async function (req, res) {
  //check if req id is same as param id becoz we can change param id in inspect so able to change any one profile
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     req.flash('sucess','Updated sucessfully');
  //     res.redirect("back");
  //   });
  // }

  if (req.user.id == req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      // as now my form is multipart so req.body is not able to get data so use multer
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("error in multer ", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          //if avatar is present then delete previous one
          if (
            user.avatar &&
            fs.existsSync(path.join(__dirname, "..", user.avatar))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return;
    }
  } else {
    req.flash("error", err);
    return;
  }
};

//controller for sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("sign-common", {
    title: "Sign In",
    class1: "animated fadeIn current",
    class2: "",
  });
};

//controller for signup page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign-common", {
    title: "Sign Up",
    class2: "animated fadeIn current",
    class1: "",
  });
};

//controller for create account
module.exports.createAccount = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash("sucess", "Password not Match");
    return res.redirect("back");
  }

  // User.findOne({ email: req.body.email }, function (err, newuser) {
  //   if (err) {
  //     console.log("Error in finding new user in signup");
  //     return;
  //   }
  //   if (!newuser) {
  //     User.create(req.body, function (err, newuser) {
  //       if (err) {
  //         console.log("Error in adding new user in signup");
  //         return;
  //       }
  //       console.log("confirm");
  //       return res.redirect("/users/sign-in");
  //     });
  //   } else {
  //     console.log("user found");
  //     return res.redirect("back");
  //   }
  // });
  try {
    let newuser = await User.findOne({ email: req.body.email });
    if (!newuser) {
      await User.create(req.body);
      req.flash("sucess", "Account created, Please login");
      return res.redirect("/users/sign-in");
    } else {
      req.flash("sucess", "Account exist, Please login");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

//controller for creating session for authenticated user
module.exports.createSession = function (req, res) {
  req.flash("sucess", "Logged in sucessfully");
  return res.redirect("/");
};

//controller for logout
module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("sucess", "Logged out sucessfully");
  return res.redirect("/");
};

module.exports.friend = async function (req, res) {
  try {
    let users = await User.find({});
    let userFriend = new Array();
    //if user is logged in
    if (req.user) {
      for (friend of req.user.friends) {
        let friend1 = await Friendship.findById(friend);

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

    return res.render("friends", {
      friends: userFriend,
    });
  } catch (err) {
    console.log("Error in finding post", err);
    return;
  }
};

module.exports.allUser = async function (req, res) {
  try {
    let users = await User.find({});
    let userFriend = new Array();
    //if user is logged in
    if (req.user) {
      for (friend of req.user.friends) {
        let friend1 = await Friendship.findById(friend);

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
    console.log(users.length);
    return res.render("alluser", {
      alluser: users,
      friends: userFriend,
    });
  } catch (err) {
    console.log("Error in finding post", err);
    return;
  }
};

module.exports.search = async function (req, res) {
  try {
    let users = await User.find({});
    let searchuser = new Array();
    let rname = req.body.search.toUpperCase();

    for (let j = 0; j < users.length; j++) {
      // console.log(users[j]);
      let name = users[j].name.toUpperCase();
      if (name == rname) {
        searchuser.push(users[j]);
      } else {
        console.log("inside");
        let i = 0;
        while (i < name.length) {
          let x = "";
          while (i < name.length && name[i] != " ") {
            x += name[i];
            i++;
          }
          if (x == rname) {
            searchuser.push(users[j]);
            break;
          }
          i++;
        }
      }
    }
    console.log(searchuser);
    return res.render("search", {
      alluser: searchuser,
    });
  } catch (err) {
    console.log("Error in finding post", err);
    return;
  }
};
