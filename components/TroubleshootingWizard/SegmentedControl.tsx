'use client'

import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { TabsRoot, TabsList, TabsTrigger } from '@signozhq/ui/tabs'

import { segmentedTabVars } from '../Tabs'
import styles from '../Tabs.module.css'

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
    <TabsRoot
      className={`${styles.segmented} w-fit`}
      value={value}
      onValueChange={(next) => {
        if (next !== value) onChange(next as T)
      }}
      activationMode="manual"
      style={segmentedTabVars('small')}
    >
      <TabsList variant="secondary" {...({ 'aria-label': ariaLabel } as Record<string, unknown>)}>
        {options.map((option) => {
          const Icon = option.icon
          return (
            <TabsTrigger key={option.value} value={option.value} variant="secondary">
              {Icon ? <Icon aria-hidden className="size-3 shrink-0" /> : null}
              {option.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
    </TabsRoot>
  )
}
