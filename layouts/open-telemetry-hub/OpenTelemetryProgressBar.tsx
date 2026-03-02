'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

import { ProgressBar } from '@/components/ProgressBar/ProgressBar'

interface OpenTelemetryProgressBarProps {
  targetId: string
}

/**
 * Binds the existing ProgressBar component to a DOM node that is rendered
 * by the server component. We only hydrate this tiny wrapper instead of the
 * full article contents.
 */
export default function OpenTelemetryProgressBar({ targetId }: OpenTelemetryProgressBarProps) {
  const progressTarget = useRef<HTMLElement | null>(null)

  useEffect(() => {
    progressTarget.current = document.getElementById(targetId)
  }, [targetId])

  return <ProgressBar target={progressTarget as RefObject<HTMLElement>} />
}
