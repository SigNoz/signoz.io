'use client';

import { Suspense, useState, useEffect } from 'react';
import './styles.css';
import { Orbitron } from 'next/font/google';
import { WordleHeader } from './components/wordle-header';
import { WordleGame } from './components/wordle-game';
import { HowToPlayDrawer } from './components/how-to-play-drawer';
import { FaCode } from 'react-icons/fa6';
import { initializeGameState, setGameWon, setGameLost, getGameState } from './lib/cookie-utils';
import { GameStatus } from './types';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400'] });

export default function WordlePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.NOT_STARTED);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  console.log("gameStatebeg", gameState)
  useEffect(() => {
    // Check existing game state
    const state = getGameState();
    if (state.wonScore) {
      setGameState(GameStatus.WON);
      setIsDrawerOpen(false);
    } else if (state.lost) {
      setGameState(GameStatus.LOST);
      setIsDrawerOpen(false);
    } else if (state.startTime) {
      setGameState(GameStatus.PLAYING);
      setIsDrawerOpen(false);
      setElapsedTime(initializeGameState());
      startTimer();
    }
  }, []);

  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    if (gameState === GameStatus.NOT_STARTED) {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
    }
  };

  const handleStartGame = () => {
    setIsDrawerOpen(false);
    setElapsedTime(initializeGameState());
    startTimer();
    setGameState(GameStatus.PLAYING)
  };

  const handleGameWon = (score: number) => {
    setGameWon(score); // TODO: Add score to cookie
    setGameState(GameStatus.WON);
    if (timerInterval) clearInterval(timerInterval);
  };

  const handleGameLost = () => {
    setGameLost();
    setGameState(GameStatus.LOST);
    if (timerInterval) clearInterval(timerInterval);
  };

  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [timerInterval]);

  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-red-900/10 to-black" />
      <div className="absolute top-[20%] right-0 w-[300px] h-[400px] bg-red-500/10 rounded-full blur-[280px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[500px] bg-gradient-to-tl from-red-800/30 via-red-600/15 to-transparent rounded-full blur-[180px]" />
      
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 py-4">
          <div className="flex items-center">
            <p className={`text-sm sm:text-base tracking-wide ${orbitron.className} neon-text pt-2`}>
              Wordle By SigNoz
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-[#FF4C4C] hover:text-[#ff6666] transition-colors flex items-center justify-center px-0"
              aria-label="Open menu"
            >
              <FaCode className="w-4 h-4 sm:w-6 sm:h-6 neon-code-icon"/>
            </button>
          </div>
        </nav>

        <Suspense fallback={<div className="text-red-800">Loading...</div>}>
          <main className="flex flex-col items-center w-full p-4 sm:p-6">
            <div className="w-full mt-6 sm:mt-8">
              {gameState !== GameStatus.NOT_STARTED && (
                <WordleGame 
                  targetWord='TAINT'
                  elapsedTime={elapsedTime}
                  gameStatus={gameState}
                  onGameWon={handleGameWon}
                  onGameLost={handleGameLost}
                />
              )}
            </div>
          </main>
        </Suspense>
      </div>

      <HowToPlayDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onStartGame={handleStartGame}
        gameState={gameState}
        elapsedTime={elapsedTime}
      />
    </div>
  );
}