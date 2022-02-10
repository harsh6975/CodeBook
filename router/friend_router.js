const express = require("express");
const friendController = require("../controllers/friend_controller");

const router = express.Router();

router.get("/toogle", friendController.toggle);


module.exports = router;
