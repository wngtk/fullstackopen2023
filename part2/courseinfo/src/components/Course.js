const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = ({parts}) => (
  <div>
    { parts.map((part, idx) => <Part key={idx} name={part.name} exercises={part.exercises} />)}
  </div>
)

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((total, {exercises}) => total + exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = (props) => {
  const course = props.course
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course