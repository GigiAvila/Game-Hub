import React from 'react'
import Square from './Square'
import './TicTacToe.css'

const Board = ({ squares, onClick, turn, winningSquares }) => {

  const createSquares = values => (values.map(value => <Square
    key={`square_${value}`}
    value={squares[value]}
    turn={turn}
    onClick={() => onClick(value)}
    winner={winningSquares.includes(value)}
  />))

  return (
    <div className='board'>
      <div className='row'>
        {createSquares([0, 1, 2])}
      </div>
      <div className='row'>
        {createSquares([3, 4, 5])}
      </div>
      <div className='row'>
        {createSquares([6, 7, 8])}
      </div>

    </div>
  )
}

export default Board
