import React, { Suspense } from 'react'
import { Metadata } from 'next'
import DevopsWordle from './components/wordle-page'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | DevOps Wordle',
  },
  description:
    'A wordle game for DevOps geeks',
}

export default async function WordleWebPage() {
  return (
    <Suspense>
      <DevopsWordle />
    </Suspense>
  )
}