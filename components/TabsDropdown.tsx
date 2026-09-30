'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@signozhq/ui/select'
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
  '--select-trigger-height': '2.25rem',
  '--select-trigger-border-radius': 'var(--radius-1, 2px)',
  '--select-trigger-border-color': 'var(--l2-border)',
  '--select-trigger-background-color': 'transparent',
  '--select-trigger-box-shadow': 'none',
  '--select-trigger-padding': '0 var(--spacing-6, 12px)',
  '--select-trigger-font-size': '0.8125rem',
  '--select-trigger-outline-width': '0',
  '--select-trigger-icon-size': '0.75rem',
  color: 'var(--l1-foreground-hover)',
} as React.CSSProperties

const contentStyle = {
  '--select-content-border-radius': 'var(--radius-1, 2px)',
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

const itemStyle = {
  '--select-item-padding': '0.5rem 2.25rem 0.5rem 0.75rem',
  '--select-item-font-size': '0.8125rem',
  '--select-item-border-radius': '0',
  '--select-item-highlight-background': 'var(--l2-background-hover)',
  '--select-item-highlight-color': 'var(--l1-foreground)',
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
          <SelectContent
            className="max-h-[min(320px,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]"
            style={contentStyle}
            position="popper"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            {items.map((item) => {
              const isSelected = item.value === activeValue
              return (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  style={itemStyle}
                  className="relative text-[var(--l3-foreground)] data-[highlighted]:bg-[var(--l2-background-hover)] data-[highlighted]:text-[var(--l1-foreground)] data-[selected=true]:text-[var(--l1-foreground)]"
                >
                  <span className="min-w-0 truncate">{item.label}</span>
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
    </div>
  )
}

export default TabsDropdown
