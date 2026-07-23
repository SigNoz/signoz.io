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
    return <div className="bg-muted h-9 w-40 animate-pulse rounded" />
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
    <div className="border-border bg-card text-card-foreground relative w-fit min-w-[180px] rounded-md border p-4">
      <label
        htmlFor="region-dropdown"
        className="text-muted-foreground text-xs font-semibold uppercase"
      >
        Selected Region
      </label>
      <select
        id="region-dropdown"
        value={currentValue}
        onChange={handleChange}
        className={cn(
          'bg-background text-foreground mt-1 w-full appearance-none rounded-md border px-3 py-2 pr-8 text-sm shadow-sm transition-all duration-200 outline-none',
          'border-border hover:bg-muted',
          'focus:border-primary focus:ring-ring focus:ring-2',
          'cursor-pointer'
        )}
      >
        {regionOptions.map((option) => (
          <option key={option.value} value={option.value} className="bg-background text-foreground">
            {option.label}
          </option>
        ))}
      </select>
      <div className="text-muted-foreground mt-2 text-xs">
        Applies to code snippets on this page (and other Cloud docs pages).
      </div>
      <Link
        href="/docs/ingestion/signoz-cloud/overview/#endpoint"
        className="text-primary text-xs"
        prefetch={false}
      >
        How do I find my workspace region?
      </Link>
    </div>
  )
}
