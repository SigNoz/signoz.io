import React, { Suspense } from 'react'
import { Metadata } from 'next'
import DevopsWordle from './components/wordle-page'

export const metadata: Metadata = {
  title: {
    absolute: 'DevOps Wordle | SigNoz',
  },
  openGraph: {
    title: 'DevOps Wordle | SigNoz',
    description:
      'This game will help you learn the evolving language of observability, DevOps, and monitoring in a playful way. After each game, you will find resources to explore the word.',
    images: '/img/wordle/devops-wordle-meta.webp',
  },
  description:
    'This game will help you learn the evolving language of observability, DevOps, and monitoring in a playful way. After each game, you will find resources to explore the word.',
  twitter: {
    title: 'DevOps Wordle | SigNoz',
    description:
      'This game will help you learn the evolving language of observability, DevOps, and monitoring in a playful way. After each game, you will find resources to explore the word.',
    images: '/img/wordle/devops-wordle-meta.webp',
  },
}

export default async function WordleWebPage() {
  return (
    <Suspense>
      <DevopsWordle />
    </Suspense>
  )
}
