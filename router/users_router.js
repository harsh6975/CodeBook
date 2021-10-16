const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");
const passport = require("passport");
const passportLocal = require("../config/passport-Local-Strategy");

router.get("/profile/:id", passport.checkAuthentication, userController.profile);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.get("/sign-out", userController.destroySession);

router.post("/createAccount", userController.createAccount);
//passport as middleare for auth
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
router.post('/update/:id',userController.update);

module.exports = router;
