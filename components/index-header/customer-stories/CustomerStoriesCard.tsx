import React from 'react'
import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'

import CustomerCarousel from './CustomerCarousel'
import TestimonialSwapPanel from './TestimonialSwapPanel'
import { CUSTOMER_STORIES_CTA, CUSTOMER_STORY_QUOTES } from './customerStories.constants'
import './customer-stories.css'

export default function CustomerStoriesCard() {
  const half = Math.ceil(CUSTOMER_STORY_QUOTES.length / 2)

  return (
    <section className="customer-stories" aria-label="Customers and testimonials">
      <CustomerCarousel />
      <div className="customer-stories__voices">
        <TestimonialSwapPanel quotes={CUSTOMER_STORY_QUOTES.slice(0, half)} />
        <TestimonialSwapPanel quotes={CUSTOMER_STORY_QUOTES.slice(half)} staggerMs={1500} />
        <aside className="voice voice--cta">
          <p className="voice__cta-title">{CUSTOMER_STORIES_CTA.title}</p>
          <TrackingLink
            href={CUSTOMER_STORIES_CTA.href}
            clickType="Secondary CTA"
            clickName="See All Customers Button"
            clickText={CUSTOMER_STORIES_CTA.buttonLabel}
            clickLocation="Hero Customer Stories"
            className="btn-tactile btn-tactile--secondary no-underline"
          >
            {CUSTOMER_STORIES_CTA.buttonLabel}
            <ArrowRight size={12} aria-hidden="true" />
          </TrackingLink>
        </aside>
      </div>
    </section>
  )
}
