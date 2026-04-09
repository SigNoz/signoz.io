import React from 'react'
import Guides from './Guides'
import { getResourceCenterGuides } from '../content'

const guidePosts = getResourceCenterGuides()

export default function GuidesHome() {
  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        <Guides posts={guidePosts} />
      </div>
    </div>
  )
}
