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
      {/* <ThreeDSudokuView cube={cube} /> */}
      <div className="flex flex-wrap justify-center gap-10 mt-10">
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
