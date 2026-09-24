import React from 'react'
import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'

import CustomerCarousel from './CustomerCarousel'
import TestimonialSwapPanel from './TestimonialSwapPanel'
import { CUSTOMER_STORIES_CTA, CUSTOMER_STORY_QUOTES } from './customerStories.constants'
import styles from './customer-stories.module.css'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from 'app/lib/utils'

interface CustomerStoriesCardProps {
  /** Analytics attribution, so placements outside the homepage hero are distinguishable. */
  clickLocation?: string
}

export default function CustomerStoriesCard({
  clickLocation = 'Hero Customer Stories',
}: CustomerStoriesCardProps = {}) {
  const half = Math.ceil(CUSTOMER_STORY_QUOTES.length / 2)

  return (
    <section className={styles.root} aria-label="Customers and testimonials">
      <CustomerCarousel clickLocation={clickLocation} />
      <div className={styles.voices}>
        <TestimonialSwapPanel
          quotes={CUSTOMER_STORY_QUOTES.slice(0, half)}
          clickLocation={clickLocation}
        />
        <TestimonialSwapPanel
          quotes={CUSTOMER_STORY_QUOTES.slice(half)}
          staggerMs={1500}
          clickLocation={clickLocation}
        />
        <aside className={cn(styles.voice, styles.voiceCta)}>
          <p className={styles.voiceCtaTitle}>{CUSTOMER_STORIES_CTA.title}</p>
          <TrackingLink
            href={CUSTOMER_STORIES_CTA.href}
            clickType="Secondary CTA"
            clickName="Customer Stories Link"
            clickText={CUSTOMER_STORIES_CTA.buttonLabel}
            clickLocation={clickLocation}
            className={cn(styles.voiceCtaLink, 'no-underline')}
            aria-label={CUSTOMER_STORIES_CTA.buttonLabel}
          >
            <span className="sr-only">{CUSTOMER_STORIES_CTA.buttonLabel}</span>
          </TrackingLink>
          <span
            className={cn(buttonVariants({ variant: 'tactileSecondary' }), styles.voiceCtaButton)}
            aria-hidden="true"
          >
            {CUSTOMER_STORIES_CTA.buttonLabel}
            <ArrowRight size={12} />
          </span>
        </aside>
      </div>
    </section>
  )
}
