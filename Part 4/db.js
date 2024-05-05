// Tietokantayhteys ja Mongoose-skeema

const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_DB;

mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

console.log("hello from db");

module.exports = mongoose.model("Blog", blogSchema);
