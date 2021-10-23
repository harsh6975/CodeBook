const express = require("express");
const userApiController = require("../../../controllers/api/v1/userApi");

const router = express.Router();

router.post("/create-session", userApiController.createSession);

module.exports = router;
