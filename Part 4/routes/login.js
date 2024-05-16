const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const { User } = require("../db.js");
const loginRouter = express.Router();

loginRouter.post("/api/login", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await user.validatePassword(password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60, // Token vanhenee 1 tunnin kuluttua
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
