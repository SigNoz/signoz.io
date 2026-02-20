'use client'

import React, { useState } from 'react'
import Blogs from '../blog/Blogs'
import Comparisons from '../comparisons/Comparisons'
import Guides from '../guides/Guides'
import OpenTelemetry from './OpenTelemetry'
import { MDXContent } from '@/utils/strapi'

export default function OpenTelemetryClient({
  initialArticles,
  comparisonPosts,
}: {
  initialArticles?: MDXContent[]
  comparisonPosts?: any[]
}) {
  const [activeTab, setActiveTab] = useState('openTelemetry-tab')

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        {activeTab === 'blog-tab' && <Blogs />}

        {activeTab === 'comparisons-tab' && <Comparisons posts={comparisonPosts} />}

        {activeTab === 'guides-tab' && <Guides />}

        {activeTab === 'openTelemetry-tab' && <OpenTelemetry articles={initialArticles} />}
      </div>
    </div>
  )
}
