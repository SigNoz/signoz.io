'use client';

import { Suspense, useState, useEffect } from 'react';
import '../styles.css';
import { Lexend, Orbitron } from 'next/font/google';
import { WordleGame } from './wordle-game';
import { HowToPlayDrawer } from './how-to-play-drawer';
import { initializeGameState, setGameWon, setGameLost, getGameState } from '../lib/cookie-utils';
import { GameStatus } from '../types';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import { IoHeart } from 'react-icons/io5';
import React from 'react';


const orbitron = Orbitron({ subsets: ['latin'], weight: ['400'] });
const lexend = Lexend({ subsets: ['latin'], weight: ['400'] });

export default function DevopsWordle() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.NOT_STARTED);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Handle navbar visibility on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY;
          // Hide navbar when scrolling down more than 10px, show when scrolling up
          if (scrollDelta > 10 && currentScrollY > 50) {
            setIsNavbarVisible(false);
          } else if (scrollDelta < -10 || currentScrollY <= 50) {
            setIsNavbarVisible(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    <div className="wordle-page">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-red-900/10 to-black" />
      <div className="absolute top-[10%] right-0 w-[300px] h-[400px] bg-red-500/10 rounded-full blur-[280px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[500px] bg-gradient-to-tl from-red-800/30 via-red-600/15 to-transparent rounded-full blur-[180px]" />

      <div className="relative z-10 flex flex-col w-full">
        <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-2 sm:px-6 py-2 transition-transform duration-300 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
          }`}>
          <div className="flex items-center">
            <p className={`text-sm sm:text-base tracking-wide ${orbitron.className} neon-text pt-3 sm:pt-0`}>
              Devops Wordle
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-[#FF4C4C] hover:text-[#ff6666]  flex items-center transition-colors justify-center px-0"
              aria-label="Open menu"
            >
              <HiOutlineQuestionMarkCircle className="w-4 h-4 sm:w-8 sm:h-20 neon-question" />
            </button>
          </div>
        </nav>

        <Suspense fallback={<div className="text-red-800">Loading...</div>}>
          <main className="flex flex-col items-center w-full p-2 sm:pt-6 pt-16">
            <div className="w-full mt-4 sm:mt-4">
              {gameState !== GameStatus.NOT_STARTED && (
                <WordleGame
                  targetWord='ALERT'
                  elapsedTime={elapsedTime}
                  gameStatus={gameState}
                  onGameWon={handleGameWon}
                  onGameLost={handleGameLost}
                />
              )}
            </div>
            <div className="relative z-[1] text-center bg-red">
              <p className={`text-gray-400 text-[12px] pt-3 ${lexend.className}`}>
                Made with <IoHeart className="inline w-8 h-6 text-[#FF4C4C] neon-heart px-1 pb-1" /> by{' '}
                <a
                  href="https://signoz.io"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SigNoz
                </a>
              </p>
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