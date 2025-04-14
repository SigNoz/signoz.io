'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '../TrackingLink'

interface InternalLinkProps {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

export interface LinksCardProps {
  title: string
  description: string
  icon: React.ReactNode
  clickName: string // clickName for the card itself (used for View All link)
  internalLinks: InternalLinkProps[]
  viewAllHref?: string // Optional 'View all' link at the bottom
}

interface LinksCardGridProps {
  cards: LinksCardProps[]
  sectionName: string // For clickLocation tracking attribute
}

const LinksCardGrid: React.FC<LinksCardGridProps> = ({ cards, sectionName }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => {
        const commonClassName =
          'flex flex-col p-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 transition-all'
        // Always apply hover effect to the main card div
        const cardWrapperClassName = `${commonClassName} hover:bg-signoz_ink-300 hover:border-signoz_robin-500`

        const CardHeader = () => (
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-signoz_robin-500/10 text-signoz_robin-500">
              {card.icon}
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-signoz_vanilla-100">{card.title}</h3>
              <p className="mb-0 text-sm text-signoz_vanilla-400">{card.description}</p>
            </div>
          </div>
        )

        const InternalLinksSection = () => (
          <div className="my-2 grid grid-cols-2 gap-3">
            {card.internalLinks.map((link, linkIndex) => (
              <TrackingLink
                key={linkIndex}
                href={link.href}
                className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-signoz_robin-500/10"
                clickType="Secondary CTA"
                clickName={link.clickName}
                clickText={link.name}
                clickLocation={sectionName}
              >
                {link.icon}
                <span className="text-sm text-signoz_vanilla-100">{link.name}</span>
                <ArrowRight className="ml-1 h-3 w-3 text-signoz_vanilla-400" />
              </TrackingLink>
            ))}
          </div>
        )

        const ViewAllLink = () =>
          card.viewAllHref ? (
            <div className="mt-auto pt-2 text-sm">
              <TrackingLink
                href={card.viewAllHref}
                className="inline-flex items-center text-signoz_robin-500 transition-colors hover:text-signoz_robin-400"
                clickType="Nav Click"
                clickName={`${card.clickName} View All`}
                clickText="View all options"
                clickLocation={sectionName}
              >
                View all options <ArrowRight className="ml-1 h-3 w-3" />
              </TrackingLink>
            </div>
          ) : null

        return (
          <div key={index} className={cardWrapperClassName}>
            <CardHeader />
            <InternalLinksSection />
            <ViewAllLink />
          </div>
        )
      })}
    </div>
  )
}

export default LinksCardGrid
