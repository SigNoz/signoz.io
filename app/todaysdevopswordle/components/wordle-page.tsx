'use client'

import { Suspense, useState } from 'react'
import '../styles.css'
import { WordleOverview } from './wordle-overview'
import { WordleGameView } from './wordle-game-view'

export default function DevopsWordle() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const handleSelectDay = (dayId: string) => {
    setSelectedDay(dayId)
  }

  const handleBackToOverview = () => {
    setSelectedDay(null)
  }

  if (selectedDay) {
    return (
      <Suspense fallback={<div className="text-red-800">Loading...</div>}>
        <WordleGameView
          selectedDay={selectedDay}
          onBackToOverview={handleBackToOverview}
        />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<div className="text-red-800">Loading...</div>}>
      <WordleOverview onSelectDay={handleSelectDay} />
    </Suspense>
  )
}
