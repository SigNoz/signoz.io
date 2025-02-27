'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
import Button from '@/components/Button/Button'

const NewrelicMigrationFloatingCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    const cardClosed = localStorage.getItem('newrelicMigrationCardClosed')
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
    localStorage.setItem('newrelicMigrationCardClosed', 'true')
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

      <h3 className="mb-2 text-lg font-bold text-white">Save up to 67% on your New Relic bill</h3>
      <p className="mb-3 text-xs text-gray-300">
        We provide migration support if your monthly New Relic bill is over $1000. Get started with
        SigNoz quickly.
      </p>
      <div className="flex flex-col gap-2">
        <Link id="newrelic-migration-card-try-signoz-button" href="/teams/" className="w-full">
          <Button className="flex w-full items-center justify-center gap-1 text-xs font-bold">
            Try SigNoz - Free <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
        <Link id="newrelic-migration-card-request-migration-support-button" href="/product-comparison/migrate-from-newrelic/" className="w-full">
          <Button
            type={Button.TYPES.SECONDARY}
            className="flex w-full items-center justify-center gap-1 text-xs font-bold"
          >
            Request Migration Support <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NewrelicMigrationFloatingCard
