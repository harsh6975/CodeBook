const express = require("express");
const passport = require("passport");
const postApiController = require("../../../controllers/api/v1/postApi");

const router = express.Router();

router.get("/", postApiController.index);
router.delete("/:id", passport.authenticate('jwt',{session:false}), postApiController.destroy);

module.exports = router;
