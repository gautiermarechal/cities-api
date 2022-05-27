const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, RAPID_HEADER } = process.env;

function authorization(req, res, next) {
  const token = req.cookies.access_token;
  const rapidHeader = req.get("RAPID_HEADER") === RAPID_HEADER;
  if (rapidHeader) {
    try {
      return next();
    } catch {
      return res.sendStatus(403);
    }
  } else {
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, ACCESS_TOKEN_SECRET);
      req.userName = data.user;
      return next();
    } catch {
      return res.sendStatus(403);
    }
  }
}

module.exports = { authorization };
