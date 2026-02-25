'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRegion } from './RegionContext'
import { Copy, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

const CopyCell = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)
  const isCopying = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleCopy = async () => {
    if (isCopying.current) return
    isCopying.current = true

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false)
        isCopying.current = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      isCopying.current = false
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="group flex items-center justify-between gap-2">
      <span className="font-mono text-sm">{text}</span>
      <Button
        isButton
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="h-6 w-6 p-0 text-gray-400 opacity-0 transition-opacity hover:bg-transparent hover:text-gray-600 group-hover:opacity-100 dark:text-gray-500 dark:hover:text-gray-300"
        title="Copy to clipboard"
        aria-label="Copy to clipboard"
      >
        {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

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
      dns: `https://ingest.${region.dns}`,
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
              <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                <CopyCell text={row.dns} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RegionTable
