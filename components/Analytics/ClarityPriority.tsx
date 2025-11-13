'use client'

import { useEffect } from 'react'

export default function ClarityPriority() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('set', 'priority', 'high')
    }
  }, [])

  return null
}

declare global {
  interface Window {
    clarity?: (action: string, key: string, value: string) => void
  }
}
