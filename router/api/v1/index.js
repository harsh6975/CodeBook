const express = require("express");

const router = express.Router();

router.use('/posts',require('./postApiRouter'));

module.exports = router;
