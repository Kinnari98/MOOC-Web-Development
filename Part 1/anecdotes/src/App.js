import { useState } from "react";

console.log("Hello anecdotes");

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  console.log("Here are some examples:", anecdotes[4]);

  const [selected, setSelected] = useState(0);

  const rndm = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <button onClick={rndm}>Click to view a random anecdote</button>
    </div>
  );
};

export default App;
