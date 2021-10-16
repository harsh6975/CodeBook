const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment_controller");
const passport = require("passport");

router.post("/create", passport.checkAuthentication, commentController.create);
router.get("/destroy",commentController.destroy);
module.exports = router;
