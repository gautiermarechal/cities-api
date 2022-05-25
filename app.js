const express = require("express");
const cors = require("cors");
const { rateLimiterUsingThirdParty } = require("./middlewares/rateLimiter");
const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("./swagger");
//DB imports----------------------------------------
const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, ".env") });
//-------------------------------------------------
// HANDLERS imports -------------------------------
const rootRouter = require("./api/routes");
//-------------------------------------------------
// ROUTERS imports -----------------

const app = express();
app.use(express.json());
app.use(cors());
app.use(rateLimiterUsingThirdParty);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
