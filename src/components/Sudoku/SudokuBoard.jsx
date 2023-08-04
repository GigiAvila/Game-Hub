import React from 'react';
import Cell from './Cell';
import { findEmptyCell } from './SudokuUtils';

const SudokuBoard = ({ board, onCellChangeBoard }) => {
  console.log('SudokuBoard rendered');

  const handleCellChangeBoard = (row, col, value, isHint = false) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 9) {
      const updatedBoard = [...board];
      updatedBoard[row][col].value = numValue;
      if (isHint) {
        updatedBoard[row][col].isFixed = true;
      }
      onCellChangeBoard(updatedBoard);
    } else {
      const updatedBoard = [...board];
      updatedBoard[row][col].value = '';
      onCellChangeBoard(updatedBoard);
    }
  };

  return (
    <div className="SudokuBoard">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell.value}
              isFixed={cell.isFixed}
              onChange={(value) => handleCellChangeBoard(rowIndex, colIndex, value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
