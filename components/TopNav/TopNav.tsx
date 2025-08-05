'use client'

import React, { Suspense } from 'react'
import TopNavStaticContent from './TopNavStaticContent'
import TopNavContent from './TopNavContent'

export default function TopNav() {
  return (
    <Suspense fallback={<TopNavStaticContent />}>
      <TopNavContent />
    </Suspense>
  )
}