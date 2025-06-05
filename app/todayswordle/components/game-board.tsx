'use client';

import React from 'react';
import { LetterState, GameConfig } from '../types';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
  config: GameConfig;
}

const getTileStyle = (letterState: LetterState) => {
  const baseStyle = "w-14 h-14 border-2 rounded flex items-center justify-center text-2xl font-bold m-0.5";

  switch (letterState) {
    case LetterState.CORRECT:
      return `${baseStyle} bg-red-500 text-white border-none`;
    case LetterState.PRESENT:
      return `${baseStyle} bg-[#4558c4] text-white border-none`;
    case LetterState.ABSENT:
      return `${baseStyle} border-[#233457] text-gray-400`;
    default:
      return `${baseStyle} border-[#233457] text-gray-400`;
  }
};

const getLetterState = (letter: string, index: number, targetWord: string): LetterState => {
  if (!letter) return LetterState.PENDING;
  if (targetWord[index] === letter) return LetterState.CORRECT;
  if (targetWord.includes(letter)) return LetterState.PRESENT;
  return LetterState.ABSENT;
};

export function GameBoard({ guesses, currentGuess, targetWord, config }: GameBoardProps) {
  const { wordLength, maxAttempts } = config;
  const rows = Array(maxAttempts).fill('');

  return (
    <div className="grid gap-1 p-4">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {Array(wordLength).fill('').map((_, colIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const letter = isCurrentRow 
              ? currentGuess[colIndex] 
              : guesses[rowIndex]?.[colIndex] || '';
            
            const letterState = guesses[rowIndex]
              ? getLetterState(letter, colIndex, targetWord)
              : LetterState.PENDING;

            return (
              <div
                key={colIndex}
                className={getTileStyle(letterState)}
              >
                {letter?.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
} 