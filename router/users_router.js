const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");
const passport = require("passport");
const passportLocal = require("../config/passport-Local-Strategy");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/post", userController.post);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.post("/createAccount", userController.createAccount);
router.get("/sign-out",userController.destroySession);
//passport as middleare for auth
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;
