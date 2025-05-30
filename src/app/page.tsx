// src/app/page.tsx

'use client';

import { useState } from 'react';
import SudokuBoard from '../components/SudokuBoard'; // 
import React from 'react';
import ThreeDSudokuView from '../components/ThreeDSudokuView'
import myPuzzles from '../../data/myPuzzles'

export default function ThreeDSudoku() {
  const [cube, setCube] = useState(() =>
    myPuzzles.map(layer => layer.map(row => [...row]))
  );
  const [selectedCell, setSelectedCell] = useState<{
    layer: number;
    row: number;
    col: number;
  } | null>(null);



  const handleCellChange = (layer: number, row: number, col: number, val: string) => {
    if (val === '' || /^[1-9]$/.test(val)) {
      const newCube = cube.map(layer => layer.map(row => [...row]));
      newCube[layer][row][col] = val;
      setCube(newCube);
    }
  };

  const isPrefilled = (layer: number, row: number, col: number) => {
    return myPuzzles[layer][row][col] !== '';
  };


  const isValid = (layer: number, row: number, col: number, val: string) => {
    if (val === '') return true;

    for (let i = 0; i < 9; i++) {
      if (i !== col && cube[layer][row][i] === val) return false;
      if (i !== row && cube[layer][i][col] === val) return false;
    }

    // ✅ Check 3x3 box in same layer
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && cube[layer][r][c] === val) return false;
      }
    }

    // ✅ 3D uniqueness: Check same cell in all other layers
    for (let l = 0; l < 9; l++) {
      if (l !== layer && cube[l][row][col] === val) return false;
    }

    return true;
  };

  return (
    <div className="p-4 min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">
        3D Sudoku
      </h1>
      <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto my-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900">How to Play 3D Sudoku</h2>
        <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed">
          <li>
            The 3D Sudoku puzzle consists of <strong>9 layers</strong>, each a standard 9x9 Sudoku grid.
          </li>
          <li>
            Each layer must follow the classic Sudoku rules:
            <ul className="list-disc list-inside ml-5 mt-1">
              <li>Each row must have numbers 1–9 without repetition.</li>
              <li>Each column must have numbers 1–9 without repetition.</li>
              <li>Each 3×3 box must have numbers 1–9 without repetition.</li>
            </ul>
          </li>
          <li>
            <strong>3D Rule:</strong> A number placed at a specific row and column must be unique across all layers in that exact cell position. For example, if Layer 1 has a &apos;5&apos; at (row 2, col 3), no other layer can have a &apos;5&apos; at (row 2, col 3).
          </li>
          <li>
            Click on any editable (non-prefilled) cell to select it. Type a number between 1 and 9 to fill the cell.
          </li>
          <li>
            Invalid moves will be visually indicated. You cannot enter a number that breaks the rules.
          </li>
          <li>
            Solve all 9 layers while satisfying both the traditional and 3D rules to complete the puzzle!
          </li>
        </ol>
        <p className="mt-6 text-sm text-gray-500 italic">
          Tip: Focus on one layer at a time, but keep cross-layer conflicts in mind.
        </p>
        <p className="mt-6 text-sm text-gray-500 italic">
          Tip 2: To get the better view of all the layers in 2D form, play on desktop and zoom out
        </p>
      </div>

      <ThreeDSudokuView cube={cube} />
      <div className="flex flex-wrap justify-center gap-10 mt-10 mb-40">
        {cube.map((layerBoard, layerIndex) => (
          <div key={layerIndex} className="space-y-2">
            <h2 className="text-center font-semibold text-black">
              Layer {layerIndex + 1}
            </h2>
            <SudokuBoard
              board={layerBoard}
              onChange={(row, col, val) =>
                handleCellChange(layerIndex, row, col, val)
              }
              isPrefilled={(row, col) => isPrefilled(layerIndex, row, col)}
              isValid={(row, col, val) => isValid(layerIndex, row, col, val)}
              layer={layerIndex}
              selectedCell={selectedCell}
              setSelectedCell={(row, col) => setSelectedCell({ layer: layerIndex, row, col })}
            />

          </div>
        ))}
      </div>
    </div>
  );
}
