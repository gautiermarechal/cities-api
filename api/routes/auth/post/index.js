const express = require("express");
const { connectToDb } = require("../../../handlers/db");
const createUser = require("../../../handlers/auth/post/createUser");
const login = require("../../../handlers/auth/post/login");
const { authorization } = require("../../../../utils/authorization");
const { logout } = require("../../../handlers/auth/post/logout");
const { protected } = require("../../../handlers/auth/get/protected");

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

// Logout a user
authGetRouter.post("/users/logout", authorization, async (req, res) => {
  try {
    logout(req, res);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// Logout a user
authGetRouter.get("/users/protected", authorization, async (req, res) => {
  try {
    protected(req, res);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

module.exports = authGetRouter;
