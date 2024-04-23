const express = require("express");
const app = express();

// Kovakoodattu data
let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "moi", number: "39-23-6423122" },
];

// Poistaa ID:n perusteella yhteystiedot. HTTP-komento toisessa tiedostossa.
// Tämä tehtiin Visual Studion REST Clientillä
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = persons.length;
  persons = persons.filter((person) => person.id !== id);

  if (persons.length < initialLength) {
    res.status(204).end();
  } else {
    res.status(404).send({ error: "Resource not found" });
  }
});

// Hakee ID:n perusteella henkilön
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res
      .status(404)
      .send({ error: "Sorry! Couldnt find anything corresponding" });
  }
});
// Hakee henkilöt
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {});

// Hakee puhelinluettelon teidot
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
        <p>Phonebook has info for ${persons.length} peple</p>
        <p>${date}</p>
    `);
});
