'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
import { ONBOARDING_SOURCE } from '@/constants/globals'

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
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-400 hover:text-white"
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <h3 className="mb-2 mt-0 text-lg font-bold text-white">Try SigNoz Cloud for FREE</h3>
      <p className="mb-3 text-sm text-gray-300">
        Instant setup, predictable pricing, and advanced features without infrastructure hassles.
      </p>
      <Link
        id="try-signoz-cloud-floating-card-cta"
        href="/teams/"
        style={{ color: 'white', textDecoration: 'none' }}
        className="mt-6 inline-block flex items-center justify-between rounded-lg bg-signoz_robin-500 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-signoz_robin-600"
      >
        <span>Get Started - Free</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export default TrySigNozFloatingCard
