'use client';

import { useState } from 'react';
import SudokuBoard from '../components/SudokuBoard';

const defaultPuzzle = [
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

export default function SudokuGame() {
  const [boards, setBoards] = useState([
    {
      puzzle: defaultPuzzle,
      board: defaultPuzzle.map((row) => [...row]),
    },
  ]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8 p-4">

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {boards.map((item, index) => (
          <SudokuBoard
            key={index}
            puzzle={item.puzzle}
            board={item.board}
            setBoard={(newBoard) => {
              const newBoards = [...boards];
              newBoards[index].board = newBoard;
              setBoards(newBoards);
            }}
          />
          
        ))}

        {boards.map((item, index) => (
          <SudokuBoard
            key={index}
            puzzle={item.puzzle}
            board={item.board}
            setBoard={(newBoard) => {
              const newBoards = [...boards];
              newBoards[index].board = newBoard;
              setBoards(newBoards);
            }}
          />
          
        ))}

        {boards.map((item, index) => (
          <SudokuBoard
            key={index}
            puzzle={item.puzzle}
            board={item.board}
            setBoard={(newBoard) => {
              const newBoards = [...boards];
              newBoards[index].board = newBoard;
              setBoards(newBoards);
            }}
          />
          
        ))}
      </div>
    </div>
  );
}
