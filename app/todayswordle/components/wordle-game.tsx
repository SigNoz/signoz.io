'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GameConfig, GameState, LetterState, GameStatus } from '../types';
import { Keyboard } from './keyboard';
import { GameBoard } from './game-board';
import { WordleHeader } from './wordle-header';
import { GameResults } from './game-results';
import { getGameState } from '../lib/cookie-utils';

const MAX_TIME = 86400; // 24 hours in seconds
const MAX_ATTEMPTS = 5;

interface WordleGameProps {
  targetWord: string;
  config?: Partial<GameConfig>;
  elapsedTime: number;
  gameStatus: GameStatus;
  onGameWon: (attempts: number) => void;
  onGameLost: () => void;
}

const DEFAULT_CONFIG: GameConfig = {
  wordLength: 5,
  maxAttempts: 5
};

function getGameScore(attempts: number, elapsedTime: number) {
  if(getGameState().wonScore)
    return getGameState().wonScore

  const score = Math.ceil(((MAX_TIME / elapsedTime) * (MAX_ATTEMPTS / attempts)))
  return score
}

export function WordleGame({ 
  targetWord, 
  config = {}, 
  elapsedTime,
  onGameWon,
  onGameLost,
  gameStatus,
}: WordleGameProps) {
  const gameConfig = { ...DEFAULT_CONFIG, ...config };
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    currentRow: 0,
    currentCol: 0,
    gameStatus: gameStatus,
    guesses: [],
    letterStates: new Map()
  });

  const updateLetterStates = useCallback((guess: string) => {
    const newStates = new Map(gameState.letterStates);
    
    // First pass: Mark all CORRECT letters
    for (let i = 0; i < gameConfig.wordLength; i++) {
      const letter = guess[i].toUpperCase();
      if (letter === targetWord[i].toUpperCase()) {
        newStates.set(letter, LetterState.CORRECT);
      }
    }

    // Second pass: Mark PRESENT or ABSENT letters
    for (let i = 0; i < gameConfig.wordLength; i++) {
      const letter = guess[i].toUpperCase();
      if (letter !== targetWord[i].toUpperCase()) {
        if (targetWord.toUpperCase().includes(letter)) {
          // Only mark as PRESENT if not already CORRECT
          if (newStates.get(letter) !== LetterState.CORRECT) {
            newStates.set(letter, LetterState.PRESENT);
          }
        } else {
          // Only mark as ABSENT if not already marked
          if (!newStates.has(letter)) {
            newStates.set(letter, LetterState.ABSENT);
          }
        }
      }
    }

    return newStates;
  }, [targetWord, gameConfig.wordLength, gameState.letterStates]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (key === 'ENTER') {
      if (currentGuess.length !== gameConfig.wordLength) return;

      const newGuesses = [...gameState.guesses, currentGuess];
      const newLetterStates = updateLetterStates(currentGuess);
      
      let newStatus: GameStatus = gameState.gameStatus;
      if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
        newStatus = GameStatus.WON;
        onGameWon(getGameScore(newGuesses.length, elapsedTime) as number);
      } 
      else if (newGuesses.length === gameConfig.maxAttempts) {
        newStatus = GameStatus.LOST;
        onGameLost();
      }

      setGameState(prev => ({
        ...prev,
        currentRow: prev.currentRow + 1,
        currentCol: 0,
        gameStatus: newStatus,
        guesses: newGuesses,
        letterStates: newLetterStates
      }));
      setCurrentGuess('');
      return;
    }

    if (currentGuess.length < gameConfig.wordLength) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  }, [currentGuess, gameState, gameConfig, targetWord, updateLetterStates, onGameWon, onGameLost]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'DEL') {
        handleKeyPress('DEL');
      } else if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);
  if (gameState.gameStatus !== GameStatus.PLAYING) {
    return (
      <GameResults 
        isWon={gameState.gameStatus === GameStatus.WON}
        score={gameState.gameStatus === GameStatus.WON ? getGameScore(gameState.guesses.length, elapsedTime) as number : 0}
        timeTaken={elapsedTime}
        targetWord={targetWord}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center w-full max-w-[450px] pt-10 sm:pt-0">
        <WordleHeader 
          currentAttempts={gameState.guesses.length}
          maxAttempts={gameConfig.maxAttempts}
          elapsedTime={elapsedTime}
        />
      </div>
      <div className="flex justify-center">
        <GameBoard
          guesses={gameState.guesses}
          currentGuess={currentGuess}
          targetWord={targetWord}
          config={gameConfig}
        />
      </div>
      <div className="flex justify-center">
        <Keyboard
          onKeyPress={handleKeyPress}
          letterStates={gameState.letterStates}
        />
      </div>
    </div>
  );
}