import React from 'react'
import DocsIntroCard from '@/components/DocsIntroCard/DocsIntroCard'
import DocsIntroSectionHeader from '@/components/DocsIntroSectionHeader/DocsIntroSectionHeader'
import { TROUBLESHOOTING_ROW_CARDS, RESOURCES_ROW_CARDS } from './constants'

const SECTION_NAME = 'Troubleshooting and Community Section'

export default function TroubleshootingCommunitySection() {
  return (
    <div className="w-full">
      <DocsIntroSectionHeader
        title="Troubleshooting & Community"
        description="Get help and connect with the SigNoz community."
        illustration="/img/docs-introduction/explore-illustration.webp"
        illustrationAlt="Troubleshooting and community"
      />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
        {TROUBLESHOOTING_ROW_CARDS.map((card) => (
          <DocsIntroCard
            key={card.clickName}
            {...card}
            clickLocation={SECTION_NAME}
            className="h-[152px]"
          />
        ))}
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
        {RESOURCES_ROW_CARDS.map((card) => (
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
