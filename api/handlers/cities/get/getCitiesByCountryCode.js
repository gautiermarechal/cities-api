const { CITIES_COLLECTION_NAME } = process.env;

function getCitiesByCountryCode(req, res, db) {
  const pageNumber = parseFloat(req.query.page_number);
  const pageSize = parseFloat(req.query.page_size);
  const skip = pageSize * pageSize;

  if (pageNumber === 1) {
    db.collection(CITIES_COLLECTION_NAME)
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
    db.collection(CITIES_COLLECTION_NAME)
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
}

module.exports = { getCitiesByCountryCode };
