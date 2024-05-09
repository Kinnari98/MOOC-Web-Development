// Tietokantayhteys ja Mongoose-skeema

const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_DB;

/*const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

    */

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

// Muokataan
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

console.log("hello from db");

module.exports = mongoose.model("Blog", blogSchema);
