const express = require("express");
const route = require("./router/index_router");
const db = require("./config/database");
const cookieParse=require('cookie-parser');
const app = express();

const port = 3000;

app.use(express.urlencoded());
app.use(express.static("./assets"));
app.use(cookieParse());
//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//using express router
app.use("/", route);

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running ther server ${port}`);
  }
  console.log(`Server running on port ${port}`);
});
