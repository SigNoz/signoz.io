'use client'

import React, { useState } from 'react'
import Blogs from './Blogs'
import Comparisons from '../comparisons/Comparisons'
import Guides from '../guides/Guides'
import OpenTelemetry from '../opentelemetry/OpenTelemetry'
import Link from 'next/link'
import Tabs from '../Shared/Tabs'

export default function BlogHome() {
  const [activeTab, setActiveTab] = useState('blog-tab')

  return (
    <div className="container mx-auto py-4">
      <Tabs activeTab={activeTab} onSelectTab={setActiveTab} />

      <div className="tab-content">
        {activeTab === 'blog-tab' && <Blogs />}

        {activeTab === 'comparisons-tab' && <Comparisons />}

        {activeTab === 'guides-tab' && <Guides />}

        {activeTab === 'openTelemetry-tab' && <OpenTelemetry />}
      </div>
    </div>
  )
}
