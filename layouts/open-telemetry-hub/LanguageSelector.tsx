'use client'

import React from 'react'
import { Code } from 'lucide-react'
import { Select, SelectTrigger, SelectValue } from '@signozhq/ui/select'
import {
  styledSelectTriggerStyle,
  StyledSelectContent,
  StyledSelectItem,
} from '@/components/ui/StyledSelect'

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
  ...styledSelectTriggerStyle,
  '--select-trigger-disabled-opacity': '1',
  '--select-trigger-disabled-cursor': 'wait',
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
        <StyledSelectContent>
          {options.map((option) => (
            <StyledSelectItem
              key={option.value}
              value={option.value}
              isSelected={normalizeLanguage(option.value) === normalizedSelected}
            >
              <span className="flex min-w-0 items-center gap-2">
                {renderOptionIcon(option.value)}
                <span className="min-w-0 truncate">{option.label}</span>
              </span>
            </StyledSelectItem>
          ))}
        </StyledSelectContent>
      </Select>
    </div>
  )
}
