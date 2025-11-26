'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown, Code } from 'lucide-react'

import { normalizeLanguage } from './navigation'
import type { LanguageOption } from './types'
import { LanguageIcon } from './LanguageIcon'

interface LanguageSelectorProps {
  options: LanguageOption[]
  selectedLanguage: string | null
  isOpen: boolean
  onToggle: () => void
  onChange: (value: string) => void
  onClose: () => void
}

export function LanguageSelector({
  options,
  selectedLanguage,
  isOpen,
  onToggle,
  onChange,
  onClose,
}: LanguageSelectorProps) {
  const normalizedSelected = normalizeLanguage(selectedLanguage)
  const selectorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleInteraction = (event: MouseEvent | TouchEvent) => {
      const target = event.target instanceof Node ? event.target : null
      if (!target || !selectorRef.current) {
        return
      }

      if (selectorRef.current.contains(target)) {
        return
      }

      onClose()
    }

    document.addEventListener('mousedown', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('mousedown', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [isOpen, onClose])

  return (
    <div className="mb-4 px-3" ref={selectorRef}>
      <div className="mb-1 text-xs uppercase text-gray-400">Language</div>
      <div className="relative">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/40 px-3 py-2 text-sm text-white shadow-sm transition-colors hover:border-signoz_robin-500 focus:border-signoz_robin-500 focus:outline-none"
          onClick={onToggle}
        >
          <span className="flex items-center gap-4 truncate">
            {normalizedSelected && normalizedSelected !== 'all' ? (
              <LanguageIcon lang={selectedLanguage ?? ''} />
            ) : (
              <Code size={16} color="#9ca3af" />
            )}
            <span className="truncate">
              {normalizedSelected && normalizedSelected !== 'all' ? selectedLanguage : 'All'}
            </span>
          </span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-20 mt-2 w-full rounded-lg border border-signoz_ink-300 bg-signoz_ink-500/80 shadow-lg backdrop-blur-sm">
            <div className="max-h-72 overflow-y-auto py-2">
              {options.map((opt) => {
                const normalizedValue = normalizeLanguage(opt.value)
                const isActive = normalizedSelected === normalizedValue

                return (
                  <button
                    key={opt.value}
                    className={`flex w-full items-center gap-4 px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-signoz_ink-400/80 text-white'
                        : 'text-gray-200 hover:bg-signoz_ink-400/40'
                    }`}
                    onClick={() => onChange(opt.value)}
                  >
                    {normalizedValue === 'all' ? (
                      <Code size={16} color="#9ca3af" />
                    ) : (
                      <LanguageIcon lang={opt.value} />
                    )}
                    <span className="truncate">{opt.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
