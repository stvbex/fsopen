import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Anecdote = props => {
  const selected = props.selected
  const selected_anecdote = props.anecdotes[selected]
  const selected_votes = props.votes[selected]

  return (
    <>
      {selected_anecdote} <br />
      has {selected_votes} votes <br />
    </>
  )
}

const App = props => {
  const anecdotes = props.anecdotes
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotesIndex, setMaxVotesIndex] = useState(0)


  const handleVote = (i) => {
    return () => {
      const new_votes = [...votes]
      new_votes[i] += 1

      setVotes(new_votes)
      setMaxVotesIndex(new_votes.indexOf(Math.max(...new_votes)))
    }
  }

  const handleClick = () => {
    return setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote 
        anecdotes={anecdotes}
        votes={votes}
        selected={selected} />
      <button onClick={handleVote(selected)}>vote</button>
      <button onClick={handleClick}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote 
        anecdotes={anecdotes}
        votes={votes}
        selected={maxVotesIndex} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);