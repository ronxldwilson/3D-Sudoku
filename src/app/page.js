'use client'
import { useState } from 'react';
import CubeGrid from '../components/CubeGrid';
import { emptyCube } from '../lib/data';
import { isValidSudoku, isVerticallyValid } from '../lib/validator';

export default function Home() {
  const [cube, setCube] = useState(emptyCube);

  // Updates the value of a specific cell in the 3D cube
  function updateCell(layer, row, col, value) {
    const updated = JSON.parse(JSON.stringify(cube));
    updated[layer][row][col] = value;
    setCube(updated);
  }

  function checkAll() {
    const allLayersValid = cube.every(grid => isValidSudoku(grid));
    const verticalValid = isVerticallyValid(cube);
    alert(`All Sudoku Layers Valid: ${allLayersValid}\nVertical Uniqueness Valid: ${verticalValid}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">3D Sudoku</h1>
      <CubeGrid cube={cube} updateCell={updateCell} />
      <button
        onClick={checkAll}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Validate Cube
      </button>
    </div>
  );
}
