'use client'

import React, { useEffect } from 'react'
import { useLogEvent } from '@/hooks/useLogEvent'

type ExperimentTrackerProps = {
  children: React.ReactNode
  experimentId: string
  variantId: string
}

/**
 * Tracks when a user views an experiment variant
 * This is separate from TrackingLink to ensure we only fire the viewed event once per experiment
 */
export function ExperimentTracker({ children, experimentId, variantId }: ExperimentTrackerProps) {
  const logEvent = useLogEvent()

  // Log which variant the user sees - only once when the component mounts
  useEffect(() => {
    logEvent({
      eventName: 'experiment_viewed',
      attributes: {
        experiment_id: experimentId,
        variant_id: variantId,
      },
      eventType: 'track',
    })
  }, [experimentId, variantId, logEvent])

  // Just render children, this component only handles tracking experiment views
  return <>{children}</>
}
