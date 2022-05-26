const { pagination } = require("../../../../utils/paginate");
const { CITIES_COLLECTION_NAME } = process.env;

function getCitiesByCountryCode(req, res, db) {
  const {
    pageNumber,
    pageSize,
    skip,
    pageSizeValidation,
    pageNumberValidation,
  } = pagination(req);

  try {
    if (pageNumberValidation && pageSizeValidation) {
      db.collection(CITIES_COLLECTION_NAME)
        .find({ country_code: req.params.countryCode })
        .skip(skip)
        .limit(pageSize)
        .toArray((err, result) => {
          if (err) {
            throw new Error(err.message);
          } else {
            res.status(200).json({
              status: 200,
              numberOfItems: result.length,
              pageNumber,
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

module.exports = { getCitiesByCountryCode };
