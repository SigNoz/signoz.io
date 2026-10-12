'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { SelectContent, SelectItem } from '@signozhq/ui/select'

export const styledSelectTriggerStyle = {
  '--select-trigger-height': '2rem',
  '--select-trigger-border-radius': '0.25rem',
  '--select-trigger-border-color': 'var(--l2-border)',
  '--select-trigger-background-color': 'var(--l2-background-60)',
  '--select-trigger-box-shadow': 'none',
  '--select-trigger-padding': '0 0.75rem',
  '--select-trigger-font-size': '0.875rem',
  '--select-trigger-outline-width': '0',
  '--select-trigger-icon-size': '0.75rem',
  color: 'var(--l1-foreground)',
} as React.CSSProperties

export const styledSelectContentStyle = {
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
export const styledSelectItemStyle = {
  '--select-item-padding': '0.5rem 2.25rem 0.5rem 0.75rem',
  '--select-item-font-size': '0.875rem',
  '--select-item-border-radius': '0',
  '--select-item-highlight-background': 'var(--l2-background-hover)',
  '--select-item-highlight-color': 'var(--l1-foreground)',
} as React.CSSProperties

interface StyledSelectContentProps extends React.ComponentProps<typeof SelectContent> {
  children: React.ReactNode
}

export function StyledSelectContent({
  children,
  className,
  style,
  ...props
}: StyledSelectContentProps) {
  return (
    <SelectContent
      className={`w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)] ${
        className || ''
      }`}
      style={{ ...styledSelectContentStyle, ...style }}
      position="popper"
      side="bottom"
      align="start"
      sideOffset={4}
      {...props}
    >
      {children}
    </SelectContent>
  )
}

interface StyledSelectItemProps {
  value: string
  isSelected: boolean
  children: React.ReactNode
}

export function StyledSelectItem({ value, isSelected, children }: StyledSelectItemProps) {
  return (
    <SelectItem
      value={value}
      style={styledSelectItemStyle}
      className="relative text-[var(--l3-foreground)] data-[highlighted]:bg-[var(--l2-background-hover)] data-[highlighted]:text-[var(--l1-foreground)] data-[selected=true]:text-[var(--l1-foreground)]"
    >
      {children}
      {isSelected && (
        <Check
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 shrink-0 -translate-y-1/2 text-[var(--l1-foreground)]"
          aria-hidden
        />
      )}
    </SelectItem>
  )
}
