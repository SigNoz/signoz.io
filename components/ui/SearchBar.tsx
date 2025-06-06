'use client'
import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ChatModal from './ChatModal'
import useSearchShortcut from '@/hooks/useSearchShortcut'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search documentation or ask a question...',
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Enable Cmd+K shortcut
  useSearchShortcut({
    onOpen: () => setIsModalOpen(true),
    isEnabled: !isModalOpen,
  })

  const handleClick = () => {
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
        <MagnifyingGlassIcon className="mr-3 h-5 w-5 flex-shrink-0 text-signoz_vanilla-400" />
        <span className="flex-1 text-left text-sm text-signoz_vanilla-400">{placeholder}</span>
        <div className="text-signoz_vanilla-500 flex items-center space-x-1 text-xs">
          <kbd className="rounded border border-signoz_slate-300 bg-signoz_slate-500 px-2 py-1 font-mono">
            ⌘
          </kbd>
          <kbd className="rounded border border-signoz_slate-300 bg-signoz_slate-500 px-2 py-1 font-mono">
            K
          </kbd>
        </div>
      </div>

      <ChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default SearchBar
