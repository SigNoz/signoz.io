'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'

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
  region: string | null
  cloudRegion: string | null
  setRegion: (region: string | null, cloudRegion: string | null) => void
  isLoading: boolean
}

const FALLBACK_REGIONS: RegionData[] = [
  {
    name: 'us',
    dns: 'us.signoz.cloud',
    clusters: [
      {
        cloud_provider: 'gcp',
        cloud_region: 'us-central1',
      },
    ],
  },
  {
    name: 'eu',
    dns: 'eu.signoz.cloud',
    clusters: [
      {
        cloud_provider: 'gcp',
        cloud_region: 'europe-central2',
      },
    ],
  },
  {
    name: 'in',
    dns: 'in.signoz.cloud',
    clusters: [
      {
        cloud_provider: 'gcp',
        cloud_region: 'asia-south1',
      },
    ],
  },
]

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regions, setRegions] = useState<RegionData[]>([])
  const [region, setRegionState] = useState<string | null>(null)
  const [cloudRegion, setCloudRegionState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)
  const isOnboarding = source === ONBOARDING_SOURCE

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/regions`)
        const data: RegionResponse = await response.json()
        if (data.status === 'success' && data.data && data.data.length > 0) {
          setRegions(data.data)
        } else {
          setRegions(FALLBACK_REGIONS)
        }
      } catch (error) {
        console.error('Failed to fetch regions:', error)
        setRegions(FALLBACK_REGIONS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRegions()
  }, [])

  useEffect(() => {
    const regionParam = searchParams.get('region')
    const cloudRegionParam = searchParams.get('cloud_region')

    if (regionParam) {
      setRegionState(regionParam)

      if (cloudRegionParam) {
        setCloudRegionState(cloudRegionParam)
      } else if (regions.length > 0) {
        // If only region is passed, find the region and select first cluster
        const matchedRegion = regions.find((r) => r.name === regionParam)
        if (matchedRegion && matchedRegion.clusters.length > 0) {
          setCloudRegionState(matchedRegion.clusters[0].cloud_region)
        } else {
          // If region passed but no match or no clusters, what to do?
          // Keep it null or default?
          // If the region exists but no clusters (unlikely), null is safe.
          // If region doesn't exist in our list, we still set it (maybe it's a new one?)
          // But we can't infer cloud_region.
          setCloudRegionState(null)
        }
      }
    } else if (regions.length > 0 && !isOnboarding) {
      // Set default region if no param exists and regions are loaded
      const firstRegion = regions[0]
      const firstCluster = firstRegion?.clusters[0]
      if (firstRegion && firstCluster) {
        setRegionState(firstRegion.name)
        setCloudRegionState(firstCluster.cloud_region)
      }
    }
  }, [searchParams, regions])

  const setRegion = (newRegion: string | null, newCloudRegion: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (newRegion) {
      current.set('region', newRegion)
    } else {
      current.delete('region')
    }

    if (newCloudRegion) {
      current.set('cloud_region', newCloudRegion)
    } else {
      current.delete('cloud_region')
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`, { scroll: false })
    setRegionState(newRegion)
    setCloudRegionState(newCloudRegion)
  }

  return (
    <RegionContext.Provider value={{ regions, region, cloudRegion, setRegion, isLoading }}>
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
