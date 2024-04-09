import { useEffect, useState } from "react";
import personService from "./services/persons.js";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((originalPersons) => {
      setPersons(originalPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };

    const doesNameExist = persons.some((person) => person.name === newName);
    if (doesNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhoneNumber("");
      });
    }
  };

  const handleRemove = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmRemove = window.confirm(`Delete ${person.name}?`);

    if (confirmRemove) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handlePhoneNumberChange = (event) =>
    setNewPhoneNumber(event.target.value);

  const handleFiltering = (event) => setFilter(event.target.value);

  let filteredPersons = [];
  for (let person of persons) {
    if (person.name.toLowerCase().includes(filter.toLowerCase())) {
      filteredPersons.push(person);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">Add contact</button>
        </div>
      </form>
      <h2>Filter contacts</h2>
      <div>
        Filter search: <input value={filter} onChange={handleFiltering} />
      </div>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
            <button
              onClick={() => handleRemove(person.id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
