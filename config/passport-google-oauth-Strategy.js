const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/userSchema");

// options for oauth
const opts = {
  clientID:
    "957973625302-es3plcqh2rvde41nd55bcvhcv9k60dj5.apps.googleusercontent.com",
  callbackURL: "http://localhost:3000/users/auth/google/callback",
};

//telling passport to use google oauth
passport.use(
  new googleStrategy(opts, function (accessToken, refreshToken, profile, done) {
    //finding if user exits in db
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
      if (err) {
        console.log("error in google oauth", err);
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        //if user not exit make ne and generate any random password
        User.create(
          {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          },
          function (err, user) {
            if (err) {
              console.log("error in creating user using google oauth", err);
              return;
            }
            return done(null, user);
          }
        );
      }
    });
  })
);
