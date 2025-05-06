'use client'

import React, { useState, useEffect } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import { usePathname } from 'next/navigation'

const TrySigNozFloatingCard: React.FC<{ source: string }> = ({ source }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const cardClosed = localStorage.getItem('trySigNozCardClosed')
    if (cardClosed) {
      setIsVisible(false)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('trySigNozCardClosed', 'true')
  }

  if (!isVisible || source === ONBOARDING_SOURCE) return null

  return (
    <div className="fixed bottom-8 right-8 hidden w-64 transform rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-6 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl lg:block">
      <TrackingButton
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-400 hover:text-white"
        aria-label="Close"
        clickType="Close Button"
        clickName="Floating Card Close Button"
        clickText="Close"
        clickLocation="Try SigNoz Floating Card"
      >
        <X size={16} />
      </TrackingButton>
      <h3 className="mb-2 mt-0 text-lg font-bold text-white">Try SigNoz Cloud for FREE</h3>
      <p className="mb-3 text-sm text-gray-300">
        Instant setup, predictable pricing, and advanced features without infrastructure hassles.
      </p>
      <TrackingLink
        href="/teams/"
        clickType="Primary CTA"
        clickName="Sign Up Button"
        clickText="Get Started - Free"
        clickLocation="Try SigNoz Floating Card"
        style={{ color: 'white', textDecoration: 'none' }}
        className="mt-6 inline-block flex items-center justify-between rounded-lg bg-signoz_robin-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-signoz_robin-600"
      >
        <span>Get Started - Free</span>
        <ArrowRight size={16} />
      </TrackingLink>
    </div>
  )
}

export default TrySigNozFloatingCard
