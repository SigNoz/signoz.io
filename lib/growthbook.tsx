'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { GrowthBook, GrowthBookProvider as GBProvider } from '@growthbook/growthbook-react'

// Create a GrowthBook instance with client-side configuration
export const growthbook = new GrowthBook({
  apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST || 'https://cdn.growthbook.io',
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || '',
  enableDevMode: process.env.NODE_ENV !== 'production',
  trackingCallback: (experiment, result) => {
    // You can integrate with your analytics system here
    console.log('Experiment Viewed', {
      experimentId: experiment.key,
      variationId: result.key,
    })
  },
})

// Create a context to store the initialized state
type GrowthBookContextType = {
  ready: boolean
}

const GrowthBookContext = createContext<GrowthBookContextType>({ ready: false })

export function useGrowthBookReady() {
  return useContext(GrowthBookContext).ready
}

export function GrowthBookProvider({
  children,
  initialFeatures,
}: {
  children: React.ReactNode
  initialFeatures?: Record<string, any>
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (initialFeatures) {
      // If we're hydrating from server-side, use the initial features
      growthbook.setPayload({ features: initialFeatures })
      setReady(true)
    } else {
      // Otherwise, initialize with client-side fetching
      growthbook
        .init({
          streaming: true, // Enable streaming updates
        })
        .then(() => {
          setReady(true)
        })
    }

    // Set user attributes when needed (from cookie, auth system, etc.)
    const setUserAttributes = () => {
      // Example: getting attributes from localStorage or cookies
      growthbook.setAttributes({
        /* For example:
        id: getUserId(),
        loggedIn: isLoggedIn(),
        */
      })
    }

    setUserAttributes()

    // You could also set up listeners for user state changes
    // and update attributes accordingly
  }, [initialFeatures])

  return (
    <GrowthBookContext.Provider value={{ ready }}>
      <GBProvider growthbook={growthbook}>{children}</GBProvider>
    </GrowthBookContext.Provider>
  )
}
