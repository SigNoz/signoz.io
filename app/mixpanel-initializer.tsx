'use client'

import React, { useEffect, ReactNode } from 'react'
import { initMixpanel } from '../lib/mixpanelClient'

export default function MixpanelClientInitializer({ children }: { children: ReactNode }): React.ReactElement {
  useEffect(() => {
    // Initialize Mixpanel on the client side
    initMixpanel()
  }, [])

  return <>{children}</>
} 