import React from 'react'
import Guides from './Guides'
import { fetchAllGuidesForPage } from '@/utils/cachedData'

export default async function GuidesHome() {
  const guides = await fetchAllGuidesForPage()

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Guides guides={guides} />
      </div>
    </div>
  )
}
