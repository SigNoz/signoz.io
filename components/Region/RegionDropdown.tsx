'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from 'app/lib/utils'
import { useRegion } from './RegionContext'

export const RegionDropdown = () => {
  const { regions, selectedRegion, setSelectedRegion, isLoading } = useRegion()

  const allCloudRegions = React.useMemo(() => {
    const cloudRegions = new Set<string>()
    regions.forEach((region) => {
      region.clusters.forEach((cluster) => {
        cloudRegions.add(cluster.cloud_region)
      })

      // TODO@M: Remove this
      cloudRegions.add('us-central2')
      cloudRegions.add('eu-central2')
      cloudRegions.add('ap-south2')
    })

    return Array.from(cloudRegions)
  }, [regions])

  if (isLoading) {
    return <div className="h-9 w-40 animate-pulse rounded bg-signoz_slate-400" />
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedRegion(value === 'none' ? null : value)
  }

  return (
    <div className="relative w-fit min-w-[180px]">
      <select
        value={selectedRegion || 'none'}
        onChange={handleChange}
        className={cn(
          'w-full appearance-none rounded-md border bg-signoz_slate-400 px-3 py-2 pr-8 text-sm text-white shadow-sm outline-none transition-all duration-200',
          'border-primary-600 hover:bg-signoz_slate-500',
          'focus:border-signoz_robin-500 focus:ring-2 focus:ring-signoz_robin-500',
          'cursor-pointer'
        )}
      >
        <option value="none" className="bg-signoz_slate-500">
          Select Region
        </option>
        {allCloudRegions.map((region) => (
          <option key={region} value={region} className="bg-signoz_slate-500">
            {region}
          </option>
        ))}
      </select>
    </div>
  )
}
