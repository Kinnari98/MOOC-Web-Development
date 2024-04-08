import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1231244" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    //Tarkistetaan olemassa oleva henkilö, toteutetaan tämä if-lauseella

    const doesNameExist = persons.some((person) => person.name === newName);
    if (doesNameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
      };
      // Lisää uuden henkilön persons tilaan, jos nimeä ei ole luettelossa
      setPersons(persons.concat(newPerson));
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}{" "}
    </div>
  );
};

export default App;
