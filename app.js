const express = require("express");
const cors = require("cors");
//DB imports----------------------------------------
const { resolve } = require("path");
const path = require("path");
require("dotenv").config({ path: resolve(__dirname, ".env") });
const { MongoClient } = require("mongodb");
const { DB_URI, DB_NAME } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//-------------------------------------------------

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${port}` });
});

// Get city by country
app.get("/cities/country/:countryCode", async (req, res) => {
  try {
    //DB config----------------------
    const client = new MongoClient(DB_URI, options);

    await client.connect();

    const db = client.db(DB_NAME);
    console.log("DB connected");
    //-------------------------------
    const pageNumber = parseFloat(req.query.page_number);
    const pageSize = parseFloat(req.query.page_size);
    const skip = pageSize * pageSize;

    if (pageNumber === 1) {
      db.collection("cities-15000")
        .find({ country_code: req.params.countryCode })
        .limit(pageSize)
        .toArray((err, result) => {
          if (err) {
            throw new Error(err.message);
          } else {
            res.status(200).json({ status: 200, data: result });
          }
        });
    } else if (pageNumber > 1) {
      db.collection("cities-15000")
        .find({ country_code: req.params.countryCode })
        .skip(skip)
        .limit(pageSize)
        .toArray((err, result) => {
          if (err) {
            throw new Error(err.message);
          } else {
            res.status(200).json({ status: 200, data: result });
          }
        });
    } else {
      throw new Error("Wrong page number");
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Get city by name
app.get("/cities/name/:cityName", async (req, res) => {
  try {
    //DB config----------------------
    const client = new MongoClient(DB_URI, options);

    await client.connect();

    const db = client.db(DB_NAME);
    console.log("DB connected");
    //-------------------------------

    db.collection("cities-15000")
      .find({ name: { $regex: req.params.cityName, $options: "i" } })
      .toArray((err, result) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.status(200).json({ status: 200, data: result });
        }
      });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Get city by coordinates
app.get("/cities/coordinates", async (req, res) => {
  try {
    //DB config----------------------
    const client = new MongoClient(DB_URI, options);

    await client.connect();

    const db = client.db(DB_NAME);
    console.log("DB connected");
    //-------------------------------
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);

    db.collection("cities-15000")
      .find({ lat, lng })
      .toArray((err, result) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.status(200).json({ status: 200, data: result });
        }
      });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

module.exports = {
  path: "/cities",
  handler: app,
};
