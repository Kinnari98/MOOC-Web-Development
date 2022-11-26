import { useState } from "react";

const Button = ({ onClick, buttonName }) => (
  <button onClick={onClick}> {buttonName}</button>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const counter = (counterState, setState) => () => setState(counterState + 1);

  return (
    <div>
      <h1>Give feedback to improve our cafe!</h1>
      <Button onClick={counter(good, setGood)} buttonName="Good" />
      <Button onClick={counter(neutral, setNeutral)} buttonName="Neutral" />
      <Button onClick={counter(bad, setBad)} buttonName="Bad" />

      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  );
};

export default App;
