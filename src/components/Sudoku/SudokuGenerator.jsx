import React, { useEffect } from 'react';
import SudokuBoard from './SudokuBoard';
import { generateSudokuBoard, solveSudoku, isValidValue, findEmptyCell } from './SudokuUtils';

const SudokuGenerator = ({ difficulty, onCellChangeBoard, board, }) => {
  useEffect(() => {
    const newBoard = generateSudokuBoard(difficulty);
    onCellChangeBoard(newBoard);
  }, [difficulty]);

  return (
    <div>
      <SudokuBoard
        board={board}
        onCellChangeBoard={onCellChangeBoard}

      />
    </div>
  );
};

export default SudokuGenerator;
