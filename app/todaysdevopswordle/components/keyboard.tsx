'use client';

import React from 'react';
import { LetterState } from '../types';
import { Lexend } from 'next/font/google';

const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] });


const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

function getKeyStyle(key: string, letterState?: LetterState) {
  const baseStyle = `h-[45px] sm:h-14 rounded font-bold text-xs sm:text-sm mx-0.5 border-2 border-[#233457] text-gray-400 w-[32px] sm:w-10 key-hover-effect ${lexend.className}`;
  
  if (key === 'ENTER') {
    return `${baseStyle} bg-[#4558c4] text-white min-w-[65px] sm:min-w-[85px] border-none enter-key-hover`;
  }
  
  if (key === 'DEL') {
    return `${baseStyle} bg-red-500 text-white min-w-[50px] sm:min-w-[65px] border-none del-key-hover`;
  }

  switch (letterState) {
    case LetterState.CORRECT:
      return `${baseStyle} bg-[#4558c4] text-white border-none`;
    case LetterState.PRESENT:
      return `${baseStyle}  bg-[#F8BA48] text-white border-none`;
    case LetterState.ABSENT:
      return `${baseStyle} bg-gray-800 text-gray-600 border-none`;
    default:
      return `${baseStyle} bg-gray-900`;
  }
}


export function Keyboard({ onKeyPress, letterStates }: { 
  onKeyPress: (key: string) => void, 
  letterStates: Map<string, LetterState> 
}) {
  function handleClick(key: string) {
    onKeyPress(key);
  }

  return (
    <>
    <div className="w-full max-w-[500px] pt-2 sm:pt-1">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1 sm:mb-2">
          {row.map((key) => {
            const letterState = key !== 'ENTER' && key !== 'DEL' ? letterStates.get(key) : undefined;
            return (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className={getKeyStyle(key, letterState)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
    </>
  );
} 