'use client'

import React, { useState } from 'react'
import Blogs from './blog/Blogs'
import ComparisonsListing from './comparisons/Comparisons'
import Guides from './guides/Guides'
import OpenTelemetry from './opentelemetry/OpenTelemetry'
import Button from '@/components/ui/Button'
import type {
  ResourceCenterBlog,
  ResourceCenterComparison,
  ResourceCenterGuide,
  ResourceCenterOpenTelemetryArticle,
} from './content'

const tabs = [
  {
    id: 'blog-tab',
    label: 'Blog',
    target: '#blog',
    controls: 'blog',
  },
  {
    id: 'comparisons-tab',
    label: 'Comparisons',
    target: '#comparisons',
    controls: 'comparisons',
  },
  {
    id: 'guides-tab',
    label: 'Guides',
    target: '#guides',
    controls: 'guides',
  },
  {
    id: 'openTelemetry-tab',
    label: 'OpenTelemetry',
    target: '#openTelemetry',
    controls: 'openTelemetry',
  },
]

export default function ResourceCenterClient({
  blogPosts,
  guidePosts,
  openTelemetryArticles = [],
  comparisonPosts = [],
}: {
  blogPosts: ResourceCenterBlog[]
  guidePosts: ResourceCenterGuide[]
  openTelemetryArticles?: ResourceCenterOpenTelemetryArticle[]
  comparisonPosts?: ResourceCenterComparison[]
}) {
  const [activeTab, setActiveTab] = useState('blog-tab')

  let content = <Blogs posts={blogPosts} />

  if (activeTab === 'comparisons-tab') {
    content = <ComparisonsListing posts={comparisonPosts} />
  } else if (activeTab === 'guides-tab') {
    content = <Guides posts={guidePosts} />
  } else if (activeTab === 'openTelemetry-tab') {
    content = (
      <OpenTelemetry
        articles={openTelemetryArticles}
        blogPosts={blogPosts}
        guidePosts={guidePosts}
      />
    )
  }

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

      <div className="tab-content pt-6">{content}</div>
    </div>
  )
}
