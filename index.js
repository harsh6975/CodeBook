const express = require("express");
const route = require("./router/index_router");
const db = require("./config/mongoose");
const cookieParse = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("./config/passport-Local-Strategy");
const passportJWT = require("./config/passport-JWT-Strategy");
const passportGoogle = require("./config/passport-google-oauth-Strategy");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const layout = require("express-ejs-layouts");
const flash = require("connect-flash");
const flashMiddleware = require("./config/flashMiddleware");
const app = express();
const env = require("./config/enviroment");
const port = 3000;

//layout
app.use(layout);
//extract styles and script from sub pages to layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//to encode data from form
app.use(express.urlencoded());

app.use(express.static(env.asset_path));
//make the available path for uploads to browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(cookieParse());

//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//session for auth
app.use(
  session({
    name: "CodeBooks",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 30,
    },
    //storing session cookie
    store: new MongoStore(
      {
        // mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use flash below session
app.use(flash());
app.use(flashMiddleware.flash);

//using express router
app.use("/", route);

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running ther server ${port}`);
  }
  console.log(`Server running on port ${port}`);
});
