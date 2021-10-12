const express = require("express");
const homeController = require("../controllers/home_controller");
const userRoutes = require("./users_router");
const postRoutes = require("./post_router");
const router = express.Router();
// console.log("route working");

router.get("/", homeController.home);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;
