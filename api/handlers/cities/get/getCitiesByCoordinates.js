const { pagination } = require("../../../../utils/paginate");

const { CITIES_COLLECTION_NAME } = process.env;

function getCitiesByCoordinates(req, res, db) {
  const {
    pageNumber,
    pageSize,
    skip,
    pageSizeValidation,
    pageNumberValidation,
  } = pagination(req);
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  try {
    if (pageNumberValidation && pageSizeValidation) {
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
        .skip(skip)
        .toArray((err, result) => {
          if (err) {
            throw new Error(err.message);
          } else {
            res.status(200).json({
              status: 200,
              numberOfItems: result.length,
              pageNumber,
              pageSize,
              data: result,
            });
          }
        });
    } else {
      throw new Error(
        "Wrong page number or page size. Page number must be 1 or more. Page size must be between 1 and 100."
      );
    }
  } catch (error) {
    res.status(500).json({ status: 500, data: "error" });
  }
}

module.exports = getCitiesByCoordinates;
