import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Statistic = props => {
  if (props.percentage) {
    // return (
    //   <>
    //     {props.text} {props.value} % <br />
    //   </>
    // )

    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }

  // return (
  //   <>
  //     {props.text} {props.value} <br />
  //   </>
  // )

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = props => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  if (good+neutral+bad === 0){
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={good+neutral+bad} />
          <Statistic 
            text='average' 
            value={(good-bad) / (good+neutral+bad)} />
          <Statistic 
            text='positive' 
            value={good * 100 / (good+neutral+bad)} 
            percentage={true} />
        </tbody>
      </table>
    </>
  )
}

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good+1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral+1)} />
      <Button text='bad' handleClick={() => setBad(bad+1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

