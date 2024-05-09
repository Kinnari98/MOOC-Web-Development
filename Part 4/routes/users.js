const express = require("express");
const { User } = require("../db.js"); // Käytetään aiemmin luotua User-mallia
const userRouter = express.Router();

userRouter.post("/api/users", async (request, response) => {
  try {
    const { username, password, name } = req.body;
    const user = await User.createUser(username, password, name);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: "unable to create user" });
  }
});

userRouter.get("/api/users", async (request, response) => {
  try {
    const users = await User.find({});
    response.json(users.map((u) => ({ username: u.username, name: u.name }))); // Palautetaan vain turvalliset tiedot
  } catch (error) {
    response.status(500).json({ error: "unable to retrieve users" });
  }
});

module.exports = userRouter;
