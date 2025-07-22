'use client'

import React, { useEffect, useState } from 'react'
import GrowthBookClientProvider from '@/components/GrowthBookClientProvider'
import { getOrCreateAnonymousId } from '@/utils/userUtils'

export function GrowthBookProvider({ children }: { children: React.ReactNode }) {
  const [anonId, setAnonId] = useState<string | undefined>(undefined)

  // Obtain (or create) anonymous id on the client
  useEffect(() => {
    const id = getOrCreateAnonymousId() || 'unknown'
    setAnonId(id)
  }, [])

  // Until we have an anonymous id just render children (avoids mismatch)
  if (!anonId) {
    return <>{children}</>
  }

  const growthBookData = {
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    anonymousId: anonId,
  }

  return <GrowthBookClientProvider data={growthBookData}>{children}</GrowthBookClientProvider>
}
