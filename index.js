const express = require("express");
const route = require("./router/index_router");
const db = require("./config/mongoose");
const cookieParse = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("./config/passport-Local-Strategy");
const session = require("express-session");

const app = express();

const port = 3000;

app.use(express.urlencoded());
app.use(express.static("./assets"));
app.use(cookieParse());

//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//session for auth
app.use(
  session({
    name: "CodeBooks",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//using express router
app.use("/", route);

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running ther server ${port}`);
  }
  console.log(`Server running on port ${port}`);
});
