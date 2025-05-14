'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '../TrackingLink'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

interface IconCardGridProps {
  title?: string
  description?: string
  cards: IconCardData[]
  sectionName: string // For clickLocation tracking attribute
  viewAllHref?: string
  viewAllText?: string
  gridCols?: string // Allow customization of grid columns e.g., 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
}

const IconCardGrid: React.FC<IconCardGridProps> = ({
  title,
  description,
  cards,
  sectionName,
  viewAllHref,
  viewAllText = 'View all',
  gridCols = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6', // Default grid columns
}) => {
  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      {/* Section Header - Only render if title or description exists */}
      {(title || description) && (
        <div className="mb-6 text-left">
          {title && (
            <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">{title}</h2>
          )}
          {description && <p className="text-base text-signoz_vanilla-400">{description}</p>}
        </div>
      )}

      {/* Grid of Icon Cards */}
      <div className={`grid gap-4 ${gridCols}`}>
        {cards.map((card, index) => (
          <TrackingLink
            key={index}
            href={card.href}
            className="flex flex-col items-center justify-center rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 text-center no-underline transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
            clickType="Nav Click"
            clickName={card.clickName}
            clickText={card.name}
            clickLocation={sectionName}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md">
              {card.icon}
            </div>
            <span className="text-sm font-medium text-signoz_vanilla-100">{card.name}</span>
          </TrackingLink>
        ))}
      </div>

      {/* Optional View All Link */}
      {viewAllHref && (
        <div className="mt-6 text-sm">
          <TrackingLink
            href={viewAllHref}
            className="inline-flex items-center text-signoz_robin-500 no-underline transition-colors hover:text-signoz_robin-400"
            clickType="Nav Click"
            clickName={`View All ${title || ''} Link`}
            clickText={viewAllText}
            clickLocation={sectionName}
          >
            {viewAllText} <ArrowRight className="ml-1 h-3 w-3" />
          </TrackingLink>
        </div>
      )}
    </div>
  )
}

export default IconCardGrid
