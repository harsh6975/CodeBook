const NewUsers = require("../models/userSchema");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    NewUsers.findById(req.cookies.user_id, function (err, user) {
      if (err) {
        console.log("Error in opening profile");
        return ;
      }
      if (user) {
        return res.render("profile", {
          user: user,
        });
      }
      // console.log("no user found");
      return res.redirect("sign-in");
    });
  } else {
    //  console.log("no cookies found");
    return res.redirect("sign-in");
  }
};

module.exports.post = function (req, res) {
  return res.send("post");
};

module.exports.signin = function (req, res) {
  return res.render("sign_in", {
    title: "Sign In",
  });
};

module.exports.signup = function (req, res) {
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

module.exports.createAccount = function (req, res) {
  console.log("creating");
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  NewUsers.findOne({ email: req.body.email }, function (err, newuser) {
    if (err) {
      console.log("Error in finding new user in signup");
      return;
    }
    if (!newuser) {
      NewUsers.create(req.body, function (err, newuser) {
        if (err) {
          console.log("Error in adding new user in signup");
          return;
        }
        // console.log("confirm");
        return res.redirect("/users/sign-in");
      });
    } else {
      // console.log("user fond");
      return res.redirect("back");
    }
  });
};

module.exports.login_sucess = function (req, res) {
  console.log("login_sucess");
  NewUsers.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in login");
      return;
    }
    console.log(user);
    if (user) {
      if (req.body.password != user.password) {
        console.log("back");
        return res.redirect("back");
      }
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      console.log("Not Found");
      return res.redirect("back");
    }
  });
};

module.exports.logout = function (req, res) {
  res.clearCookie("user_id")
  return res.redirect("/users/sign-in");
};
