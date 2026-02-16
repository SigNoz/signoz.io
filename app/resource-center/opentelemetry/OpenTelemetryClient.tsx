'use client'

import React, { useState } from 'react'
import Blogs from '../blog/Blogs'
import Comparisons from '../comparisons/Comparisons'
import Guides from '../guides/Guides'
import OpenTelemetry from './OpenTelemetry'
import { MDXContent } from '@/utils/strapi'
import type { Comparison, Guide } from '../../../types/transformedContent'

export default function OpenTelemetryClient({
  initialArticles,
  comparisons,
  guides,
}: {
  initialArticles?: MDXContent[]
  comparisons?: Comparison[]
  guides?: Guide[]
}) {
  const [activeTab, setActiveTab] = useState('openTelemetry-tab')

  return (
    <div className="container mx-auto !mt-[48px] py-16 sm:py-8">
      <div className="tab-content pt-6">
        {activeTab === 'blog-tab' && <Blogs />}

        {activeTab === 'comparisons-tab' && <Comparisons comparisons={comparisons} />}

        {activeTab === 'guides-tab' && <Guides guides={guides} />}

        {activeTab === 'openTelemetry-tab' && (
          <OpenTelemetry articles={initialArticles} guides={guides} />
        )}
      </div>
    </div>
  )
}
