const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

// Lisätty propsi 'ID'
const Part = (props) => (
  <p>
    {props.part.id} {props.part.name} {props.part.exercises}
  </p>
);

const Content = (props) => (
  <>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
    <Part part={props.parts[3]} />
  </>
);
// Laskee tehtävien yhteenlasketun määrän (TÄMÄ OLI MINUN KOODISSA JO EDELLISESSÄ OSASSA)
const Total = (props) => (
  <p>
    Exercises in total:{" "}
    {props.parts.reduce((total, part) => part.exercises + total, 0)}
  </p>
);
// Lisätty ID
const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default App;