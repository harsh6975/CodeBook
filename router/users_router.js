const express = require("express");
const userController = require("../controllers/users_controller");

const router = express.Router();

router.get("/profile", userController.profile);
router.get("/post", userController.post);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.post("/create",userController.create);
module.exports = router;
