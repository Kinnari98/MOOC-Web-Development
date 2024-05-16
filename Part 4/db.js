// Tietokantayhteys ja Mongoose-skeema

const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

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

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
});

userSchema.statics.createUser = async function (username, password, name) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new this({ username, passwordHash, name });
  return user.save();
};

const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

console.log("hello from db");

module.exports = {
  Blog,
  User,
};
