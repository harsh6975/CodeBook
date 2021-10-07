const express = require("express");

const app = express();

const port = 3000;

//using express router
const route=require('./router/index_router');
app.use('/',route);

//view engine


app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running ther server ${port}`);
  }
  console.log(`Server running on port ${port}`);
});
