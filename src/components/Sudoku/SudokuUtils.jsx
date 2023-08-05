/// Función para crear un tablero de Sudoku vacío
export const createEmptyBoard = () => {
  const board = [];
  for (let row = 0; row < 9; row++) {
    board.push([]);
    for (let col = 0; col < 9; col++) {
      board[row].push({
        value: 0, // Inicialmente, todas las celdas tienen un valor de 0
        isFixed: false, // Puedes usar esto para marcar celdas iniciales fijas que no pueden cambiarse
      });
    }
  }
  return board;
};

// Función para comprobar si un valor es válido para una celda en particular en el tablero
export const isValidValue = (board, row, col, num) => {
  // Check if the value already exists in the same row
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === num) {
      return false;
    }
  }

  // Check if the value already exists in the same column
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === num) {
      return false;
    }
  }

  // Check if the value already exists in the same 3x3 subgrid
  const subgridStartRow = Math.floor(row / 3) * 3;
  const subgridStartCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[subgridStartRow + i][subgridStartCol + j].value === num) {
        return false;
      }
    }
  }

  return true;
};

// Función para resolver el tablero de Sudoku utilizando backtracking
export const solveSudoku = (board) => {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) {
    // No more empty cells, the Sudoku is solved
    return true;
  }

  const [row, col] = emptyCell;
  const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Shuffle the numbers

  for (const num of nums) {
    if (isValidValue(board, row, col, num)) {
      board[row][col].value = num;

      if (solveSudoku(board)) {
        return true;
      }

      // Backtrack: If the current number does not lead to a solution, reset the cell value
      board[row][col].value = 0;
    }
  }

  // No valid value found, need to backtrack
  return false;
};

// Función para encontrar la próxima celda vacía en el tablero
export const findEmptyCell = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === 0) {
        return [row, col];
      }
    }
  }

  // No more empty cells
  return null;
};

// Utility function to shuffle an array using the Fisher-Yates algorithm
export const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};


// Función para ocultar algunos números en el tablero basándose en la dificultad
export const hideNumbers = (board, difficulty) => {
  // Calculate the number of cells to hide based on the difficulty
  let cellsToHide = 0;
  switch (difficulty) {
    case 'easy':
      cellsToHide = 40;
      break;
    case 'medium':
      cellsToHide = 50;
      break;
    case 'hard':
      cellsToHide = 55;
      break;
    default:
      cellsToHide = 40;
      break;
  }

  // Create an array of all cell positions
  const cellPositions = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cellPositions.push([row, col]);
    }
  }

  // Shuffle the array randomly to get random cell positions
  for (let i = cellPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cellPositions[i], cellPositions[j]] = [cellPositions[j], cellPositions[i]];
  }

  // Hide the numbers by setting them to 0 at random cell positions
  for (let i = 0; i < cellsToHide; i++) {
    const [row, col] = cellPositions[i];
    board[row][col].value = 0;
    board[row][col].isFixed = true;
  }
};


// Función para generar un tablero de Sudoku válido y único y ocultar algunos números
export const generateSudokuBoard = (difficulty) => {
  const board = createEmptyBoard();

  // Implement the Sudoku generation algorithm using backtracking to fill the board
  solveSudoku(board);

  hideNumbers(board, difficulty);

  return board;
};
