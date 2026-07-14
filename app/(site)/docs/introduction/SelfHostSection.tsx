import React from 'react'
import DocsIntroCard from '@/components/DocsIntroCard/DocsIntroCard'
import DocsIntroSectionHeader from '@/components/DocsIntroSectionHeader/DocsIntroSectionHeader'
import { SELF_HOST_CARDS } from './constants'

const SECTION_NAME = 'Self-Host Installation Section'

export default function SelfHostSection() {
  return (
    <div className="w-full">
      <DocsIntroSectionHeader
        title="Self-Host SigNoz"
        description="Select the installation method that works best for your environment"
      />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {SELF_HOST_CARDS.map((card) => (
          <DocsIntroCard
            key={card.clickName}
            {...card}
            clickLocation={SECTION_NAME}
            className="h-[152px]"
          />
        ))}
      </div>
    </div>
  )
}
