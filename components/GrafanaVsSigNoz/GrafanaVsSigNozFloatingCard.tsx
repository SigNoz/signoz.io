'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Scale, X } from 'lucide-react'
import Button from '@/components/Button/Button'

const GrafanaVsSigNozFloatingCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    const cardClosed = localStorage.getItem('grafanaVsSigNozCardClosed')
    if (cardClosed) {
      setIsClosed(true)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show when past 20% of page
      const showThreshold = documentHeight * 0.15

      // Hide when near the bottom section (adjust 800px based on your needs)
      const hideThreshold = documentHeight - windowHeight - 800

      if (scrollPosition > showThreshold && scrollPosition < hideThreshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClose = () => {
    setIsClosed(true)
    localStorage.setItem('grafanaVsSigNozCardClosed', 'true')
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 hidden w-64 transform rounded-lg bg-gradient-to-r from-blue-900/90 to-purple-900/90 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl lg:block ${
        isVisible && !isClosed
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-8 opacity-0'
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-400 hover:text-white"
        aria-label="Close"
      >
        <X size={14} />
      </button>

      <h3 className="mb-2 text-lg font-bold text-white">Save up to 45% on your Grafana bill</h3>
      <p className="mb-3 text-xs text-gray-300">
      Tired of juggling multiple tools for observability? SigNoz gives you logs, metrics and traces in a single unified platform.  
      </p>
      <div className="flex flex-col gap-2">
        <Link id="grafana-vs-signoz-compare-button" href="/product-comparison/signoz-vs-grafana/" className="w-full">
          <Button className="flex w-full items-center justify-center gap-1 text-xs font-bold">
          <Scale className="h-4 w-4" />
          Compare SigNoz vs. Grafana
          </Button>
        </Link>
        <Link id="grafana-vs-signoz-try-signoz-button" href="/teams/" className="w-full">
          <Button
            type={Button.TYPES.SECONDARY}
            className="flex w-full items-center justify-center gap-1 text-xs font-bold"
          >
            Try SigNoz for Free <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default GrafanaVsSigNozFloatingCard
