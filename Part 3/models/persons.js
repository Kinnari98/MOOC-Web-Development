// ./models/persons.js
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });
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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },

  number: {
    type: String,
    required: true,
  },
});

// const Person = mongoose.model("Person", personSchema);

// app.get("/api/persons", (request, response) => {
//   Person.find({}).then((persons) => {
//     response.json(persons);
//   });
// });

module.exports = mongoose.model("Person", personSchema);
