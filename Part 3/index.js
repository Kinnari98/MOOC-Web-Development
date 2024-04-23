const express = require("express");
const app = express();
const morgan = require("morgan");

// MUISTILISTA KALLELLE
// MUISTA KOMMENTOIDA AINA UUDET SETIT!!!

app.use(express.json());
app.use(morgan("tiny"));
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

// FUnktio joka lisää henkilön
function AddPerson() {
  const ID = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return Math.floor(Math.random() * 100) + ID + 1;
}

// Lisää yhteystiedot taulukkoon
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing something?" });
  }
  if (persons.some((p) => p.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: AddPerson(),
    name: body.name,
    number: body.number,
  };

  persons.push(person);
  res.json(person);
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
