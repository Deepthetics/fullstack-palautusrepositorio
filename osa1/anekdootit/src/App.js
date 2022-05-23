import { useState } from 'react'

const App = () => {
  // make anecdotes into objects with attributes: text, votes
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [top, setTop] = useState(0)

  const handleVoteClick = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)

    if (copy[selected] > copy[top]) {
      setTop(selected)
    }
  }

  const handleNextClick = () => {
    const index = Math.floor(Math.random()*(6-0+1)+0)
    setSelected(index)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes.</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[top]}</p>
      <p>Has {votes[top]} votes.</p>
    </div>
  )
}

export default App
