const { CITIES_COLLECTION_NAME } = process.env;

function getCitiesById(req, res, db) {
  db.collection(CITIES_COLLECTION_NAME)
    .find({ id: req.params.cityId.toString() })
    .limit(1)
    .toArray((err, result) => {
      if (err) {
        throw new Error(err.message);
      } else {
        res.status(200).json({ status: 200, data: result });
      }
    });
}

module.exports = getCitiesById;
