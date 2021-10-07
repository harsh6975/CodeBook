const express = require("express");
const route = require("./router/index_router");

const app = express();

const port = 3000;

//using express router
app.use("/", route);

//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running ther server ${port}`);
  }
  console.log(`Server running on port ${port}`);
});
