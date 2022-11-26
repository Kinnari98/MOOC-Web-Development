import { useState } from "react";

const Button = ({ onClick, buttonName }) => (
  <button onClick={onClick}> {buttonName}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {good + neutral + bad}</p>
      <p>Average {(good - bad) / (good + neutral + bad)}</p>
      <p>Positive {(good / (good + neutral + bad)) * 100} %</p>
    </div>
  );
};

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
