'use client'

import React from 'react'
import { Globe, Loader2 } from 'lucide-react'
import { useRegion } from '@/components/Region/RegionContext'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@signozhq/ui/select'

export default function SidebarRegionSelector() {
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

  return (
    <div className="flex flex-col gap-1 px-2.5 pb-2">
      <div className="flex items-center gap-1.5 pb-2 pl-1.5">
        <Globe size={12} className="text-signoz_vanilla-400" />
        <span className="text-xs font-medium uppercase tracking-wider text-signoz_vanilla-400">
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
        <SelectTrigger className="!flex !h-8 !w-full !items-center !justify-between !gap-0 !rounded !border !border-signoz_ink-300 !bg-signoz_ink-400/60 !px-3 !py-0 !text-sm !text-signoz_vanilla-100 !shadow-none !outline-none !ring-0 hover:!border-signoz_ink-200 focus:!ring-0 disabled:!cursor-wait disabled:!opacity-100 [&>span]:!min-w-0 [&>span]:!flex-1 [&>span]:!truncate [&>span]:!text-left [&_svg]:!h-3 [&_svg]:!w-3 [&_svg]:!shrink-0 [&_svg]:!text-signoz_vanilla-400">
          {isLoading ? (
            <span className="flex items-center gap-2 text-signoz_vanilla-400">
              <Loader2 size={12} className="animate-spin" />
              Loading...
            </span>
          ) : (
            <SelectValue placeholder="Select region" />
          )}
        </SelectTrigger>
        <SelectContent
          className="!z-[100] !w-[var(--radix-select-trigger-width)] !min-w-[var(--radix-select-trigger-width)] !animate-none !rounded !border !border-signoz_ink-300 !bg-signoz_ink-400 !shadow-lg data-[side=bottom]:!animate-none data-[side=top]:!animate-none data-[state=closed]:!animate-none data-[state=open]:!animate-none"
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
              animation: 'none',
            } as React.CSSProperties
          }
        >
          {regionOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="!cursor-pointer !rounded-none !px-3 !py-2 !text-sm !text-signoz_vanilla-400 !outline-none hover:!bg-signoz_ink-300 hover:!text-signoz_vanilla-100 focus:!bg-signoz_ink-300 focus:!text-signoz_vanilla-100 data-[state=checked]:!text-signoz_vanilla-100"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
