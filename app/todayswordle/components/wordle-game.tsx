'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GameConfig, GameState, LetterState, GameStatus } from '../types';
import { Keyboard } from './keyboard';
import { GameBoard } from './game-board';

interface WordleGameProps {
  targetWord: string;
  config?: Partial<GameConfig>;
}

const DEFAULT_CONFIG: GameConfig = {
  wordLength: 5,
  maxAttempts: 6
};

export function WordleGame({ targetWord, config = {} }: WordleGameProps) {
  const gameConfig = { ...DEFAULT_CONFIG, ...config };
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    currentRow: 0,
    currentCol: 0,
    gameStatus: GameStatus.PLAYING,
    guesses: [],
    letterStates: new Map()
  });

  const updateLetterStates = useCallback((guess: string) => {
    const newStates = new Map(gameState.letterStates);
    
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i].toUpperCase();
      if (letter === targetWord[i].toUpperCase()) {
        newStates.set(letter, LetterState.CORRECT);
      } else if (targetWord.toUpperCase().includes(letter)) {
        if (newStates.get(letter) !== LetterState.CORRECT) {
          newStates.set(letter, LetterState.PRESENT);
        }
      } else {
        if (!newStates.has(letter)) {
          newStates.set(letter, LetterState.ABSENT);
        }
      }
    }

    setGameState(prev => ({
      ...prev,
      letterStates: newStates
    }));
  }, [targetWord, gameState.letterStates]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === 'DEL') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (key === 'ENTER') {
      if (currentGuess.length !== gameConfig.wordLength) return;

      const newGuesses = [...gameState.guesses, currentGuess];
      updateLetterStates(currentGuess);

      let newStatus: GameStatus = gameState.gameStatus;
      if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
        newStatus = GameStatus.WON;
      } else if (newGuesses.length === gameConfig.maxAttempts) {
        newStatus = GameStatus.LOST;
      }

      setGameState(prev => ({
        ...prev,
        currentRow: prev.currentRow + 1,
        currentCol: 0,
        gameStatus: newStatus,
        guesses: newGuesses
      }));
      setCurrentGuess('');
      return;
    }

    if (currentGuess.length < gameConfig.wordLength) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  }, [currentGuess, gameState, gameConfig, targetWord, updateLetterStates]);

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

  return (
    <div className="grid grid-cols-2 items-center ml-[350px]">
      <div className="flex justify-end pr-8 ml-20">
        <GameBoard
          guesses={gameState.guesses}
          currentGuess={currentGuess}
          targetWord={targetWord}
          config={gameConfig}
        />
      </div>
      <div className="pl-8">
        <Keyboard
          onKeyPress={handleKeyPress}
          letterStates={gameState.letterStates}
        />
      </div>
    </div>
  );
}