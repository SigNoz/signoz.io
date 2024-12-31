'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
import Button from '@/components/Button/Button'

const MigrationFloatingCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    const cardClosed = localStorage.getItem('migrationCardClosed')
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
      const showThreshold = documentHeight * 0.2

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
    localStorage.setItem('migrationCardClosed', 'true')
  }

  if (!isVisible || isClosed) return null

  return (
    <div className="fixed bottom-8 left-8 z-50 hidden w-72 transform rounded-xl bg-gradient-to-r from-blue-900/90 to-purple-900/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl lg:block">
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-400 hover:text-white"
        aria-label="Close"
      >
        <X size={16} />
      </button>
      <h3 className="mb-3 text-xl font-bold text-white">Save up to 80% on your Datadog bill</h3>
      <p className="mb-4 text-sm text-gray-300">
        We provide migration support if your monthly Datadog bill is over $2000. Get started with
        SigNoz quickly.
      </p>
      <div className="flex flex-col gap-2">
        <Link href="/teams/" className="w-full">
          <Button className="flex w-full items-center justify-center gap-2 text-sm font-bold">
            Try SigNoz - Free <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="https://signoz.io/product-comparison/migrate-from-datadog/" className="w-full">
          <Button
            type={Button.TYPES.SECONDARY}
            className="flex w-full items-center justify-center gap-2 text-sm font-bold"
          >
            Request Migration Support <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default MigrationFloatingCard
