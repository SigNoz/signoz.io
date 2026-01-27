'use client'

import React from 'react'
import { cn } from 'app/lib/utils'
import { useRegion } from './RegionContext'
import Link from 'next/link'

interface RegionOption {
  label: string
  value: string
}

export const RegionDropdown = () => {
  const { regions, region, cloudRegion, setRegion, isLoading } = useRegion()

  const regionOptions = React.useMemo(() => {
    const options: RegionOption[] = []

    regions.forEach((r) => {
      r.clusters.forEach((c) => {
        options.push({
          label: `${r.name} - ${c.cloud_region}`,
          value: `${r.name}_${c.cloud_region}`,
        })
      })
    })

    return options
  }, [regions])

  if (isLoading) {
    return <div className="h-9 w-40 animate-pulse rounded bg-signoz_slate-400" />
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    // Parse value to split name and cloud_region
    const [selectedName, selectedCloudRegion] = value.split('_')
    setRegion(selectedName, selectedCloudRegion)
  }

  // Construct current selected value
  const currentValue = region && cloudRegion ? `${region}_${cloudRegion}` : ''

  return (
    <div className="relative w-fit min-w-[180px] rounded-md border border-signoz_slate-500 p-4">
      <label htmlFor="region-dropdown" className="text-xs uppercase">
        Selected Region
      </label>
      <select
        id="region-dropdown"
        value={currentValue}
        onChange={handleChange}
        className={cn(
          'w-full appearance-none rounded-md border bg-signoz_slate-400 px-3 py-2 pr-8 text-sm text-white shadow-sm outline-none transition-all duration-200',
          'border-primary-600 hover:bg-signoz_slate-500',
          'focus:border-signoz_robin-500 focus:ring-2 focus:ring-signoz_robin-500',
          'cursor-pointer'
        )}
      >
        {regionOptions.map((option) => (
          <option key={option.value} value={option.value} className="bg-signoz_slate-500">
            {option.label}
          </option>
        ))}
      </select>
      <div className="mt-2 text-xs">
        Applies to code snippets on this page (and other Cloud docs pages).
      </div>
      <Link
        href="/docs/ingestion/signoz-cloud/overview#endpoint"
        className="text-xs text-signoz_robin-500"
      >
        How do I find my workspace region?
      </Link>
    </div>
  )
}
