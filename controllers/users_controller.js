module.exports.profile = function (req, res) {
  return res.send("<h1>Hey users<h1>");
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
