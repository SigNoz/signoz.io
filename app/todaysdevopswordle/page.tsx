import React, { Suspense } from 'react'
import { Metadata } from 'next'
import DevopsWordle from './components/wordle-page'

export const metadata: Metadata = {
  title: {
    absolute: 'DevOps Wordle | SigNoz',
  },
  description:
    'This game was created to help you learn the evolving language of observability, DevOps, and monitoring in a playful way. After each game, you\'ll find resources to explore the day\'s word.',
}

export default async function WordleWebPage() {
  return (
    <Suspense>
      <DevopsWordle />
    </Suspense>
  )
}