'use client'
import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { openDecimalChat } from '@/utils/decimal'
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
    onOpen: () => openDecimalChat({ presentation: 'modal' }),
    isEnabled: true,
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

    openDecimalChat({ presentation: 'modal' })
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
        className={`relative flex w-full max-w-lg cursor-pointer items-center rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] px-4 py-3 transition-all duration-200 focus-within:border-[var(--accent-primary)] focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--accent-primary)_20%,transparent)] hover:border-[var(--l1-border)] hover:shadow-md ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Open search and chat interface"
      >
        <Sparkles
          strokeWidth={1.25}
          className="mr-3 h-5 w-5 flex-shrink-0 text-[var(--l3-foreground)]"
        />
        <span className="flex-1 text-left text-sm text-[var(--l3-foreground)] transition-all duration-300">
          {currentPlaceholder}
        </span>
        <kbd className="flex h-4 w-4 items-center justify-center rounded border border-[var(--l2-border)] bg-[var(--l3-background)] font-mono text-[10px] leading-none text-[var(--l3-foreground)]">
          /
        </kbd>
      </div>
    </>
  )
}

export default SearchBar
