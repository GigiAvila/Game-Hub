
import React, { useState, useEffect } from 'react';
import SudokuBoard from './SudokuBoard';
import { generateSudokuBoard } from './SudokuUtils'; // Import the functions from sudokuUtils

const SudokuGenerator = ({ difficulty, invalidNumbers }) => { // Asegúrate de recibir la prop invalidNumbers
  const [board, setBoard] = useState([]);

  useEffect(() => {
    // Generate a new Sudoku board when the difficulty changes
    const newBoard = generateSudokuBoard(difficulty);
    setBoard(newBoard);
  }, [difficulty]);

  const handleCellChangeGenerator = (row, col, value) => { // Renombrar la función a handleCellChangeGenerator
    // Update the value of the cell in the generated board when the user makes changes
    const updatedBoard = [...board];
    updatedBoard[row][col].value = value;
    setBoard(updatedBoard);
    console.log(updatedBoard);

  };

  return (
    <div>
      {/* Render the generated Sudoku board using the SudokuBoard component */}
      <SudokuBoard board={board} onCellChangeBoard={handleCellChangeGenerator} invalidNumbers={invalidNumbers} /> {/* Pasar la prop invalidNumbers al componente SudokuBoard */}
    </div>
  );
};

export default SudokuGenerator;