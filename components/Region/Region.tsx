'use client'

import React from 'react'
import { useRegion } from './RegionContext'

const Region = () => {
  const { selectedRegion } = useRegion()

  if (selectedRegion) {
    return <>{selectedRegion}</>
  }

  return <>&lt;region&gt;</>
}

export default Region
