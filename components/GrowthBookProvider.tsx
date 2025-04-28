import React from 'react'
import { cookies } from 'next/headers'
import GrowthBookClientProvider from '@/components/GrowthBookClientProvider'
import { getServerGrowthBook } from '../utils/growthbookServer'

export async function GrowthBookProvider({ children }: { children: React.ReactNode }) {
  // Read the anonymous ID from the cookie (populated by middleware)
  const cookieStore = cookies()
  const anonymousId: string = cookieStore.get('gb_anonymous_id')?.value || 'unknown'

  // Initialize GrowthBook on the server to warm up the cache with this ID
  await getServerGrowthBook(anonymousId)

  // Prepare the data to pass to the client component
  const growthBookData = {
    apiHost: process.env.GROWTHBOOK_API_HOST || process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY || process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    anonymousId,
  }

  return <GrowthBookClientProvider data={growthBookData}>{children}</GrowthBookClientProvider>
}
