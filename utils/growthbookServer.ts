import { GrowthBook, setPolyfills, configureCache, FeatureResult } from '@growthbook/growthbook'
import { cache } from 'react'
import { getAnonymousIdFromCookies } from './cookieUtils'
import { cookies, headers } from 'next/headers'

// Configure GrowthBook for Next.js server components
export function configureServerSideGrowthBook() {
  // Tag fetch requests so they can be revalidated on demand
  setPolyfills({
    fetch: (url: string, init?: RequestInit) => {
      // Type assertion for Next.js fetch with next config
      const nextInit = {
        ...init,
        next: {
          // Cache feature definitions for longer in production
          revalidate: process.env.NODE_ENV === 'production' ? 60 : 10,
          tags: ['growthbook'],
        },
      }

      return fetch(url, nextInit as RequestInit)
    },
  })

  // Disable the built-in cache since we're using Next.js's fetch cache instead
  configureCache({
    disableCache: true,
  })
}

// Cache the GrowthBook instance creation for performance
export const getServerGrowthBook = cache(async (forceAnonymousId?: string) => {
  // Configure the server-side polyfills
  configureServerSideGrowthBook()

  // Get anonymous ID from cookies or use the forced one if provided
  const cookieStore = cookies()
  const headerList = headers()
  const cookieHeader = headerList.get('cookie')
  const anonymousId = forceAnonymousId || getAnonymousIdFromCookies(cookieHeader || '') || 'unknown'

  // Create and initialize GrowthBook instance
  const gb = new GrowthBook({
    apiHost: process.env.GROWTHBOOK_API_HOST || process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY || process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  })

  try {
    // Initialize with a timeout to prevent blocking for too long
    await gb.init({ timeout: 1000 })

    // Set the anonymous ID as attribute
    gb.setAttributes({
      id: anonymousId,
    })

    return gb
  } catch (error) {
    console.error('Error initializing GrowthBook:', error)

    // Return the uninitialized instance as fallback
    return gb
  }
})

// Helper function to evaluate feature flags on the server
export async function evaluateFeatureFlag(
  key: string,
  forceAnonymousId?: string
): Promise<boolean> {
  const gb = await getServerGrowthBook(forceAnonymousId)
  return gb.isOn(key)
}

// Helper function to get feature values on the server
export async function getFeatureValue<T>(
  key: string,
  defaultValue: T,
  forceAnonymousId?: string
): Promise<T> {
  const gb = await getServerGrowthBook(forceAnonymousId)
  return gb.getFeatureValue(key, defaultValue) as T
}

// Helper function to get detailed feature result
export async function getFeatureDetails<T>(
  key: string,
  defaultValue: T,
  forceAnonymousId?: string
): Promise<FeatureResult<T>> {
  const gb = await getServerGrowthBook(forceAnonymousId)
  return gb.evalFeature(key) as FeatureResult<T>
}
