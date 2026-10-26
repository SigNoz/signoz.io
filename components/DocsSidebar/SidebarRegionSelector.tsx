'use client'

import React from 'react'
import { Globe, Loader2 } from 'lucide-react'
import { useRegion } from '@/components/Region/RegionContext'
import { Select, SelectTrigger, SelectValue } from '@signozhq/ui/select'
import {
  styledSelectTriggerStyle,
  StyledSelectContent,
  StyledSelectItem,
} from '@/components/ui/StyledSelect'
import RegionSelectorInfoTip from './RegionSelectorInfoTip'
import { useSelectScrollUnlock } from '@/hooks/useSelectScrollUnlock'

type SidebarRegionSelectorProps = {
  showInfoTip?: boolean
}

const triggerStyle = {
  ...styledSelectTriggerStyle,
  '--select-trigger-disabled-opacity': '1',
  '--select-trigger-disabled-cursor': 'wait',
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
        <StyledSelectContent>
          {regionOptions.map((option) => (
            <StyledSelectItem
              key={option.value}
              value={option.value}
              isSelected={option.value === currentValue}
            >
              <span className="min-w-0 truncate">{option.label}</span>
            </StyledSelectItem>
          ))}
        </StyledSelectContent>
      </Select>
    </div>
  )

  if (!showInfoTip) {
    return selector
  }

  return <RegionSelectorInfoTip>{selector}</RegionSelectorInfoTip>
}
