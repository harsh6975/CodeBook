const User = require("../models/userSchema");

//controller for profile page
module.exports.profile = function (req, res) {
  return res.render("profile");
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
module.exports.createAccount = function (req, res) {
  console.log("creating");
  if (req.body.password != req.body.confirm_password) {
    console.log(
      "password not match",
      req.body.password,
      req.body.confirm_password
    );
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, newuser) {
    if (err) {
      console.log("Error in finding new user in signup");
      return;
    }
    if (!newuser) {
      User.create(req.body, function (err, newuser) {
        if (err) {
          console.log("Error in adding new user in signup");
          return;
        }
        console.log("confirm");
        return res.redirect("/users/sign-in");
      });
    } else {
      console.log("user found");
      return res.redirect("back");
    }
  });
};

//controller for creating session for authenticated user
module.exports.createSession = function (req, res) {
  return res.redirect("/users/profile");
};

//controller for logout
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};


