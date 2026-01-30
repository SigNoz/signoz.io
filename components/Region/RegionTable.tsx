'use client'

import React from 'react'
import { useRegion } from './RegionContext'

const RegionTable = () => {
  const { regions, isLoading } = useRegion()

  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="h-32 w-full animate-pulse rounded bg-signoz_slate-400" />
      </div>
    )
  }

  // Flatten the data for the table
  const tableData = regions.flatMap((region) =>
    region.clusters.map((cluster) => ({
      name: region.name,
      cloudRegion: cluster.cloud_region,
      provider: cluster.cloud_provider,
      dns: `ingest.${region.dns}`,
    }))
  )

  return (
    <div className="my-8 w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr>
            <th className="border-b border-gray-200 px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
              Name
            </th>
            <th className="border-b border-gray-200 px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
              Cloud Provider
            </th>
            <th className="border-b border-gray-200 px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
              Cloud Region
            </th>
            <th className="border-b border-gray-200 px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
              Ingestion Endpoint
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={`${row.cloudRegion}-${index}`}
              className="border-b border-gray-200 last:border-0 dark:border-gray-700"
            >
              <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{row.name}</td>
              <td className="px-6 py-4 uppercase text-gray-900 dark:text-gray-100">
                {row.provider}
              </td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{row.cloudRegion}</td>
              <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{row.dns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RegionTable
