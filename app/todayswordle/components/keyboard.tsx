'use client';

import React from 'react';
import { LetterState } from '../types';


const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

function getKeyStyle(key: string){
  const baseStyle = "h-14 rounded font-bold text-sm mx-0.5 border-2 border-[#233457] text-gray-400 w-10 key-hover-effect";
  
  if (key === 'ENTER') {
    return `${baseStyle} bg-[#4558c4] text-white min-w-[85px] border-none enter-key-hover`;
  }
  
  if (key === 'DEL') {
    return `${baseStyle} bg-red-500 text-white min-w-[65px] border-none del-key-hover`;
  }

  return `${baseStyle} bg-gray-900`;
}


export function Keyboard( onKeyPress : (key: string) => void) {
  function handleClick(key: string) {
    onKeyPress(key);
  };

  return (
    <div className="w-full max-w-[500px] p-4">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => {
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={getKeyStyle(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
} 