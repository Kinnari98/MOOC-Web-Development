// Express määrittely ja tulevat middlewaret
const express = require("express");
const cors = require("cors");
const blogsRouter = require("./routes/blogs");
const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/blogs/id", blogsRouter);
app.use(userRouter);
app.use(loginRouter);
app.use("api/login", loginRouter);

console.log("Hello from app");

module.exports = app;
