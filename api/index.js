"use strict";
const dotenv = require("dotenv");
dotenv.load();

// app setup
const express = require("express");
const v1 = require("./routes");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/v1", v1);
app.listen(port, function() {
  console.log("API server running at:" + port);
});
