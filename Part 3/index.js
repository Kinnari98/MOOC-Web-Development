// ./index.js
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/persons");
require("dotenv").config();

// MUISTILISTA KALLELLE
// MUISTA KOMMENTOIDA AINA UUDET SETIT!!!

app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));
app.use(morgan("tiny"));

// Kovakoodattu data
// let persons = [
//   { id: 1, name: "Arto Hellas", number: "040-123456" },
//   { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
//   { id: 3, name: "Dan Abramov", number: "12-43-234345" },
//   { id: 4, name: "moi", number: "39-23-6423122" },
// ];

// Poistaa ID:n perusteella yhteystiedot. HTTP-komento toisessa tiedostossa.
// Tämä tehtiin Visual Studion REST Clientillä
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch(next);
});

// Hakee ID:n perusteella henkilön
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((contact) => {
      response.json(contact);
    })
    .catch(next);
});

// Hakee henkilöt
app.get("/api/persons", (request, response) => {
  Person.find({}).then((allPersons) => {
    response.json(allPersons);
  });
});

// Lisää yhteystiedot taulukkoon
app.post("/api/persons", async (request, response) => {
  const { name, number } = request.body;
  console.log(number);
  if (!name || !number) {
    return response.status(400).json({ error: "Missing something?" });
  }

  const existingContact = await Person.findOne({ name: name });

  if (existingContact) {
    return response.status(409).json({
      error: `Can't do that ${name}, already exist`,
    });
  }

  await Person.create({ name: name, number: number })
    .then((contact) => {
      response.json(contact);
    })
    .catch((error) => {
      next(error);
    });
});

// Katsotaan tätä myöhemmin uudestaan, ei toimi atm
/*morgan.token("sendData", function (req) {
  return JSON.stringify(req.body);
}); */

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "ID not found" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {});

// Hakee puhelinluettelon teidot
app.get("/info", (request, response) => {
  const date = new Date();
  response.send(`
        <p>Phonebook has info for ${persons.length} peple</p>
        <p>${date}</p>
    `);
});
