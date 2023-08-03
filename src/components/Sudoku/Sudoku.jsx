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

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const newBoard = generateSudokuBoard(selectedDifficulty);
    if (Array.isArray(newBoard)) {
      setBoard(newBoard);
      setOriginalBoard(JSON.parse(JSON.stringify(newBoard))); // Almacenamos una copia del tablero original
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
    console.log('New board:', newBoard);
    setBoard(newBoard);
  };

  const handleShowSolution = () => {
    if (isBoardGenerated) {
      // Usamos la copia del tablero original para mostrar la solución sin sobrescribir los cambios del usuario
      const solvedBoard = JSON.parse(JSON.stringify(originalBoard)); // Hacemos una copia del tablero original
      solveSudoku(solvedBoard); // Resolvemos el Sudoku en la copia del tablero original
      setBoard(solvedBoard); // Actualizamos el tablero con la solución
      setShowSolution(true); // Mostramos la solución en el SudokuGenerator si lo deseas
    }
  };

  const handleResetSudoku = () => {
    const newBoard = generateSudokuBoard(selectedDifficulty);
    setBoard(newBoard);
    setOriginalBoard(JSON.parse(JSON.stringify(newBoard))); // Actualizamos la copia del tablero original
    setShowSolution(false);
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
                  <button className='hintButton'>
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
