'use client'

import React from 'react'
import { Globe, Loader2 } from 'lucide-react'
import { useRegion } from '@/components/Region/RegionContext'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@signozhq/ui/select'

export default function SidebarRegionSelector() {
  const { regions, region, cloudRegion, setRegion, isLoading } = useRegion()

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
    setRegion(selectedName, selectedCloudRegion)
  }

  const currentValue = region && cloudRegion ? `${region}_${cloudRegion}` : undefined

  return (
    <div className="flex flex-col gap-1 px-2.5 pb-2">
      <div className="flex items-center gap-1.5 pb-2 pl-1.5">
        <Globe size={12} className="text-signoz_vanilla-40  0" />
        <span className="text-[11px] font-medium uppercase tracking-[0.44px] text-signoz_vanilla-400">
          select your region
        </span>
      </div>
      <Select value={currentValue} onChange={handleChange} disabled={isLoading}>
        <SelectTrigger className="!flex !h-8 !w-full !items-center !justify-between !gap-0 !rounded !border !border-[#16181d] !bg-[rgba(18,19,23,0.6)] !px-3 !py-0 !text-[13px] !tracking-[-0.065px] !text-[#eceef2] !shadow-none !outline-none !ring-0 hover:!border-[#23262e] focus:!ring-0 disabled:!cursor-wait disabled:!opacity-100 [&>span]:!min-w-0 [&>span]:!flex-1 [&>span]:!truncate [&>span]:!text-left [&_svg]:!h-3 [&_svg]:!w-3 [&_svg]:!shrink-0 [&_svg]:!text-signoz_vanilla-400">
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
          className="!z-[100] !rounded !border !border-[#16181d] !bg-signoz_ink-400 !shadow-lg"
          position="popper"
          sideOffset={4}
        >
          {regionOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="!cursor-pointer !rounded-none !px-3 !py-2 !text-[13px] !tracking-[-0.065px] !text-signoz_vanilla-400 !outline-none hover:!bg-[#16181d] hover:!text-white focus:!bg-[#16181d] focus:!text-white data-[state=checked]:!text-white"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
