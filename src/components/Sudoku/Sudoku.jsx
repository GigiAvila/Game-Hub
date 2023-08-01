import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import SudokuBoard from './SudokuBoard';
import SudokuGenerator from './SudokuGenerator'; // Import isValidValue from SudokuGenerator
import { generateSudokuBoard, isValidValue } from './SudokuUtils';

import './Sudoku.css';

const Pagina2 = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [isBoardGenerated, setIsBoardGenerated] = useState(false);
  const [board, setBoard] = useState([]);
  const [hintedNumbers, setHintedNumbers] = useState([]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setBoard(generateSudokuBoard(selectedDifficulty));
    setIsBoardGenerated(true);

    return () => clearTimeout(loadingTimer);
  }, [selectedDifficulty]);

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setSelectedDifficulty(newDifficulty);
  };

  const handleCellChangeBoard = (newBoard) => {
    setBoard(newBoard);
    // Clear hinted numbers when cell values change
    setHintedNumbers([]);
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
              <SudokuGenerator
                difficulty={selectedDifficulty}
                onCellChangeBoard={handleCellChangeBoard}
              />
            )}
            <div className='buttonsSudokuContainer'>
              <button className='hintButton' > Pista!</button>
              <button className='solveButton' > Ver solución</button>
              <button className='resetSudokuButton'>Volver a jugar</button>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Pagina2;