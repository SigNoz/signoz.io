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
      <div className="text-l2-foreground mb-1 text-xs font-medium tracking-wider uppercase">
        Language
      </div>
      <div className="relative">
        <button
          type="button"
          className="border-border bg-l2-background/60 text-l1-foreground hover:border-border focus:border-border flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm shadow-none transition-colors focus:outline-none"
          onClick={onToggle}
        >
          <span className="flex items-center gap-4 truncate">
            {normalizedSelected && normalizedSelected !== 'all' ? (
              <LanguageIcon lang={selectedLanguage ?? ''} />
            ) : (
              <Code size={16} className="text-l2-foreground" />
            )}
            <span className="truncate">
              {normalizedSelected && normalizedSelected !== 'all' ? selectedLanguage : 'All'}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`text-l2-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="border-border bg-popover text-popover-foreground absolute z-20 mt-2 w-full overflow-hidden rounded-lg border shadow-lg">
            <div className="max-h-72 overflow-y-auto py-1">
              {options.map((opt) => {
                const normalizedValue = normalizeLanguage(opt.value)
                const isActive = normalizedSelected === normalizedValue

                return (
                  <button
                    key={opt.value}
                    className={`flex w-full items-center gap-4 px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-l1-background-hover text-l1-foreground-hover'
                        : 'text-l2-foreground hover:bg-l1-background-hover hover:text-l1-foreground-hover'
                    }`}
                    onClick={() => onChange(opt.value)}
                  >
                    {normalizedValue === 'all' ? (
                      <Code size={16} className="text-l2-foreground" />
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
