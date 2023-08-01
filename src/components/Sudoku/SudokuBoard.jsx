import React, { useState } from 'react';
import Cell from './Cell';
import { solveSudoku, isValidValue, findEmptyCell } from './SudokuUtils';

const SudokuBoard = ({ board, onCellChangeBoard, showHint }) => {

  const handleCellChangeBoard = (row, col, value) => {
    const numValue = parseInt(value, 10);
    console.log(numValue)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 9) {
      const updatedBoard = [...board];
      updatedBoard[row][col].value = numValue;
      onCellChangeBoard(row, col, numValue);



    } else {

      const updatedBoard = [...board];
      updatedBoard[row][col].value = '';
      onCellChangeBoard(row, col, 0);
    }
  };



  const isSudokuSolved = (board) => {
    // Optional: Check if the Sudoku board is solved using the solveSudoku function from sudokuUtils
    // Return true if solved, false otherwise
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