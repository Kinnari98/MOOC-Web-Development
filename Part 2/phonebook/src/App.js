import { useEffect, useState } from "react";
import axios from "axios";

// Kovakoodattu valmisdata
const App = () => {
  const [persons, setPersons] = useState([]);

  // Haetaan alkutila
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((Response) => {
      setPersons(Response.data);
    });
  });

  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    };

    //Tarkistetaan olemassa oleva henkilö, toteutetaan tämä if-lauseella
    const doesNameExist = persons.some((person) => person.name === newName);
    if (doesNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((Response) => {
          setPersons(persons.concat(Response.data));
        })
        .catch((error) => {
          alert("Error! Couldn't add person to phonebook");
        });
    }
  };

  // Päivittää newName tilan käyttäjän antaman syötteen mukaan
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Kopioidaan handleNameChange -> handlePhonNumberChange
  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleFiltering = (event) => {
    setFilter(event.target.value);
  };
  // Toteutetaan filteröinti for-loopilla
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
        <h2>Filter contacts</h2>
        <div>
          Filter search: <input value={filter} onChange={handleFiltering} />
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

// Filtteröinti -toiminta säilytetty datan printtaamisessa

export default App;
