const express = require("express");
const getCitiesByCoordinates = require("../../../handlers/cities/get/getCitiesByCoordinates");
const {
  getCitiesByCountryCode,
} = require("../../../handlers/cities/get/getCitiesByCountryCode");
const getCitiesById = require("../../../handlers/cities/get/getCitiesById");
const getCitiesByName = require("../../../handlers/cities/get/getCitiesByName");
const { connectToDb } = require("../../../handlers/db");
const { authorization } = require("../../../../utils/authorization");
const citiesGetRouter = express.Router();

// Get city by country
citiesGetRouter.get(
  "/cities/country/:countryCode",
  authorization,
  async (req, res) => {
    try {
      const db = await connectToDb();

      getCitiesByCountryCode(req, res, db);
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
);

// Get city by name
citiesGetRouter.get(
  "/cities/name/:cityName",
  authorization,
  async (req, res) => {
    try {
      const db = await connectToDb();

      getCitiesByName(req, res, db);
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
);

// Get city by coordinates
citiesGetRouter.get("/cities/coordinates", authorization, async (req, res) => {
  try {
    const db = await connectToDb();

    getCitiesByCoordinates(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Get city by id
citiesGetRouter.get("/cities/id/:cityId", authorization, async (req, res) => {
  try {
    const db = await connectToDb();

    getCitiesById(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

module.exports = citiesGetRouter;
