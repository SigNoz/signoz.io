'use client';

import { Suspense } from 'react';
import './styles.css';
import { Orbitron } from 'next/font/google';
import { WordleHeader } from './components/wordle-header';
import { WordleGame } from './components/wordle-game';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400'] });

export default function WordlePage() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black" />
      <div className="absolute top-0 left-0 w-[200px] h-[500px] bg-red-400/20 rounded-full blur-[200px]" />
      
      <div className="relative z-10 flex flex-col items-center min-h-screen py-4">
        <h1 className={`text-[40px] font-normal neon-text ${orbitron.className} mt-2 mb-6`}>
          WORDLE
        </h1>
        <Suspense fallback={<div className="text-red-800">Loading...</div>}>
            <div className="w-full max-w-[500px] px-4 mb-4">
              <WordleHeader currentAttempts={2} maxAttempts={6}/>
            </div>
            <div className="w-full">
              <WordleGame targetWord='TRACE' />
            </div>
        </Suspense>
      </div>
    </div>
  );
}