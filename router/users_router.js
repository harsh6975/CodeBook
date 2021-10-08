const express = require("express");
const userController = require("../controllers/users_controller");

const router = express.Router();

router.get("/profile", userController.profile);
router.get("/post", userController.post);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.post("/createAccount", userController.createAccount);
router.post("/login_sucess", userController.login_sucess);
router.get("/logout", userController.logout);
module.exports = router;
