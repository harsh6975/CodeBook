const express = require("express");
const homeController = require("../controllers/home_controller");
const userRoutes = require("./users_router");
const postRoutes = require("./post_router");
const commentRoutes = require("./comment_router");
const apiRoutes = require("./api/index");
const router = express.Router();
// console.log("route working");

router.get("/", homeController.home);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comment", commentRoutes);
router.use("/api", apiRoutes);

module.exports = router;
