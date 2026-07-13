import React from 'react'
import DocsIntroCard from '@/components/DocsIntroCard/DocsIntroCard'
import { SEND_DATA_CARDS } from './constants'

const SECTION_NAME = 'Send Data Section'

export default function SendDataSection() {
  const topRow = SEND_DATA_CARDS.slice(0, 3)
  const bottomRow = SEND_DATA_CARDS.slice(3)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {topRow.map((card) => (
          <DocsIntroCard
            key={card.clickName}
            {...card}
            clickLocation={SECTION_NAME}
            className="h-[152px]"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {bottomRow.map((card) => (
          <DocsIntroCard
            key={card.clickName}
            {...card}
            clickLocation={SECTION_NAME}
            className="h-[180px]"
          />
        ))}
      </div>
    </div>
  )
}
