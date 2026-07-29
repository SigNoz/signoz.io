'use client'

import React from 'react'
import { Check, Globe, Loader2 } from 'lucide-react'
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
        <SelectTrigger className="!flex !h-8 !w-full !items-center !justify-between !gap-0 !rounded !border !border-[var(--l2-border)] !bg-[var(--l2-background-60)] !px-3 !py-0 !text-sm !text-[var(--l1-foreground)] !shadow-none !outline-none !ring-0 hover:!border-[var(--l1-border)] focus:!ring-0 disabled:!cursor-wait disabled:!opacity-100 [&>span]:!min-w-0 [&>span]:!flex-1 [&>span]:!truncate [&>span]:!text-left [&_svg]:!h-3 [&_svg]:!w-3 [&_svg]:!shrink-0 [&_svg]:!text-[var(--l3-foreground)]">
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
          className="!z-[100] !w-[var(--radix-select-trigger-width)] !min-w-[var(--radix-select-trigger-width)] !animate-none !rounded !border !border-[var(--l2-border)] !bg-[var(--l2-background)] !shadow-lg data-[side=bottom]:!animate-none data-[side=top]:!animate-none data-[state=closed]:!animate-none data-[state=open]:!animate-none"
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
          {regionOptions.map((option) => {
            const isSelected = option.value === currentValue
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                className="!relative !flex !w-full !cursor-pointer !items-center !justify-between !gap-3 !rounded-none !px-3 !py-2 !pr-9 !text-sm !text-[var(--l3-foreground)] !outline-none hover:!bg-[var(--l2-background-hover)] hover:!text-[var(--l1-foreground)] focus:!bg-[var(--l2-background-hover)] focus:!text-[var(--l1-foreground)] data-[state=checked]:!text-[var(--l1-foreground)]"
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
