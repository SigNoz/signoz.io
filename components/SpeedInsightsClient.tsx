'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'

export default function SpeedInsightsClient({ vercelId }: { vercelId: string | null }) {
  const beforeSend = (data: Record<string, unknown>) => {
    if (vercelId) {
      data['x-vercel-id'] = vercelId
    }
    console.log('[SpeedInsights] Sending event:', JSON.stringify(data, null, 2))
    return data
  }

  return <SpeedInsights beforeSend={beforeSend as any} debug />
}
