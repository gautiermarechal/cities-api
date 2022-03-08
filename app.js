const express = require("express");
const cors = require("cors");
//DB imports----------------------------------------
const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, ".env") });
const { connectToDb } = require("./api/handlers/db");
//-------------------------------------------------
// HANDLERS imports -------------------------------
const {
  getCitiesByCountryCode,
} = require("./api/handlers/cities/get/getCitiesByCountryCode");
const getCitiesByName = require("./api/handlers/cities/get/getCitiesByName");
const getCitiesByCoordinates = require("./api/handlers/cities/get/getCitiesByCoordinates");
const rootRouter = require("./api/routes");
//-------------------------------------------------
// ROUTERS imports -----------------

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

app.use("/", rootRouter);

module.exports = {
  path: "/cities",
  handler: app,
};
