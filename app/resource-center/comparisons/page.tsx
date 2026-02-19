import React from 'react'
import Comparisons from './Comparisons'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'

export const revalidate = CMS_REVALIDATE_INTERVAL

export default async function ComparisonsHome() {
  const comparisons = await fetchAllComparisonsForPage()

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Comparisons comparisons={comparisons} />
      </div>
    </div>
  )
}
