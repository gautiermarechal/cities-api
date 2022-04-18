const { CITIES_COLLECTION_NAME } = process.env;

function getCitiesByCoordinates(req, res, db) {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  try {
    db.collection(CITIES_COLLECTION_NAME)
      .find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [lng, lat] },
            $minDistance: 1000,
            $maxDistance: 5000,
          },
        },
      })
      .toArray((err, result) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.status(200).json({ status: 200, data: result });
        }
      });
  } catch (error) {
    res.status(500).json({ status: 500, data: "error" });
  }
}

module.exports = getCitiesByCoordinates;
