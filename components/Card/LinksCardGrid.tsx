'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '../TrackingLink'
import { useRouter, usePathname } from 'next/navigation'
import { useLogEvent } from 'hooks/useLogEvent'

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
  href?: string
  clickName: string
  clickText?: string
  internalLinks: InternalLinkProps[]
  viewAllHref?: string
}

interface LinksCardGridProps {
  cards: LinksCardProps[]
  sectionName: string
}

const LinksCardGrid: React.FC<LinksCardGridProps> = ({ cards, sectionName }) => {
  const router = useRouter()
  const pathname = usePathname()
  const logEvent = useLogEvent()

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => {
        const isCardClickable = !!card.href
        const commonClassName =
          'flex flex-col p-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 transition-all'
        const cardWrapperClassName = `${commonClassName} ${
          isCardClickable
            ? 'cursor-pointer hover:bg-signoz_ink-300 hover:border-signoz_robin-500'
            : 'hover:bg-signoz_ink-300 hover:border-signoz_robin-500'
        }`

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
              <div key={linkIndex} onClick={(e) => e.stopPropagation()}>
                <TrackingLink
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
              </div>
            ))}
          </div>
        )

        const ViewAllLink = () =>
          card.viewAllHref ? (
            <div className="mt-auto pt-2 text-sm" onClick={(e) => e.stopPropagation()}>
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

        const handleCardClick = () => {
          if (isCardClickable && card.href) {
            logEvent({
              eventName: 'Website Click',
              eventType: 'track',
              attributes: {
                clickType: 'Card Click',
                clickName: card.clickName,
                clickText: card.clickText || card.title,
                clickLocation: sectionName,
                pageLocation: pathname,
              },
            })
            router.push(card.href)
          }
        }

        return (
          <div
            key={index}
            className={cardWrapperClassName}
            onClick={handleCardClick}
            {...(isCardClickable && { role: 'link', tabIndex: 0 })}
            onKeyDown={(e) => {
              if (isCardClickable && e.key === 'Enter') {
                handleCardClick()
              }
            }}
          >
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
