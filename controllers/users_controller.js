const User = require("../models/userSchema");

module.exports.profile = function (req, res) {
  return res.render('profile',{
    user: {
      name:'harsh',
      email:'asdf'
    }
  })
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
      console.log("user fond");
      return res.redirect("back");
    }
  });
};

module.exports.createSession=function(req,res){
  return res.redirect('/');
}
