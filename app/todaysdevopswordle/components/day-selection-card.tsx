'use client'

import React from 'react'
import { Orbitron, Lexend } from 'next/font/google'
import { WordleDayData } from '../lib/game-data'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['300', '400'] })

interface DaySelectionCardProps {
  dayData: WordleDayData
  onSelectDay: (dayId: string) => void
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return 'text-green-400 border-green-400'
    case 'MEDIUM':
      return 'text-yellow-400 border-yellow-400'
    case 'HARD':
      return 'text-red-400 border-red-400'
    default:
      return 'text-gray-400 border-gray-400'
  }
}

const getDifficultyBg = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return 'bg-green-400/10'
    case 'MEDIUM':
      return 'bg-yellow-400/10'
    case 'HARD':
      return 'bg-red-400/10'
    default:
      return 'bg-gray-400/10'
  }
}

export function DaySelectionCard({ dayData, onSelectDay }: DaySelectionCardProps) {
  const difficultyColor = getDifficultyColor(dayData.difficulty)
  const difficultyBg = getDifficultyBg(dayData.difficulty)

  return (
    <div
      onClick={() => onSelectDay(dayData.dayId)}
      className={`group relative cursor-pointer rounded-lg border-2 border-[#233457] bg-[#1B224B]/30 p-6 transition-all duration-300 hover:border-[#4558c4] hover:bg-[#1B224B]/50 hover:shadow-lg hover:shadow-[#4558c4]/20 ${lexend.className}`}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#4558c4]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Day number */}
      <div className={`mb-4 text-3xl text-[#4558c4] ${orbitron.className}`}>
        {dayData.dayId.replace('day-', 'Day ')}
      </div>

      {/* Difficulty indicator - now inside the card */}
      <div className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${difficultyColor} ${difficultyBg} border`}>
        {dayData.difficulty}
      </div>

     
   
      {/* Hint preview */}
      <div className="text-sm text-gray-400 leading-relaxed">
        Hint: {dayData.hint.length > 60 
          ? `${dayData.hint.substring(0, 60)}...` 
          : dayData.hint
        }
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className={`neon-text-blue text-xl font-bold tracking-wider animate-pulse text-white drop-shadow-lg ${orbitron.className}`}>
          PLAY NOW &gt;&gt;
        </span>
      </div>
    </div>
  )
} 