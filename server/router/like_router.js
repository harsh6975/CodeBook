const express = require("express");
const likeController = require("../controllers/like_controller");
const router = express.Router();

router.get("/toogle", likeController.tooglelike);

module.exports = router;
