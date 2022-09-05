const express = require("express");
const forgetController = require("../controllers/forgetPassword_controller");
const router = express.Router();

router.get("/search", forgetController.search);

module.exports = router;
