'use client'

import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { useLogEvent } from '@/hooks/useLogEvent'
import TrackingLink from '@/components/TrackingLink'
import { Button } from '@/components/ui/Button'

const SignupModal = dynamic(() => import('@/components/SignupModal/SignupModal'), {
  ssr: false,
})

const HeroEmailInput: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const logEvent = useLogEvent()

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      logEvent({
        eventType: 'track',
        eventName: 'Website Click',
        attributes: {
          clickType: 'Primary CTA',
          clickName: 'Hero Email Input Submit',
          clickLocation: 'Hero Section',
          clickText: 'Start for free',
          email: email,
        },
      })

      setIsModalOpen(true)
    },
    [email, logEvent]
  )

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <div className="flex w-full flex-col items-center gap-3.5 pt-4">
        {/* Desktop: pill with inline button */}
        <form onSubmit={handleSubmit} className="hidden w-[500px] md:flex">
          <div className="flex w-full items-center gap-0 rounded-full border border-signoz_slate-200 bg-signoz_ink-400 py-1.5 pl-6 pr-1.5 shadow-[0_0_15px_rgba(78,116,248,0.1)]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-grow border-none bg-transparent text-[15px] font-normal text-signoz_vanilla-100 placeholder-signoz_slate-50 outline-none focus:ring-0"
              id="hero-email-input"
            />
            <Button
              type="submit"
              isButton
              rounded="full"
              className="flex-shrink-0 gap-2 px-7 font-semibold"
              id="btn-hero-email-submit"
            >
              Start for free
              <ArrowRight size={14} />
            </Button>
          </div>
        </form>

        {/* Mobile: stacked pill */}
        <form onSubmit={handleSubmit} className="flex w-[90vw] flex-col gap-2.5 md:hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            className="w-full rounded-full border border-signoz_slate-200 bg-signoz_ink-400 px-5 py-3.5 text-[15px] font-normal text-signoz_vanilla-100 placeholder-signoz_slate-50 outline-none focus:border-signoz_robin-500"
            id="hero-email-input-mobile"
          />
          <Button
            type="submit"
            isButton
            rounded="full"
            size="lg"
            className="w-full gap-2 font-semibold"
            id="btn-hero-email-submit-mobile"
          >
            Start for free
            <ArrowRight size={14} />
          </Button>
        </form>

        {/* Helper text */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-signoz_slate-50">No credit card required</span>
          <span className="h-[3px] w-[3px] rounded-full bg-signoz_slate-100" />
          <TrackingLink
            href="/docs/introduction/"
            clickType="Secondary CTA"
            clickName="Explore Docs Link"
            clickText="Explore the Docs"
            clickLocation="Hero Section"
            className="text-xs font-medium text-signoz_robin-300 hover:text-signoz_robin-200"
            prefetch={false}
          >
            Explore the Docs
          </TrackingLink>
        </div>
      </div>

      <SignupModal isOpen={isModalOpen} onClose={handleModalClose} prefillEmail={email} />
    </>
  )
}

export default HeroEmailInput
