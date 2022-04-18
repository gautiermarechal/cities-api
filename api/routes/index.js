const express = require("express");
const citiesGetRouter = require("./cities/get");
const authGetRouter = require("./auth/post");

const rootRouter = express.Router();

rootRouter.use(citiesGetRouter);
rootRouter.use(authGetRouter);

module.exports = rootRouter;
