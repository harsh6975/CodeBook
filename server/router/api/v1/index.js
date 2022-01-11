const express = require("express");

const router = express.Router();

router.use("/posts", require("./postApiRouter"));
router.use("/users", require("./userApiRouter"));

module.exports = router;
