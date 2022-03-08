const express = require("express");
const citiesGetRouter = require("./cities/get");

const rootRouter = express.Router();

rootRouter.use(citiesGetRouter);

module.exports = rootRouter;
