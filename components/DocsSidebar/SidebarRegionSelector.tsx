'use client'

import React from 'react'
import { Check, Globe, Loader2 } from 'lucide-react'
import { useRegion } from '@/components/Region/RegionContext'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@signozhq/ui/select'
import RegionSelectorInfoTip from './RegionSelectorInfoTip'
import { useSelectScrollUnlock } from '@/hooks/useSelectScrollUnlock'

type SidebarRegionSelectorProps = {
  showInfoTip?: boolean
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

export default function SidebarRegionSelector({ showInfoTip = true }: SidebarRegionSelectorProps) {
  const { regions, region, cloudRegion, setRegion, isLoading } = useRegion()
  const [open, setOpen] = React.useState(false)
  useSelectScrollUnlock(open)

  const regionOptions = React.useMemo(() => {
    const options: { label: string; value: string }[] = []
    regions.forEach((r) => {
      r.clusters.forEach((c) => {
        options.push({
          label: `${r.name}-${c.cloud_region}`,
          value: `${r.name}_${c.cloud_region}`,
        })
      })
    })
    return options
  }, [regions])

  const handleChange = (value: string | string[]) => {
    const val = Array.isArray(value) ? value[0] : value
    if (!val) return
    const [selectedName, selectedCloudRegion] = val.split('_')
    setOpen(false)
    setRegion(selectedName, selectedCloudRegion)
  }

  const currentValue = region && cloudRegion ? `${region}_${cloudRegion}` : undefined
  const selectedLabel = regionOptions.find((o) => o.value === currentValue)?.label

  const selector = (
    <div className="flex flex-col gap-1 px-2.5 pb-2 pt-3">
      <div className="flex items-center gap-1.5 pb-2 pl-1.5">
        <Globe size={12} className="text-[var(--l3-foreground)]" />
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--l3-foreground)]">
          select your region
        </span>
      </div>
      <Select
        value={currentValue}
        onChange={handleChange}
        disabled={isLoading}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className="hover:border-[var(--l1-border)]" style={triggerStyle}>
          {isLoading ? (
            <span className="flex items-center gap-2 text-[var(--l3-foreground)]">
              <Loader2 size={12} className="animate-spin" />
              Loading...
            </span>
          ) : (
            <SelectValue placeholder="Select region">{selectedLabel}</SelectValue>
          )}
        </SelectTrigger>
        <SelectContent
          className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)]"
          style={contentStyle}
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
        >
          {regionOptions.map((option) => {
            const isSelected = option.value === currentValue
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                style={itemStyle}
                className="relative text-[var(--l3-foreground)] data-[highlighted]:bg-[var(--l2-background-hover)] data-[highlighted]:text-[var(--l1-foreground)] data-[selected=true]:text-[var(--l1-foreground)]"
              >
                <span className="min-w-0 truncate">{option.label}</span>
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

  if (!showInfoTip) {
    return selector
  }

  return <RegionSelectorInfoTip>{selector}</RegionSelectorInfoTip>
}
