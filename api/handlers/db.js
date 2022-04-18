const { MongoClient } = require("mongodb");
const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, ".env") });
const { DB_URI, DB_NAME, CITIES_COLLECTION_NAME } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
async function connectToDb() {
  //DB config----------------------
  const client = new MongoClient(DB_URI, options);

  await client.connect();

  const db = client.db(DB_NAME);
  console.log("DB connected");
  //-------------------------------
  db.collection(CITIES_COLLECTION_NAME).createIndex(
    // prettier-ignore
    { "location": "2dsphere" }
  );
  console.log("Geospatial index created");

  return db;
}

module.exports = {
  connectToDb,
};
