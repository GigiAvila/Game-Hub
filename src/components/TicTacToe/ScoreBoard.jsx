import React from 'react'
import './TicTacToe.css';

const ScoreBoard = ({ scoreX, scoreO }) => {
  return (
    <div className='score-board'>
      <div>{scoreX}</div>
      <div>{scoreO}</div>
    </div>
  )
}

export default ScoreBoard