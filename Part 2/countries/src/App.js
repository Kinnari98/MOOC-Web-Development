import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Virhe tapahtui:", error);
      }
    };

    getCountries();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Countries yay!</h1>
      <div>
        Etsi maita: <input value={search} onChange={handleSearch} />
      </div>
      <ShowCountries
        countries={countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </div>
  );
}

function ShowCountries({ countries }) {
  if (countries.length > 10) {
    return <p>Liikaa vastaavuuksia</p>;
  } else if (countries.length === 1) {
    return <Information country={countries[0]} />;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    );
  }
}

function Information({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Pääkaupunki: {country.capital}</p>
      <p>Asukasluku: {country.population}</p>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px" }}
      />
      <h3>Kielet:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
