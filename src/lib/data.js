// cube[layer][row][col] — 9 layers of 9x9 sudoku
export const emptyCube = Array.from({ length: 9 }, () =>
  Array.from({ length: 9 }, () => Array(9).fill(0))
);
