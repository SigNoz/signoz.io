import React from 'react'
import { headers } from 'next/headers'
import { getAnonymousIdFromCookies } from '../utils/cookieUtils'
import GrowthBookClientProvider from '@/components/GrowthBookClientProvider'
import { getServerGrowthBook } from '../utils/growthbookServer'

export async function GrowthBookProvider({ children }: { children: React.ReactNode }) {
  // Get anonymous ID from cookies for consistent user experience
  const cookieHeader = headers().get('cookie')
  const anonymousId = getAnonymousIdFromCookies(cookieHeader || '')

  // Initialize GrowthBook on the server to warm up the cache
  // This ensures features are loaded and cached during server rendering
  await getServerGrowthBook(anonymousId)

  // Prepare the data to pass to the client component
  const growthBookData = {
    apiHost: process.env.GROWTHBOOK_API_HOST || process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY || process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    anonymousId: anonymousId || 'unknown',
  }

  return <GrowthBookClientProvider data={growthBookData}>{children}</GrowthBookClientProvider>
}
