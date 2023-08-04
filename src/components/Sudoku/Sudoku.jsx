import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import SudokuGenerator from './SudokuGenerator';
import { generateSudokuBoard, solveSudoku, isValidValue, findEmptyCell } from './SudokuUtils';

import './Sudoku.css';

const Pagina2 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [isBoardGenerated, setIsBoardGenerated] = useState(false);
  const [board, setBoard] = useState([]);
  const [originalBoard, setOriginalBoard] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [hintIndex, setHintIndex] = useState(0); // Step 1: Create a state variable for hint index

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const newBoard = generateSudokuBoard(selectedDifficulty);
    if (Array.isArray(newBoard)) {
      setBoard(newBoard);
      setOriginalBoard(JSON.parse(JSON.stringify(newBoard)));
      setIsBoardGenerated(true);
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
  };

  const handleShowSolution = () => {
    if (isBoardGenerated) {
      const solvedBoard = JSON.parse(JSON.stringify(originalBoard));
      solveSudoku(solvedBoard);
      setBoard(solvedBoard);
      setShowSolution(true);
    }
  };

  const handleResetSudoku = () => {
    const newBoard = generateSudokuBoard(selectedDifficulty);
    setBoard(newBoard);
    setOriginalBoard(JSON.parse(JSON.stringify(newBoard)));
    setShowSolution(false);
  };


  const handleHintClick = () => {
    if (isBoardGenerated) {

      const emptyCells = [];
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col].value === 0) {
            emptyCells.push([row, col]);
          }
        }
      }

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const [row, col] = emptyCells[randomIndex];
        const correctValue = originalBoard[row][col].value;
        const updatedBoard = JSON.parse(JSON.stringify(board));
        updatedBoard[row][col].value = correctValue;
        setBoard(updatedBoard);
      }
    }
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
                <div>
                  {/* Step 3: Add event handler to the hintButton */}
                  <button className='hintButton' onClick={handleHintClick}>
                    Pista!
                  </button>
                </div>
              </>
            )}
            <div className='buttonsSudokuContainer'>
              <button className='solveButton' onClick={handleShowSolution}>
                Ver solución
              </button>
              <button className='resetSudokuButton' onClick={handleResetSudoku}>
                Nuevo tablero
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pagina2;
