const express = require("express");
const citiesGetRouter = require("./cities/get");
const authGetRouter = require("./auth/post");
const countriesGetRouter = require("./countries/get");

const rootRouter = express.Router();

rootRouter.use(citiesGetRouter);
rootRouter.use(authGetRouter);
rootRouter.use(countriesGetRouter);

module.exports = rootRouter;
