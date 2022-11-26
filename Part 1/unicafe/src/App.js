import { useState } from "react";

const Button = ({ onClick }) => <button onClick={onClick}></button>;

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback to improve our cafe!</h1>
      <Button onClick={increment(good, setGood)}>Good</Button>
      <Button onClick={increment(neutral, setNeutral)}>Neutral</Button>
      <Button onClick={increment(bad, setBad)}>Bad</Button>

      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  );
};

export default App;
