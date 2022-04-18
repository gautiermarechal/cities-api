const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  USERS_COLLECTION_NAME,
  REFRESH_TOKEN_COLLECTION_NAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;

async function login(req, res, db) {
  try {
    db.collection(USERS_COLLECTION_NAME).findOne(
      { name: req.body.name },
      async function (err, user) {
        console.log(user);
        //check to see if the user exists in the list of registered users
        if (user == null) res.status(404).send("User does not exist!");
        //if user does not exist, send a 400 response
        console.log(user);
        if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
          const accessToken = generateAccessToken({ user: req.body.name });
          const refreshToken = generateRefreshToken(
            { user: req.body.name },
            db
          );
          res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
          res.status(401).send("Password Incorrect!");
        }
      }
    );
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}

// accessTokens
function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
function generateRefreshToken(user, db) {
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  db.collection(REFRESH_TOKEN_COLLECTION_NAME).insertOne({
    token: refreshToken,
  });
  return refreshToken;
}

module.exports = login;
