import React from 'react'
import DocsIntroCard, { type DocsIntroCardData } from '@/components/DocsIntroCard/DocsIntroCard'
import DocsIntroSectionHeader from '@/components/DocsIntroSectionHeader/DocsIntroSectionHeader'

const SHARED_CLICK_NAME = 'Docs Intro Card'

const CARD_GRID_CLASS = 'relative z-10 grid grid-cols-1 md:grid-cols-3'

/** Top border on the first mobile card and the first desktop row — item-count agnostic. */
const CARD_GRID_WITH_TOP_BORDER_CLASS = `${CARD_GRID_CLASS} [&>*:first-child]:border-t md:[&>*:nth-child(-n+3)]:border-t`

export type { DocsIntroCardData }

export interface DocsIntroSectionProps {
  clickLocation: string
  cards: DocsIntroCardData[]
  title?: string
  description?: string
  guidesCount?: number
  viewAllHref?: string
  illustration?: string
  illustrationAlt?: string
  /** When true, apply a top border to the first card row (e.g. Send Data has no header). */
  showTopBorder?: boolean
}

export default function DocsIntroSection({
  clickLocation,
  cards,
  title,
  description,
  guidesCount,
  viewAllHref,
  illustration,
  illustrationAlt,
  showTopBorder = false,
}: DocsIntroSectionProps) {
  const hasHeader = Boolean(title && description)

  return (
    <div className="w-full">
      {hasHeader && (
        <DocsIntroSectionHeader
          title={title!}
          description={description!}
          guidesCount={guidesCount}
          viewAllHref={viewAllHref}
          illustration={illustration}
          illustrationAlt={illustrationAlt}
        />
      )}
      <div className={showTopBorder ? CARD_GRID_WITH_TOP_BORDER_CLASS : CARD_GRID_CLASS}>
        {cards.map((card) => (
          <DocsIntroCard
            key={card.href}
            {...card}
            clickName={SHARED_CLICK_NAME}
            clickLocation={clickLocation}
            className="h-[152px]"
          />
        ))}
      </div>
    </div>
  )
}
