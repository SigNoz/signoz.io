'use client'

import { useContext, useMemo } from 'react'
import { GrowthBookContext, GrowthBookContextValue } from '../components/GrowthBookClientProvider'

// Main hook to access GrowthBook context
export function useGrowthBook(): GrowthBookContextValue {
  return useContext(GrowthBookContext)
}

// Helper hook for feature values with memoization to prevent unnecessary re-renders
export function useFeatureValue<T>(key: string, defaultValue: T): T {
  const { getValue } = useGrowthBook()
  // Memoize the result to avoid unnecessary re-renders
  return useMemo(() => getValue(key, defaultValue), [getValue, key, defaultValue])
}

// Helper hook for boolean feature flags with memoization
export function useFeatureIsOn(key: string): boolean {
  const { isOn } = useGrowthBook()
  // Memoize the result to avoid unnecessary re-renders
  return useMemo(() => isOn(key), [isOn, key])
}

// Convenience hook to check if a feature is in an experiment
export function useExperiment(experimentId: string): {
  isInExperiment: boolean
  variant: string | null
} {
  const { getValue } = useGrowthBook()

  return useMemo(() => {
    const result = getValue(experimentId, null)
    if (result === null) {
      return { isInExperiment: false, variant: null }
    }
    return { isInExperiment: true, variant: String(result) }
  }, [getValue, experimentId])
}
