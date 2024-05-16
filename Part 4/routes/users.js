const express = require("express");
const { User } = require("../db.js");
const userRouter = express.Router();

userRouter.post("/api/users", async (request, response) => {
  try {
    const { username, password, name } = request.body;
    console.log("username", username);
    console.log("password", password);
    console.log("name", name);
    const user = await User.createUser(username, password, name);
    console.log("user", user);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ message: "unable to create user" });
  }
});

userRouter.get("/api/users", async (request, response) => {
  try {
    const users = await User.find({}).populate("blogs", "title url");
    response.json(
      users.map((u) => ({
        username: u.username,
        name: u.name,
        blogs: u.blogs,
      }))
    );
  } catch (error) {
    response.status(500).json({ error: "unable to retrieve users" });
  }
});

module.exports = userRouter;
