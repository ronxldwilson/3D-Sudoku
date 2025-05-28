// Check if a 9x9 grid is a valid Sudoku
export function isValidSudoku(grid) {
  const isValidBlock = (block) => {
    const seen = new Set();
    for (const num of block) {
      if (num === 0) continue; // Skip empty
      if (seen.has(num)) return false;
      seen.add(num);
    }
    return true;
  };

  for (let i = 0; i < 9; i++) {
    const row = grid[i];
    const col = grid.map(r => r[i]);
    const square = [];
    for (let r = Math.floor(i / 3) * 3; r < Math.floor(i / 3) * 3 + 3; r++) {
      for (let c = (i % 3) * 3; c < (i % 3) * 3 + 3; c++) {
        square.push(grid[r][c]);
      }
    }
    if (!isValidBlock(row) || !isValidBlock(col) || !isValidBlock(square)) {
      return false;
    }
  }

  return true;
}

// Check if each vertical column is unique through layers
export function isVerticallyValid(cube) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const seen = new Set();
      for (let layer = 0; layer < 9; layer++) {
        const value = cube[layer][row][col];
        if (value === 0) continue;
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
  }
  return true;
}
