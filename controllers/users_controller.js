const User = require("../models/userSchema");
const fs = require("fs");
const path = require("path");
//controller for profile page
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log("err in finding user for profile");
      return;
    }
    return res.render("profile", {
      user_profile: user,
    });
  });
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
  return res.render("sign_in", {
    title: "Sign In",
  });
};

//controller for signup page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

//controller for create account
module.exports.createAccount = async function (req, res) {
  console.log("creating");
  if (req.body.password != req.body.confirm_password) {
    req.flash("sucess", "Create Account sucessfully");
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
      return res.redirect("/users/sign-in");
    } else {
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
