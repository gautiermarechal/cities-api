const express = require("express");
const {
  getCountries,
} = require("../../../handlers/countries/get/getCountries");
const {
  getCountriesByCode,
} = require("../../../handlers/countries/get/getCountriesByCode");
const {
  getCountriesByName,
} = require("../../../handlers/countries/get/getCountriesByName");
const {
  getCountriesByRegionCode,
} = require("../../../handlers/countries/get/getCountriesByRegionCode");
const { connectToDb } = require("../../../handlers/db");
const countriesGetRouter = express.Router();

// Get countries
countriesGetRouter.get("/countries", async (req, res) => {
  try {
    const db = await connectToDb();

    getCountries(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Get country by name
countriesGetRouter.get("/countries/name/:countryName", async (req, res) => {
  try {
    const db = await connectToDb();

    getCountriesByName(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Get country by code
countriesGetRouter.get("/countries/code/:countryCode", async (req, res) => {
  try {
    const db = await connectToDb();

    getCountriesByCode(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Get country by code
countriesGetRouter.get("/countries/region/:regionCode", async (req, res) => {
  try {
    const db = await connectToDb();

    getCountriesByRegionCode(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

module.exports = countriesGetRouter;
