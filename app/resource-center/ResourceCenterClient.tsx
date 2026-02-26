'use client'

import React, { useState } from 'react'
import Blogs from './blog/Blogs'
import ComparisonsListing from './comparisons/Comparisons'
import Guides from './guides/Guides'
import OpenTelemetry from './opentelemetry/OpenTelemetry'
import Button from '@/components/ui/Button'

const tabs = [
  {
    id: 'blog-tab',
    label: 'Blog',
    target: '#blog',
    controls: 'blog',
    component: Blogs,
  },
  {
    id: 'comparisons-tab',
    label: 'Comparisons',
    target: '#comparisons',
    controls: 'comparisons',
    component: ComparisonsListing,
  },
  {
    id: 'guides-tab',
    label: 'Guides',
    target: '#guides',
    controls: 'guides',
    component: Guides,
  },
  {
    id: 'openTelemetry-tab',
    label: 'OpenTelemetry',
    target: '#openTelemetry',
    controls: 'openTelemetry',
    component: OpenTelemetry,
  },
]

export default function ResourceCenterClient() {
  const [activeTab, setActiveTab] = useState('blog-tab')

  return (
    <div className="container mx-auto py-4">
      <div className="mb-8">
        <ul
          className="-mb-px flex flex-wrap pl-0 text-center text-sm font-medium"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <li key={tab.id} className={index < tabs.length - 1 ? 'me-2' : ''} role="presentation">
              <Button
                isButton={true}
                variant={'secondary'}
                className={`rounded-none bg-transparent hover:bg-transparent ${activeTab === tab.id ? 'border-signoz_indigo-500 border-b-2 text-indigo-500' : ''}`}
                id={tab.id}
                data-tabs-target={tab.target}
                type="button"
                role="tab"
                aria-controls={tab.controls}
                aria-selected="false"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-content pt-6">
        {tabs.map((tab) => activeTab === tab.id && <tab.component key={tab.id} />)}
      </div>
    </div>
  )
}
