const express = require("express");
const app = express();
const morgan = require("morgan");

// MUISTILISTA KALLELLE
// MUISTA KOMMENTOIDA AINA UUDET SETIT!!!

app.use(express.json());
// app.use(morgan('dev'));
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
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const initialLength = persons.length;
  persons = persons.filter((person) => person.id !== id);

  if (persons.length < initialLength) {
    response.status(204).end();
  } else {
    response.status(404).send({ error: "Not found" });
  }
});

// Hakee ID:n perusteella henkilön
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response
      .status(404)
      .send({ error: "Sorry! Couldnt find anything corresponding" });
  }
});
// Hakee henkilöt
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// FUnktio joka lisää henkilön
function AddPerson() {
  const ID = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return Math.floor(Math.random() * 10) + ID + 1;
}

// Lisää yhteystiedot taulukkoon
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Missing something?" });
  }
  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: AddPerson(),
    name: body.name,
    number: body.number,
  };

  persons.push(person);
  response.json(person);
});

// Katsotaan tätä myöhemmin uudestaan, ei toimi atm
/*morgan.token("sendData", function (req) {
  return JSON.stringify(req.body);
}); */

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
