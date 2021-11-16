const cities = require("all-the-cities");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 4000;

if (!process.env.PORT) {
  app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
  });
}

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

app.get("/all-cities", (req, res) => {
  res.json({ cities });
});

module.exports = {
  path: "/cities",
  handler: app,
};
