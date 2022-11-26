import { useState } from "react";

const Button = ({ onClick, buttonName }) => (
  <button onClick={onClick}> {buttonName}</button>
);

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const avg = (good - bad) / (good + neutral + bad);
  const total = good + neutral + bad;
  const pos = (good / total) * 100 + "%";

  return good + neutral + bad > 0 ? (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine name="Good" value={good} />
          <StatisticLine name="Neutral" value={neutral} />
          <StatisticLine name="Bad" value={bad} />
          <StatisticLine name="Total" value={total} />
          <StatisticLine name="Average" value={avg} />
          <StatisticLine name="Positive" value={pos} />
        </tbody>
      </table>
    </div>
  ) : (
    <p>No feedback given</p>
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
