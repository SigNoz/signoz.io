'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { useEffect, useRef } from 'react'

function getVercelIdFromCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)x-vercel-id=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

export default function SpeedInsightsWithDebug() {
  const vercelIdFromCookieRef = useRef<string | null>(null)
  const vercelIdFromFetchRef = useRef<string | null>(null)

  useEffect(() => {
    const fromCookie = getVercelIdFromCookie()
    if (fromCookie) {
      vercelIdFromCookieRef.current = fromCookie
      console.log('[SpeedInsights] x-vercel-id from cookie:', fromCookie)
    } else {
      console.log('[SpeedInsights] x-vercel-id cookie not found')
    }

    fetch(window.location.href, { method: 'HEAD' })
      .then((res) => {
        const id = res.headers.get('x-vercel-id')
        if (id) {
          vercelIdFromFetchRef.current = id
          console.log('[SpeedInsights] x-vercel-id from fetch:', id)
        } else {
          console.log('[SpeedInsights] x-vercel-id not found in fetch response headers')
        }
      })
      .catch((err) => {
        console.log('[SpeedInsights] x-vercel-id fetch failed:', err)
      })
  }, [])

  const beforeSend = (data: Record<string, unknown>) => {
    const fromCookie = vercelIdFromCookieRef.current
    const fromFetch = vercelIdFromFetchRef.current

    if (fromCookie) {
      data['x-vercel-id-cookie'] = fromCookie
    }
    if (fromFetch) {
      data['x-vercel-id-fetch'] = fromFetch
    }

    data['x-vercel-id'] = fromCookie || fromFetch || null

    console.log('[SpeedInsights] Sending event:', JSON.stringify(data, null, 2))
    console.log(
      '[SpeedInsights] x-vercel-id source:',
      fromCookie ? 'cookie' : fromFetch ? 'fetch' : 'none'
    )
    return data
  }

  return <SpeedInsights beforeSend={beforeSend as any} debug />
}
