import React from 'react'
import DocsIntroCard from '@/components/DocsIntroCard/DocsIntroCard'
import DocsIntroSectionHeader from '@/components/DocsIntroSectionHeader/DocsIntroSectionHeader'
import { EXPLORE_SIGNOZ_CARDS } from './constants'

const SECTION_NAME = 'Explore SigNoz Section'

export default function ExploreSigNoz() {
  const row1 = EXPLORE_SIGNOZ_CARDS.slice(0, 3)
  const row2 = EXPLORE_SIGNOZ_CARDS.slice(3)

  return (
    <div className="w-full">
      <DocsIntroSectionHeader
        title="Explore the rest of SigNoz"
        description="Once your data is flowing in — go deeper into what we offer."
        guidesCount={12}
        viewAllHref="/docs/userguide/"
        illustration="/img/docs-introduction/explore-illustration.webp"
        illustrationAlt="Explore SigNoz"
      />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
        {row1.map((card) => (
          <DocsIntroCard
            key={card.clickName}
            {...card}
            clickLocation={SECTION_NAME}
            className="h-[152px]"
          />
        ))}
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
        {row2.map((card) => (
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
