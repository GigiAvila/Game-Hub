import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Loading from '../components/Loading/Loading'
import Modal from '../components/Modal/Modal'
import Board from '../components/TicTacToe/Board'

import '../components/TicTacToe/TicTacToe.css'


const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Pagina1 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [turn, setTurn] = useState('X')
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);


  const checkForWinner = newSquares => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        endGame(newSquares[a], winningPositions[i]);
        return
      }
    }
    if (!newSquares.includes(null)) {
      //empate (si no hay ganador y ningun square es null(no es x ni o))
      endGame(null, Array.from(Array(10).keys()));
      return
    }
    setTurn(turn === 'X' ? 'O' : 'X');

  }


  const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn)
    setSquares(newSquares);
    checkForWinner(newSquares);

  }

  const endGame = (result, winningPositions) => {
    setTurn(null);
    // null sería un empate
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1
      });
      setShowModal(true);
    }
    // la posición ganadora
    setWinningSquares(winningPositions);
  };

  const resetGame = () => {
    setShowModal(false);
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);

    const squaresWithInitialClasses = Array(9).fill('square');
    setSquares(squaresWithInitialClasses);
  };
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='titleContainer'>
            <h1>Tic Tac Toe</h1>
            <button className='resetButton' onClick={resetGame}>
              Volver a jugar
            </button>
          </div>
          <div className='TicTacToe-container'>
            <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick} />
          </div>
        </>
      )}
      {showModal && <Modal message="¡Felicitaciones! ¡Ganaste!" />}
    </>
  )
}

export default Pagina1