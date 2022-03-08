const { CITIES_COLLECTION_NAME } = process.env;

function getCitiesByName(req, res, db) {
  db.collection(CITIES_COLLECTION_NAME)
    .find({ name: { $regex: req.params.cityName, $options: "i" } })
    .toArray((err, result) => {
      if (err) {
        throw new Error(err.message);
      } else {
        res.status(200).json({ status: 200, data: result });
      }
    });
}

module.exports = getCitiesByName;
