'use client'

import React from 'react'
import { Typography } from '@signozhq/ui/typography'
import { useRegion } from './RegionContext'

const Region = () => {
  const { region } = useRegion()

  if (region) {
    return <Typography.Text as="span">{region}</Typography.Text>
  }

  return <Typography.Text as="span">&lt;region&gt;</Typography.Text>
}

export default Region
