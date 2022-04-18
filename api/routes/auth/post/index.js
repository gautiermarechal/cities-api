const express = require("express");
const { connectToDb } = require("../../../handlers/db");
const createUser = require("../../../handlers/auth/post/createUser");
const login = require("../../../handlers/auth/post/login");

const authGetRouter = express.Router();

// Create a user
authGetRouter.post("/users/create", async (req, res) => {
  try {
    const db = await connectToDb();

    createUser(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Login a user
authGetRouter.post("/users/login", async (req, res) => {
  try {
    const db = await connectToDb();

    login(req, res, db);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

module.exports = authGetRouter;
