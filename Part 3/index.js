const express = require("express");
const app = express();

const persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "moi", number: "39-23-6423122" },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
        <p>Puhelinluetelossa on ${persons.length} henkilön tiedot</p>
        <p>${date}</p>
    `);
});
