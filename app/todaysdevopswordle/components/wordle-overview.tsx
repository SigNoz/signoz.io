'use client'

import React from 'react'
import { Lexend, Orbitron } from 'next/font/google'
import { DaySelectionCard } from './day-selection-card'
import { getAllGameData } from '../lib/game-data'
import { IoHeart } from 'react-icons/io5'

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['400'] })

interface WordleOverviewProps {
  onSelectDay: (dayId: string) => void
}

export function WordleOverview({ onSelectDay }: WordleOverviewProps) {
  const gameDataMap = getAllGameData()

  return (
    <div className="wordle-page">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-red-900/10 to-black" />
      <div className="absolute right-0 top-[10%] h-[400px] w-[300px] rounded-full bg-red-500/10 blur-[280px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[400px] rounded-full bg-gradient-to-tl from-red-800/30 via-red-600/15 to-transparent blur-[180px]" />

      <div className="relative z-10 flex w-full flex-col">
        <main className="flex w-full flex-col items-center p-2 pt-16 sm:pt-6">
          <div className="mx-auto max-w-6xl w-full px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className={`neon-text text-4xl sm:text-5xl md:text-6xl mb-4 ${orbitron.className}`}>
                DEVOPS WORDLE
              </h1>
              <p className={`text-gray-400 text-[16px] max-w-2xl mx-auto mb-20 ${lexend.className}`}>
                Choose a day and learn DevOps terminology with our wordle game!
              </p>
            </div>

            {/* Day Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Object.values(gameDataMap).map((dayData) => (
                <DaySelectionCard
                  key={dayData.dayId}
                  dayData={dayData}
                  onSelectDay={onSelectDay}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className={`text-[12px] text-gray-400 ${lexend.className}`}>
                Made with <IoHeart className="neon-heart inline h-6 w-8 px-1 pb-1 text-[#FF4C4C]" />{' '}
                by{' '}
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
          </div>
        </main>
      </div>
    </div>
  )
} 