import React from 'react'
import Guides from './Guides'
import { getResourceCenterGuides } from '../content'

export default function GuidesHome() {
  const posts = getResourceCenterGuides()

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Guides posts={posts} />
      </div>
    </div>
  )
}
