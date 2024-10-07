import { useState } from 'react'

const Header = () => (<h1>Please give us your feedback</h1>)

const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>)

const StatisticLine = (props) => {
  console.log(props)
  return (
      <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      </tr>
   )
}

const Statistics = (props) => {
  // console.log(props)
  if (props.good + props.neutral + props.bad > 0) {
    return (
      <div>
        <h2>statistical overview</h2>
        <table>
          <tr>
            <th>statistic</th>
            <th align="left">value</th>
          </tr>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="total" value ={props.good + props.neutral + props.bad} />
          <StatisticLine text="average" value ={(props.good *1 + props.neutral *0 + props.bad *-1)/(props.good + props.neutral + props.bad)} />
          <StatisticLine text="positive" value ={`${parseFloat(props.good /(props.good + props.neutral + props.bad))*100} %`} />
        </table>
      </div>
    ) 
  } {
    return (
      <p>
        no feedback has been given yet
      </p>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log('increasing, good value before', good)
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    console.log('increasing, neutral value before', neutral)
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    console.log('increasing, bad value before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <Header />
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App