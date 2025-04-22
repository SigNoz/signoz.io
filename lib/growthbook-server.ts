import { GrowthBook } from '@growthbook/growthbook'
import { cache } from 'react'

// Cached function to fetch features from GrowthBook API
export const getFeaturesFromAPI = cache(async () => {
  try {
    const apiHost = process.env.GROWTHBOOK_API_HOST || 'https://cdn.growthbook.io'
    const clientKey = process.env.GROWTHBOOK_CLIENT_KEY || ''

    // Only attempt to fetch if we have a client key
    if (!clientKey) {
      console.warn(
        'GROWTHBOOK_CLIENT_KEY not set. Feature flags will not be available server-side.'
      )
      return {}
    }

    const res = await fetch(`${apiHost}/api/features/${clientKey}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidate data at most every 10 seconds
      next: { revalidate: 10 },
    })

    if (!res.ok) {
      throw new Error(`Error fetching feature flags: ${res.status}`)
    }

    const data = await res.json()
    return data.features || {}
  } catch (error) {
    console.error('Failed to fetch feature flags:', error)
    return {}
  }
})
