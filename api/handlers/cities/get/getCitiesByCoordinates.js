function getCitiesByCoordinates(req, res, db) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  db.collection("cities")
    .find({ lat, lng })
    .toArray((err, result) => {
      if (err) {
        throw new Error(err.message);
      } else {
        res.status(200).json({ status: 200, data: result });
      }
    });
}

module.exports = getCitiesByCoordinates;
