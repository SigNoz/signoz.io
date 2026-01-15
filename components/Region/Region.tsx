'use client'

import React from 'react'
import { useRegion } from './RegionContext'

const Region = () => {
  const { region } = useRegion()

  if (region) {
    return <>{region}</>
  }

  return <>&lt;region&gt;</>
}

export default Region
