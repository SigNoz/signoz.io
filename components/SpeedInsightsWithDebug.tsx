'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { useEffect, useRef } from 'react'

export default function SpeedInsightsWithDebug() {
  const vercelIdRef = useRef<string | null>(null)

  useEffect(() => {
    fetch(window.location.href, { method: 'HEAD' })
      .then((res) => {
        const id = res.headers.get('x-vercel-id')
        if (id) {
          vercelIdRef.current = id
          console.log('[SpeedInsights] x-vercel-id:', id)
        } else {
          console.log('[SpeedInsights] x-vercel-id not found in response headers')
        }
      })
      .catch((err) => {
        console.log('[SpeedInsights] x-vercel-id fetch failed:', err)
      })
  }, [])

  const beforeSend = (data: Record<string, unknown>) => {
    if (vercelIdRef.current) {
      data['x-vercel-id'] = vercelIdRef.current
    }
    console.log('[SpeedInsights] Sending event:', JSON.stringify(data, null, 2))
    return data
  }

  return <SpeedInsights beforeSend={beforeSend as any} debug />
}
