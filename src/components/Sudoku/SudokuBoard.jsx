import React, { useState } from 'react';
import Cell from './Cell';
import { findEmptyCell } from './SudokuUtils';

const SudokuBoard = ({ board, onCellChangeBoard }) => {

  const handleCellChangeBoard = (row, col, value) => {
    const numValue = parseInt(value, 10);
    console.log(numValue)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 9) {
      const updatedBoard = [...board];
      updatedBoard[row][col].value = numValue;
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
