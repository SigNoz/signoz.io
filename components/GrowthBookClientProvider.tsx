'use client'

import React, { createContext, useEffect, useState, useRef, useCallback } from 'react'
import { GrowthBook } from '@growthbook/growthbook'

// Type for the context value
export type GrowthBookContextValue = {
  isOn: (featureKey: string) => boolean
  getValue: <T>(featureKey: string, defaultValue: T) => T
}

// Create a React context with default values
export const GrowthBookContext = createContext<GrowthBookContextValue>({
  isOn: () => false,
  getValue: <T,>(_, defaultValue: T) => defaultValue,
})

type GrowthBookProviderProps = {
  children: React.ReactNode
  data: {
    apiHost?: string
    clientKey?: string
    anonymousId: string
  }
}

export default function GrowthBookClientProvider({ children, data }: GrowthBookProviderProps) {
  // Store the GrowthBook instance in a ref to avoid recreating it
  const gbRef = useRef<GrowthBook | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Memoize the feature evaluation functions
  const isOn = useCallback((featureKey: string): boolean => {
    if (!gbRef.current) return false
    return gbRef.current.isOn(featureKey)
  }, [])

  const getValue = useCallback(<T,>(featureKey: string, defaultValue: T): T => {
    if (!gbRef.current) return defaultValue
    return gbRef.current.getFeatureValue(featureKey, defaultValue) as T
  }, [])

  // Create the context value object only when necessary
  const contextValue = React.useMemo(() => ({ isOn, getValue }), [isOn, getValue])

  useEffect(() => {
    // Clean up any existing instance
    if (gbRef.current) {
      gbRef.current.destroy()
      gbRef.current = null
    }

    // Create a new GrowthBook instance
    const gb = new GrowthBook({
      apiHost: data.apiHost,
      clientKey: data.clientKey,
    })

    gbRef.current = gb

    // Initialize GrowthBook asynchronously
    const initGrowthBook = async () => {
      try {
        // Initialize with a timeout to prevent blocking for too long
        await gb.init({ timeout: 1000 })

        // Set attributes for the user
        gb.setAttributes({
          id: data.anonymousId,
        })

        // Mark as initialized to trigger any dependent effects
        setIsInitialized(true)
      } catch (error) {
        console.error('Error initializing GrowthBook:', error)
      }
    }

    initGrowthBook()

    // Clean up GrowthBook instance when unmounting
    return () => {
      if (gbRef.current) {
        gbRef.current.destroy()
        gbRef.current = null
      }
    }
  }, [data.apiHost, data.clientKey, data.anonymousId])

  return <GrowthBookContext.Provider value={contextValue}>{children}</GrowthBookContext.Provider>
}
