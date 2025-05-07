'use client'

import React, { useEffect, useRef } from 'react'
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
  const hasLoggedRef = useRef(false)

  // Log which variant the user sees - only once when the component mounts
  useEffect(() => {
    // Using ref to ensure we only log once, even in strict mode
    if (!hasLoggedRef.current) {
      logEvent({
        eventName: 'experiment_viewed',
        attributes: {
          experiment_id: experimentId,
          variant_id: variantId,
        },
        eventType: 'track',
      })
      hasLoggedRef.current = true
    }
  }, [experimentId, variantId, logEvent])

  // Just render children, this component only handles tracking experiment views
  return <>{children}</>
}
