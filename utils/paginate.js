function pagination(req) {
  const pageNumber = parseFloat(req.query.page_number);
  const pageSize = parseFloat(req.query.page_size);
  const skip = pageSize * pageNumber;
  const pageSizeValidation = pageSize > 0 && pageSize <= 100;
  const pageNumberValidation = pageNumber >= 0;

  return {
    pageNumber,
    pageSize,
    skip,
    pageSizeValidation,
    pageNumberValidation,
  };
}

module.exports = { pagination };
