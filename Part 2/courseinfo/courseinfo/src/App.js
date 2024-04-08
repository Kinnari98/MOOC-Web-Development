const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

// Poistettu props.id
const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);
// Muokattu Content -komponentti
const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
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
  const courses = [
    {
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  // Muokattu palautus mappaukseksi
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default App;
