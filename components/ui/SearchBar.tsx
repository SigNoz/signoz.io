'use client'
import React, { useState, useEffect } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import ChatModal from './ChatModal'
import useSearchShortcut from '@/hooks/useSearchShortcut'
import { useLogEvent } from '@/hooks/useLogEvent'

interface SearchBarProps {
  placeholder?: string | string[]
  className?: string
  rotationInterval?: number // milliseconds, defaults to 2000
  clickLocation?: string // Location where the SearchBar is used for tracking
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Ask anything about SigNoz...',
  className = '',
  rotationInterval = 2000,
  clickLocation = 'page', // default fallback location
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)

  // Convert placeholder to array for consistent handling
  const placeholders = Array.isArray(placeholder) ? placeholder : [placeholder]
  const currentPlaceholder = placeholders[currentPlaceholderIndex]

  // Rotate placeholders if there are multiple
  useEffect(() => {
    if (placeholders.length <= 1) return

    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [placeholders.length, rotationInterval])

  // Enable / shortcut
  useSearchShortcut({
    onOpen: () => setIsModalOpen(true),
    isEnabled: !isModalOpen,
  })

  const logEvent = useLogEvent()

  const handleClick = () => {
    // Track the click with contextual information
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'AI Chat Click',
        clickName: 'AI Chat Click',
        clickLocation: clickLocation,
        clickText: 'AI Chat Click',
        currentPlaceholder: currentPlaceholder,
        placeholderIndex: currentPlaceholderIndex,
      },
    })

    setIsModalOpen(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <>
      <div
        className={`relative flex w-full max-w-lg cursor-pointer items-center rounded-lg border border-signoz_slate-400 bg-signoz_ink-500 px-4 py-3 transition-all duration-200 focus-within:border-signoz_robin-500 focus-within:ring-2 focus-within:ring-signoz_robin-500/20 hover:border-signoz_robin-500 hover:shadow-md ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Open search and chat interface"
      >
        <SparklesIcon className="mr-3 h-5 w-5 flex-shrink-0 text-signoz_vanilla-400" />
        <span className="flex-1 text-left text-sm text-signoz_vanilla-400 transition-all duration-300">
          {currentPlaceholder}
        </span>
        <kbd className="rounded border border-signoz_slate-300 bg-signoz_slate-500 px-2 py-1 font-mono text-xs text-signoz_vanilla-500">
          /
        </kbd>
      </div>

      <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default SearchBar
