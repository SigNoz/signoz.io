'use client'

import React from 'react'
import { Check, Code } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@signozhq/ui/select'

import { normalizeLanguage } from './navigation'
import type { LanguageOption } from './types'
import { LanguageIcon } from './LanguageIcon'
import { useSelectScrollUnlock } from '@/hooks/useSelectScrollUnlock'

interface LanguageSelectorProps {
  options: LanguageOption[]
  selectedLanguage: string | null
  isOpen: boolean
  onToggle: () => void
  onChange: (value: string) => void
  onClose: () => void
}

const triggerStyle = {
  '--select-trigger-height': '2rem',
  '--select-trigger-border-radius': '0.25rem',
  '--select-trigger-border-color': 'var(--l2-border)',
  '--select-trigger-background-color': 'var(--l2-background-60)',
  '--select-trigger-box-shadow': 'none',
  '--select-trigger-padding': '0 0.75rem',
  '--select-trigger-font-size': '0.875rem',
  '--select-trigger-outline-width': '0',
  '--select-trigger-disabled-opacity': '1',
  '--select-trigger-disabled-cursor': 'wait',
  '--select-trigger-icon-size': '0.75rem',
  color: 'var(--l1-foreground)',
} as React.CSSProperties

const contentStyle = {
  '--select-content-border-radius': '0.25rem',
  '--select-content-border-color': 'var(--l2-border)',
  '--select-content-background': 'var(--l2-background)',
  '--select-content-box-shadow': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  '--select-content-popper-width': 'var(--radix-select-trigger-width)',
  '--select-content-popper-min-width': 'var(--radix-select-trigger-width)',
  '--select-content-open-animation': 'none',
  '--select-content-close-animation': 'none',
  '--select-content-slide-up-animation': 'none',
  '--select-content-slide-down-animation': 'none',
  animation: 'none',
  zIndex: 100,
} as React.CSSProperties

/** Structural vars only — do not set inline `color` here; it overrides Radix highlight styles. */
const itemStyle = {
  '--select-item-padding': '0.5rem 2.25rem 0.5rem 0.75rem',
  '--select-item-font-size': '0.875rem',
  '--select-item-border-radius': '0',
  '--select-item-highlight-background': 'var(--l2-background-hover)',
  '--select-item-highlight-color': 'var(--l1-foreground)',
} as React.CSSProperties

export function LanguageSelector({
  options,
  selectedLanguage,
  isOpen,
  onToggle,
  onChange,
  onClose,
}: LanguageSelectorProps) {
  useSelectScrollUnlock(isOpen)
  const normalizedSelected = normalizeLanguage(selectedLanguage)
  const selectedOption = options.find((opt) => normalizeLanguage(opt.value) === normalizedSelected)

  const handleChange = (value: string | string[]) => {
    const val = Array.isArray(value) ? value[0] : value
    if (!val) return
    onChange(val)
  }

  const handleOpenChange = (open: boolean) => {
    if (open === isOpen) return
    if (open) {
      onToggle()
    } else {
      onClose()
    }
  }

  const renderOptionIcon = (value: string) =>
    normalizeLanguage(value) === 'all' ? (
      <Code size={16} className="shrink-0 text-[var(--l3-foreground)]" />
    ) : (
      <LanguageIcon lang={value} />
    )

  return (
    <div className="flex flex-col gap-1 px-2.5 pb-2 pt-3">
      <div className="flex items-center gap-1.5 pb-2 pl-1.5">
        <Code size={12} className="text-[var(--l3-foreground)]" />
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--l3-foreground)]">
          language
        </span>
      </div>
      <Select
        value={selectedOption?.value}
        onChange={handleChange}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger className="hover:border-[var(--l1-border)]" style={triggerStyle}>
          <SelectValue placeholder="All">
            <span className="flex min-w-0 items-center gap-2">
              {selectedOption && renderOptionIcon(selectedOption.value)}
              <span className="truncate">{selectedOption?.label ?? 'All'}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]"
          style={contentStyle}
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          {options.map((option) => {
            const isSelected = normalizeLanguage(option.value) === normalizedSelected
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                style={itemStyle}
                className="relative text-[var(--l3-foreground)] data-[highlighted]:bg-[var(--l2-background-hover)] data-[highlighted]:text-[var(--l1-foreground)] data-[selected=true]:text-[var(--l1-foreground)]"
              >
                <span className="flex min-w-0 items-center gap-2">
                  {renderOptionIcon(option.value)}
                  <span className="min-w-0 truncate">{option.label}</span>
                </span>
                {isSelected && (
                  <Check
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 shrink-0 -translate-y-1/2 text-[var(--l1-foreground)]"
                    aria-hidden
                  />
                )}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
