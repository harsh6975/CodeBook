const express = require("express");
const homeController = require("../controllers/home_controller");
const userRoutes = require("./users_router");
const postRoutes = require("./post_router");
const commentRoutes = require("./comment_router");
const likeRoutes = require("./like_router");
const apiRoutes = require("./api/index");
const friendRoutes = require("./friend_router");
const forgetRoutes = require("./forget_router");

const router = express.Router();
// console.log("route working");

router.get("/", homeController.home);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comment", commentRoutes);
router.use("/api", apiRoutes);
router.use("/likes", likeRoutes);
router.use("/friend", friendRoutes);
router.use('/forget',forgetRoutes);
module.exports = router;
