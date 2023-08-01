import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Loading from '../Loading/Loading'
import Modal from '../Modal/Modal'
import Board from './Board'
import ScoreBoard from './ScoreBoard'


import './TicTacToe.css'


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

const TicTacToe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showTurnModal, setShowTurnModal] = useState(false);
  const [showWinningModal, setShowWinningModal] = useState(false);
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
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setShowTurnModal(true);
    }
  }, [isLoading]);


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


  const handleResetButton = () => {
    setShowTurnModal(false);
    setShowWinningModal(false);
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
    setScore({
      X: 0,
      O: 0,
    });
  };
  const resetGame = () => {
    setShowWinningModal(false);
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
    setShowTurnModal(false);
  };

  const endGame = (result, winningPositions) => {
    setTurn(null);

    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1
      });
      setShowWinningModal(true);
    }

    setWinningSquares(winningPositions);
    setTimeout(() => {
      resetGame();
    }, 3000)

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
            <button className='resetButton' onClick={handleResetButton}>
              Volver a jugar
            </button>
          </div>
          <div className='TicTacToe-container'>
            <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick} />
            <ScoreBoard scoreO={score.O} scoreX={score.X} />
          </div>
        </>
      )}
      {showWinningModal && squares[winningSquares[0]] === 'X' && (
        <Modal message="¡Ganaste la partida! 🍾 " />
      )}
      {showWinningModal && squares[winningSquares[0]] === 'O' && (
        <Modal message="Ups! Has perdido 😢" />
      )}
      {showTurnModal && <Modal message="En este juego serás la X" />}
    </>
  );
};

export default TicTacToe