'use client'

import React, { useState } from 'react'
import Blogs from '../blog/Blogs'
import Comparisons from './Comparisons'
import Guides from '../guides/Guides'
import OpenTelemetry from '../opentelemetry/OpenTelemetry'
import Tabs from '../Shared/Tabs'

export default function ComparisonsHome() {
  const [activeTab, setActiveTab] = useState('comparisons-tab')

  return (
    <div className="container mx-auto py-4">
      <Tabs activeTab={activeTab} />

      <div className="tab-content">
        {activeTab === 'blog-tab' && <Blogs />}

        {activeTab === 'comparisons-tab' && <Comparisons />}

        {activeTab === 'guides-tab' && <Guides />}

        {activeTab === 'openTelemetry-tab' && <OpenTelemetry />}
      </div>
    </div>
  )
}
