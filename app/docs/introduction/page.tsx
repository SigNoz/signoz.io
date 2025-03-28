import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description: 'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.',
}

export default function DocsIntroductionPage() {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <div className="hero-section mb-12">
        <h1 className="text-4xl font-bold mb-4">Introduction to SigNoz</h1>
        <p className="text-xl mb-6">
          Your complete guide to using SigNoz for application monitoring and observability
        </p>
        <div className="cta-buttons flex flex-wrap gap-4">
          <Link 
            href="/teams/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Get Started with SigNoz Cloud
          </Link>
          <Link 
            href="/docs/install/" 
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Self-Host SigNoz
          </Link>
        </div>
      </div>
      
      {/* Feature cards section */}
      <div className="feature-cards-section mb-12">
        <h2 className="text-2xl font-semibold mb-6">Explore SigNoz Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature card */}
          <div className="feature-card p-6 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Application Performance Monitoring</h3>
            <p className="mb-4">Monitor application metrics, latency, and errors in real-time</p>
            <Link href="/docs/instrumentation/overview" className="text-blue-600 hover:text-blue-800">Learn more →</Link>
          </div>
          {/* More feature cards would go here */}
        </div>
      </div>
      
      {/* Quick start guides */}
      <div className="quick-start-section">
        <h2 className="text-2xl font-semibold mb-6">Quick Start Guides</h2>
        <p className="mb-6">Get up and running with SigNoz for your specific use case</p>
        <div className="space-y-2">
          <Link href="/docs/instrumentation/overview" className="block hover:bg-gray-100 p-3 rounded transition duration-200">
            Application Performance Monitoring
          </Link>
          {/* More quick start links would go here */}
        </div>
      </div>
    </div>
  )
} 