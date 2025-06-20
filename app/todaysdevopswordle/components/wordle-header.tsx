'use client';

import React, { useEffect, useState, FC } from 'react';
import { Lexend, Orbitron } from 'next/font/google';
import { BiTime } from 'react-icons/bi';
import { HiLightBulb } from 'react-icons/hi2';
import { cn } from '../../lib/utils';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['500'] });
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] });

enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  DIFFICULT = 'DIFFICULT'
}

interface WordleHeaderProps {
  currentAttempts: number;
  maxAttempts: number;
  hint?: string;
  level?: Difficulty;
  elapsedTime: number;
}

interface TimerProps {
  elapsedTime: number;
  className?: string;
}

interface StatusProps {
  level: Difficulty;
  className?: string;
}

interface ProgressBarProps {
  current: number;
  max: number;
  className?: string;
}

interface HintBoxProps {
  hint: string;
  className?: string;
}

interface LegendBoxProps {
  className?: string;
}


function getDateString(): string {
  return new Date().toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

function getTimeFromCookie(): number {
  if (typeof window === 'undefined') return 0;

  const today = getDateString();
  const cookieName = `signoz_wordle_start_${today}`;
  
  const startTimeCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${cookieName}=`));

  if (!startTimeCookie) {
    const startTime = Date.now();
    document.cookie = `${cookieName}=${startTime}; path=/todayswordle; expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`;
    return 0;
  }

  const startTime = parseInt(startTimeCookie.split('=')[1]);
  const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  return elapsedSeconds;
}

function getLevelColor(level: Difficulty) {
    switch (level) {
      case Difficulty.EASY:
        return " text-green-500";
      case Difficulty.MEDIUM:
        return " text-yellow-500";
      case Difficulty.DIFFICULT:
        return " text-red-500";
    }
  };

function Timer({ elapsedTime }: TimerProps) {
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="flex items-center gap-2 text-[#4558c4]">
      <BiTime className="w-5 h-5" />
      <span className={`${orbitron.className} text-[20px]`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

function Level({ level, className }: StatusProps) {
  return (
    <div className={cn("flex items-center gap-2 text-[#4558c4]", className)}>
      <span className={`text-[14px] ${lexend.className}`}>Difficulty:</span>
      <span className={cn(
        "px-1 py-0.5 rounded text-[20px]",
        `${orbitron.className}`,
        getLevelColor(level)
      )}>
        {level}
      </span>
    </div>
  );
}

function ProgressBar({ current, max, className }: ProgressBarProps) {
  return (
    <div className={cn("w-full bg-gray-900 rounded-full h-2 overflow-hidden", className)}>
      <div 
        className="h-full bg-[#4558c4] transition-all duration-300"
        style={{ width: `${(current / max) * 100}%` }}
      />
    </div>
  );
}

function HintBox({ hint, className }: HintBoxProps) {
  return (
    <div className={cn("bg-black/30 backdrop-blur-md rounded-lg border border-[#233457] box-shadow-[rgba(112, 153, 234, 0.8)] rounded p-3", className)}>
        <div className="flex items-center gap-2">
        <HiLightBulb className="w-6 h-6 text-[#4558c4]" />
        <div className='text-gray-400 text-wrap text-sm'>Hint: {hint}</div>
        </div>
    </div> 
  )
}

function LegendBox({ className }: LegendBoxProps) {
  return (
    <div className={cn("flex flex-col justify-center  items-center bg-black/30 backdrop-blur-md rounded-lg border border-[#233457] box-shadow-[rgba(112, 153, 234, 0.8)] rounded p-3", className)}>
      <h3 className={cn("text-[15px] text-[#4558c4]", orbitron.className)}>Legend</h3>
      <div className="flex items-center justify-center gap-14">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#4558c4] rounded" />
          <span className="text-sm text-gray-400">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-sm text-gray-400">Correct</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[#233457] rounded" />
          <span className="text-sm text-gray-400">Absent</span>
        </div>
      </div>
    </div>
  );
}

export const WordleHeader: React.FC<WordleHeaderProps> = ({
  currentAttempts,
  maxAttempts,
  hint = "Wear all your observability caps and buckle up!",
  level = Difficulty.DIFFICULT,
  elapsedTime,
}) => {
  return (
    <div className="w-full space-y-4 p-4 sm:p-6 bg-black/30 backdrop-blur-md rounded-lg border-2 border-[#233457] box-shadow-[rgba(112, 153, 234, 0.8)] neon-box-border">
      <div className="flex items-center justify-between gap-4">
        <Timer elapsedTime={elapsedTime} />
        <Level level={level} />
      </div>
      
      <ProgressBar 
        current={currentAttempts} 
        max={maxAttempts}
      />
      
      
        {/* <HintBox hint={hint} />
        <LegendBox /> */}
      
    </div>
  );
};
