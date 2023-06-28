import { useState } from "react"

const Title = ({ text }) => (
  <h2>{text}</h2>
)

const Button = (props) => (
  <button style={{ marginRight: '20px' }} onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = all / 3

  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg.toFixed(2)} />
        <StatisticLine text="positive" value={(good / all * 100).toFixed(2) + " %"} />
      </tbody>
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
