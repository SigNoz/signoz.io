import React from 'react'
import Comparisons from './Comparisons'
import { fetchAllComparisonsForPage } from '@/utils/cachedData'
import { sortPosts } from 'pliny/utils/contentlayer'
import { CMS_REVALIDATE_INTERVAL } from '@/constants/cache'
import { pickResourceCenterCardFields } from '../content'

export const revalidate = CMS_REVALIDATE_INTERVAL
export const dynamic = 'force-static'

export default async function ComparisonsHome() {
  const comparisons = await fetchAllComparisonsForPage()
  const posts = sortPosts(comparisons).map(pickResourceCenterCardFields)

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Comparisons posts={posts} />
      </div>
    </div>
  )
}
