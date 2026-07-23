'use client'

import React from 'react'
import { Globe, Loader2 } from 'lucide-react'
import { useRegion } from '@/components/Region/RegionContext'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@signozhq/ui/select'
import RegionSelectorInfoTip from './RegionSelectorInfoTip'

type SidebarRegionSelectorProps = {
  showInfoTip?: boolean
}

export default function SidebarRegionSelector({ showInfoTip = true }: SidebarRegionSelectorProps) {
  const { regions, region, cloudRegion, setRegion, isLoading } = useRegion()
  const [open, setOpen] = React.useState(false)

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

  const selector = (
    <div className="flex flex-col gap-1 px-2.5 pb-2">
      <div className="flex items-center gap-1.5 pb-2 pl-1.5">
        <Globe size={12} className="text-l2-foreground" />
        <span className="text-l2-foreground text-xs font-medium tracking-wider uppercase">
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
        <SelectTrigger className="!border-border !bg-l2-background/60 !text-l1-foreground hover:!border-border [&_svg]:!text-l2-foreground !flex !h-8 !w-full !items-center !justify-between !gap-0 !rounded !border !px-3 !py-0 !text-sm !shadow-none !ring-0 !outline-none focus:!ring-0 focus-visible:!ring-0 disabled:!cursor-wait disabled:!opacity-100 [&_svg]:!h-3 [&_svg]:!w-3 [&_svg]:!shrink-0 [&>span]:!min-w-0 [&>span]:!flex-1 [&>span]:!truncate [&>span]:!text-left">
          {isLoading ? (
            <span className="text-l2-foreground flex items-center gap-2">
              <Loader2 size={12} className="animate-spin" />
              Loading...
            </span>
          ) : (
            <SelectValue placeholder="Select region" />
          )}
        </SelectTrigger>
        <SelectContent
          className="!border-border !bg-popover !text-popover-foreground !z-[100] !w-[var(--radix-select-trigger-width)] !min-w-[var(--radix-select-trigger-width)] !animate-none !overflow-hidden !rounded !border !p-0 !shadow-lg data-[side=bottom]:!animate-none data-[side=top]:!animate-none data-[state=closed]:!animate-none data-[state=open]:!animate-none"
          position="popper"
          side="bottom"
          align="start"
          sideOffset={4}
          style={
            {
              '--select-content-open-animation': 'none',
              '--select-content-close-animation': 'none',
              '--select-content-slide-up-animation': 'none',
              '--select-content-slide-down-animation': 'none',
              '--select-item-highlight-background': 'var(--l1-background-hover)',
              '--select-item-highlight-color': 'var(--l1-foreground-hover)',
              animation: 'none',
            } as React.CSSProperties
          }
        >
          {regionOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              indicatorClassname="!hidden"
              className="!text-l2-foreground !cursor-pointer !rounded-none !px-3 !py-2 !pr-3 !text-sm !ring-0 !outline-none focus-visible:!ring-0"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  if (!showInfoTip) {
    return selector
  }

  return <RegionSelectorInfoTip>{selector}</RegionSelectorInfoTip>
}
