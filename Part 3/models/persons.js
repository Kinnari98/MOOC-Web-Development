// ./models/persons.js
const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGO_DB;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// const Person = mongoose.model("Person", personSchema);

// app.get("/api/persons", (request, response) => {
//   Person.find({}).then((persons) => {
//     response.json(persons);
//   });
// });

module.exports = mongoose.model("Person", personSchema);
