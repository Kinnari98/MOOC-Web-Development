// Tietokantayhteys ja Mongoose-skeema

const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (returnedObject._user) {
      delete returnedStack.user._id;
      delete returnedStack.user.__v;
    }
  },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.statics.createUser = async function (username, password, name) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new this({
    username,
    passwordHash,
    name,
  });
  return user.save();
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

console.log("hello from db");

module.exports = {
  Blog,
  User,
};
