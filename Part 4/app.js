// Express määrittely ja tulevat middlewaret
const express = require("express");
const cors = require("cors");
const blogsRouter = require("./routes/blogs");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/blogs/id", blogsRouter);

console.log("Hello from app");

module.exports = app;
