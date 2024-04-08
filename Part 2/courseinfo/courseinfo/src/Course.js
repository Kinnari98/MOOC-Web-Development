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

// Laskee tehtävien yhteenlasketun määrän
const Total = (props) => (
  <p>
    Exercises in total:{" "}
    {props.parts.reduce((total, part) => part.exercises + total, 0)}
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
