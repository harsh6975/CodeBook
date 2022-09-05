const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/userSchema");
const env = require("./enviroment");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTStrategy(opts, function (JWTPayload, done) {
    console.log("JWTPayload ".JWTPayload);
    User.findById(JWTPayload._id, function (err, user) {
      if (err) {
        console.log("Error in finding id using jwt", err);
        return;
      }
      if (user) {
        return done(null, user);
      } else {
        return done(err, false);
      }
    });
  })
);
