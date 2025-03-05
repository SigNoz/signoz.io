'use client'

import React, { useState } from 'react'
import Blogs from '../blog/Blogs'
import Comparisons from '../comparisons/Comparisons'
import Guides from '../guides/Guides'
import OpenTelemetry from './OpenTelemetry'
import Tabs from '../Shared/Tabs'

export default function OpenTelemetryClient() {
  const [activeTab, setActiveTab] = useState('openTelemetry-tab')

  return (
    <div className="container mx-auto py-16 sm:py-8 !mt-[48px]">
      <div className="tab-content pt-6">
        {activeTab === 'blog-tab' && <Blogs />}

        {activeTab === 'comparisons-tab' && <Comparisons />}

        {activeTab === 'guides-tab' && <Guides />}

        {activeTab === 'openTelemetry-tab' && <OpenTelemetry />}
      </div>
    </div>
  )
} 