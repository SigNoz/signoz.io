'use client'

import React from 'react'
import type { LucideIcon } from 'lucide-react'

export type SegmentedControlOption<T extends string> = {
  value: T
  label: string
  icon?: LucideIcon
}

type SegmentedControlProps<T extends string> = {
  options: SegmentedControlOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel: string
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex w-fit overflow-hidden rounded-[2px] border border-[var(--l1-border)]"
    >
      {options.map((option) => {
        const Icon = option.icon
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => {
              if (!active) onChange(option.value)
            }}
            className={`flex items-center gap-1.5 border-r border-[var(--l1-border)] px-3 py-2.5 text-[11px] leading-none transition-colors duration-150 last:border-r-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--l1-foreground-hover)] motion-reduce:transition-none ${
              active
                ? 'bg-[var(--l1-background-hover)] text-[var(--l1-foreground-hover)]'
                : 'text-[var(--l2-foreground)] hover:text-[var(--l2-foreground-hover)]'
            }`}
          >
            {Icon ? <Icon aria-hidden className="h-3 w-3 shrink-0" /> : null}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
