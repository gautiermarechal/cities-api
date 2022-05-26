const { COUNTRIES_COLLECTION_NAME } = process.env;

function getCountriesByRegionCode(req, res, db) {
  try {
    db.collection(COUNTRIES_COLLECTION_NAME)
      .find({ region: req.params.regionCode.toUpperCase() })
      .toArray((err, result) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.status(200).json({
            status: 200,
            data: result,
          });
        }
      });
  } catch (error) {
    res.status(500).json({ status: 500, data: error });
  }
}

module.exports = { getCountriesByRegionCode };
