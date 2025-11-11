'use client'

import React, { useState } from 'react'
import Blogs from '../blog/Blogs'
import Comparisons from '../comparisons/Comparisons'
import Guides from './Guides'
import OpenTelemetry from '../opentelemetry/OpenTelemetry'

export default function GuidesHome() {
  const [activeTab, setActiveTab] = useState('guides-tab')

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
