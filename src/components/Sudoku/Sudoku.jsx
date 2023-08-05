import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import SudokuGenerator from './SudokuGenerator';
import { generateSudokuBoard, solveSudoku } from './SudokuUtils';
import Modal from '../Modal/Modal';
import './Sudoku.css';

const Pagina2 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [isBoardGenerated, setIsBoardGenerated] = useState(false);
  const [board, setBoard] = useState([]);
  const [originalBoard, setOriginalBoard] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [solvedBoard, setSolvedBoard] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [GameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const newBoard = generateSudokuBoard(selectedDifficulty);
    if (Array.isArray(newBoard)) {
      setOriginalBoard(newBoard);
      setBoard(JSON.parse(JSON.stringify(newBoard)));
      setIsBoardGenerated(true);

      const solvedCopy = JSON.parse(JSON.stringify(newBoard));
      solveSudoku(solvedCopy);
      setSolvedBoard(solvedCopy);
    }

    return () => clearTimeout(loadingTimer);
  }, [selectedDifficulty]);

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setSelectedDifficulty(newDifficulty);
    setShowSolution(false);
  };

  const handleCellChangeBoard = (newBoard) => {
    setBoard(newBoard);
    checkGameCompleted();
  };

  const checkGameCompleted = () => {
    if (!GameCompleted) {
      const isComplete = JSON.stringify(board) === JSON.stringify(solvedBoard);
      if (isComplete) {
        setGameCompleted(true);
        showModal();
      }
    }
  };

  const handleShowSolution = () => {
    if (isBoardGenerated) {
      const solvedCopy = JSON.parse(JSON.stringify(solvedBoard));
      setBoard(solvedCopy);
      setShowSolution(true);
    }
  };

  const handleResetSudoku = () => {
    const newBoard = generateSudokuBoard(selectedDifficulty);
    setOriginalBoard(newBoard);
    setBoard(JSON.parse(JSON.stringify(newBoard)));
    setShowSolution(false);

    const solvedCopy = JSON.parse(JSON.stringify(newBoard));
    solveSudoku(solvedCopy);
    setSolvedBoard(solvedCopy);

  };

  const handleHintClick = () => {
    if (isBoardGenerated) {
      const emptyCells = [];
      for (let row = 0; row < originalBoard.length; row++) {
        for (let col = 0; col < originalBoard[row].length; col++) {
          if (originalBoard[row][col].value === 0) {
            emptyCells.push({ row, col });
          }
        }
      }

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomIndex];

        const updatedBoard = JSON.parse(JSON.stringify(board));
        updatedBoard[row][col].value = solvedBoard[row][col].value;

        setBoard(updatedBoard);
      }
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='sudokuGameContainer'>
            <h1 className='sudokuTitle'>Sudoku</h1>
            <div className='selectContainer'>
              <label className='selectLabel'>
                Selecciona nivel de dificultad
                <select value={selectedDifficulty} onChange={handleDifficultyChange}>
                  <option className='selectOption' value='easy'>
                    Fácil
                  </option>
                  <option className='selectOption' value='medium'>
                    Medio
                  </option>
                  <option className='selectOption' value='hard'>
                    Difícil
                  </option>
                </select>
              </label>
            </div>
            {isBoardGenerated && (
              <>
                <SudokuGenerator
                  board={board}
                  difficulty={selectedDifficulty}
                  onCellChangeBoard={handleCellChangeBoard}
                />
              </>
            )}
            <div className='buttonsSudokuContainer'>
              <button className='hintButton' onClick={handleHintClick}>
                Pista!
              </button>
              <button className='solveButton' onClick={handleShowSolution}>
                Ver solución
              </button>
              <button className='resetSudokuButton' onClick={handleResetSudoku}>
                Nuevo tablero
              </button>
            </div>
          </div>
          {isModalVisible && (
            <Modal
              message='¡Felicidades! ¡Has completado el juego!'
              onClose={() => setIsModalVisible(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Pagina2;
