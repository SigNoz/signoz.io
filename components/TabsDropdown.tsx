'use client'

import React from 'react'
import { Select, SelectTrigger, SelectValue } from '@signozhq/ui/select'
import {
  styledSelectTriggerStyle,
  StyledSelectContent,
  StyledSelectItem,
} from '@/components/ui/StyledSelect'
import { useSelectScrollUnlock } from '@/hooks/useSelectScrollUnlock'

export interface TabsDropdownItem {
  value: string
  label: React.ReactNode
}

interface TabsDropdownProps {
  items: TabsDropdownItem[]
  activeValue: string | null
  activeLabel?: React.ReactNode
  onChange: (value: string) => void
  groupLabel?: string
}

const triggerStyle = {
  ...styledSelectTriggerStyle,
  '--select-trigger-height': '2.25rem',
  '--select-trigger-border-radius': 'var(--radius-1, 2px)',
  '--select-trigger-background-color': 'transparent',
  '--select-trigger-padding': '0 var(--spacing-6, 12px)',
} as React.CSSProperties

const TabsDropdown = ({
  items,
  activeValue,
  activeLabel,
  onChange,
  groupLabel,
}: TabsDropdownProps) => {
  const [open, setOpen] = React.useState(false)
  useSelectScrollUnlock(open)

  const handleChange = (value: string | string[]) => {
    const val = Array.isArray(value) ? value[0] : value
    if (!val) return
    setOpen(false)
    onChange(val)
  }

  return (
    <div className="mb-3 flex flex-col gap-1.5">
      {groupLabel && (
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--l3-foreground)]">
          {groupLabel}
        </span>
      )}
      <div className="w-full sm:w-fit sm:min-w-[240px] sm:max-w-full">
        <Select
          value={activeValue ?? undefined}
          onChange={handleChange}
          open={open}
          onOpenChange={setOpen}
        >
          <SelectTrigger
            aria-label={groupLabel ? `Select ${groupLabel}` : 'Select an option'}
            style={triggerStyle}
            className="hover:bg-[var(--l3-background-60)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            <SelectValue placeholder="Select an option">{activeLabel}</SelectValue>
          </SelectTrigger>
          <StyledSelectContent className="max-h-[min(320px,var(--radix-select-content-available-height))]">
            {items.map((item) => (
              <StyledSelectItem
                key={item.value}
                value={item.value}
                isSelected={item.value === activeValue}
              >
                <span className="min-w-0 truncate">{item.label}</span>
              </StyledSelectItem>
            ))}
          </StyledSelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TabsDropdown
