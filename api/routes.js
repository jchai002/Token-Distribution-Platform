const express = require("express");
const routes = express.Router();
const controller = require("./interfaces/controller");

routes.get("/", controller.deployDistributor);

module.exports = routes;
