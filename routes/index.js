const express = require("express");
const route = express.Router();
const homeRouter=require('../controllers/home');
console.log("route working");

route.get('/',homeRouter.home);

module.exports=route;