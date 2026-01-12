'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Cluster {
  cloud_provider: string
  cloud_region: string
}

interface RegionData {
  name: string
  dns: string
  clusters: Cluster[]
}

interface RegionResponse {
  status: string
  data: RegionData[]
}

interface RegionContextType {
  regions: RegionData[]
  selectedRegion: string | null
  setSelectedRegion: (region: string | null) => void
  isLoading: boolean
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regions, setRegions] = useState<RegionData[]>([])
  const [selectedRegion, setSelectedRegionState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/regions?=`)
        const data: RegionResponse = await response.json()
        if (data.status === 'success') {
          setRegions(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch regions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRegions()
  }, [])

  useEffect(() => {
    const regionParam = searchParams.get('region')
    if (regionParam) {
      setSelectedRegionState(regionParam)
    } else if (regions.length > 0) {
      // Set default region if no param exists and regions are loaded
      const defaultRegion = regions[0]?.clusters[0]?.cloud_region || 'us-central1'
      setSelectedRegionState(defaultRegion)
    }
  }, [searchParams, regions])

  const setSelectedRegion = (region: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (region) {
      current.set('region', region)
    } else {
      current.delete('region')
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`, { scroll: false })
    setSelectedRegionState(region)
  }

  return (
    <RegionContext.Provider value={{ regions, selectedRegion, setSelectedRegion, isLoading }}>
      {children}
    </RegionContext.Provider>
  )
}

export const useRegion = () => {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider')
  }
  return context
}
