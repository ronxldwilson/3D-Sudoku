// src/components/SudokuBoard

'use client';

import React from "react";

type SudokuBoardProps = {
  board: string[][];
  onChange: (row: number, col: number, val: string) => void;
  isPrefilled: (row: number, col: number) => boolean;
  isValid: (row: number, col: number, val: string) => boolean;
  layer: number;
};

export default function SudokuBoard({ board, onChange, isPrefilled, isValid }: SudokuBoardProps) {
  return (
    <div className="grid grid-rows-9 gap-1">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((value, colIndex) => {
            const valid = isValid(rowIndex, colIndex, value);

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                className={`w-10 h-10 text-center text-black text-lg font-semibold focus:outline-none border
                  ${colIndex % 3 === 0 ? 'border-l-2' : 'border-l'}
                  ${rowIndex % 3 === 0 ? 'border-t-2' : 'border-t'}
                  ${isPrefilled(rowIndex, colIndex) ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'}
                  ${!valid && !isPrefilled(rowIndex, colIndex) ? 'border-red-500' : 'border-gray-500'}
                `}
                maxLength={1}
                value={value}
                disabled={isPrefilled(rowIndex, colIndex)}
                onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
