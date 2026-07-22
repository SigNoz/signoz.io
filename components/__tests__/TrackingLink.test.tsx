import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ExperimentTracker } from '@/components/ExperimentTracker'
import TrackingLink from '@/components/TrackingLink'

const { mockLogEvent } = vi.hoisted(() => ({ mockLogEvent: vi.fn() }))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

vi.mock('@/components/Link', () => ({
  default: ({ children, href, onClick, prefetch: _prefetch, ...props }: any) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault()
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </a>
  ),
}))

vi.mock('@/hooks/useLogEvent', () => ({
  useLogEvent: () => mockLogEvent,
}))

beforeEach(() => {
  mockLogEvent.mockClear()
})

describe('TrackingLink experiment attribution', () => {
  it('attributes clicks to the active experiment without labeling the click as a conversion', () => {
    render(
      <ExperimentTracker experimentId="homepage-hero-redesign" variantId="proof-carousel">
        <TrackingLink
          href="/teams/"
          clickLocation="Hero Section"
          clickName="Sign Up Button"
          clickText="Get Started - Free"
          clickType="Primary CTA"
        >
          Get Started - Free
        </TrackingLink>
      </ExperimentTracker>
    )

    fireEvent.click(screen.getByRole('link', { name: 'Get Started - Free' }))

    const clickEvent = mockLogEvent.mock.calls
      .map(([event]) => event)
      .find((event) => event.eventName === 'Website Click')

    expect(clickEvent).toEqual({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        button_type: 'Primary CTA',
        clickLocation: 'Hero Section',
        clickName: 'Sign Up Button',
        clickText: 'Get Started - Free',
        clickType: 'Primary CTA',
        experiment_id: 'homepage-hero-redesign',
        pageLocation: '/',
        variant_id: 'proof-carousel',
      },
    })
  })

  it('does not add experiment fields outside an experiment', () => {
    render(
      <TrackingLink
        href="/teams/"
        clickLocation="Hero Section"
        clickName="Sign Up Button"
        clickText="Get Started - Free"
        clickType="Primary CTA"
      >
        Get Started - Free
      </TrackingLink>
    )

    fireEvent.click(screen.getByRole('link', { name: 'Get Started - Free' }))

    expect(mockLogEvent).toHaveBeenCalledWith({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickLocation: 'Hero Section',
        clickName: 'Sign Up Button',
        clickText: 'Get Started - Free',
        clickType: 'Primary CTA',
        pageLocation: '/',
      },
    })
  })
})
