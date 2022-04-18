const bcrypt = require("bcrypt");
const { USERS_COLLECTION_NAME } = process.env;

async function createUser(req, res, db) {
  const user = req.body.name;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    db.collection(USERS_COLLECTION_NAME).update(
      {
        name: user,
      },
      {
        $setOnInsert: { name: user, hashedPassword },
      },
      { upsert: true }
    );
    res.status(200).json({ status: 200, message: "User Created" });
  } catch (error) {
    res.status(500).json({ status: 500, data: "error" });
  }
}

module.exports = createUser;
