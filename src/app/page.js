'use client';

import { useState } from 'react';

export default function SudokuBoard() {
  const puzzle = [
    ['5', '3', '', '', '7', '', '', '', ''],
    ['6', '', '', '1', '9', '5', '', '', ''],
    ['', '9', '8', '', '', '', '', '6', ''],
    ['8', '', '', '', '6', '', '', '', '3'],
    ['4', '', '', '8', '', '3', '', '', '1'],
    ['7', '', '', '', '2', '', '', '', '6'],
    ['', '6', '', '', '', '', '2', '8', ''],
    ['', '', '', '4', '1', '9', '', '', '5'],
    ['', '', '', '', '8', '', '', '7', '9'],
  ];

  const [board, setBoard] = useState(puzzle);

  const isPrefilled = (row, col) => puzzle[row][col] !== '';

  const isValid = (row, col, value) => {
    if (value === '') return true;

    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === value) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === value) return false;
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === value) return false;
      }
    }

    return true;
  };

  const handleChange = (row, col, value) => {
    if (value === '' || /^[1-9]$/.test(value)) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value;
      setBoard(newBoard);
    }
  };

  return (
    <div className="p-4  min-h-screen flex items-center justify-center">
      <div className="grid grid-rows-9 gap-1">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => {
              const value = board[rowIndex][colIndex];
              const valid = isValid(rowIndex, colIndex, value);

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-10 h-10 text-center text-white text-lg font-semibold 
                    focus:outline-none border
                    ${colIndex % 3 === 0 ? 'border-l-2' : 'border-l'}
                    ${rowIndex % 3 === 0 ? 'border-t-2' : 'border-t'}
                    ${isPrefilled(rowIndex, colIndex) ? 'bg-gray-700 cursor-not-allowed' : 'bg-black'}
                    ${!valid && !isPrefilled(rowIndex, colIndex) ? 'border-red-500' : 'border-gray-500'}`}
                  maxLength={1}
                  value={value}
                  disabled={isPrefilled(rowIndex, colIndex)}
                  onChange={(e) =>
                    handleChange(rowIndex, colIndex, e.target.value)
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
