'use client'

import React, { useState } from 'react'
import Blogs from '../blog/Blogs'
import Comparisons from '../comparisons/Comparisons'
import Guides from '../guides/Guides'
import OpenTelemetry from './OpenTelemetry'
import type {
  ResourceCenterBlog,
  ResourceCenterComparison,
  ResourceCenterGuide,
  ResourceCenterOpenTelemetryArticle,
} from '../content'

export default function OpenTelemetryClient({
  initialArticles,
  comparisonPosts,
  blogPosts,
  guidePosts,
}: {
  initialArticles?: ResourceCenterOpenTelemetryArticle[]
  comparisonPosts?: ResourceCenterComparison[]
  blogPosts: ResourceCenterBlog[]
  guidePosts: ResourceCenterGuide[]
}) {
  const [activeTab, setActiveTab] = useState('openTelemetry-tab')

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        {activeTab === 'blog-tab' && <Blogs posts={blogPosts} />}

        {activeTab === 'comparisons-tab' && <Comparisons posts={comparisonPosts} />}

        {activeTab === 'guides-tab' && <Guides posts={guidePosts} />}

        {activeTab === 'openTelemetry-tab' && (
          <OpenTelemetry articles={initialArticles} blogPosts={blogPosts} guidePosts={guidePosts} />
        )}
      </div>
    </div>
  )
}
