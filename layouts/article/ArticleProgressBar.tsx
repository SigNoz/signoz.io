'use client'

import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import { useScrollToHash } from '@/hooks/useScrollToHash'

interface ArticleProgressBarProps {
  targetId: string
}

export default function ArticleProgressBar({ targetId }: ArticleProgressBarProps) {
  const progressTarget = useRef<HTMLElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useScrollToHash()

  useEffect(() => {
    progressTarget.current = document.getElementById(targetId)
    setIsReady(Boolean(progressTarget.current))
  }, [targetId])

  if (!isReady) {
    return null
  }

  return <ProgressBar target={progressTarget as RefObject<HTMLElement>} />
}
