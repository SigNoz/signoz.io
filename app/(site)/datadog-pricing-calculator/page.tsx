import React from 'react'
import Link from 'next/link'
import DatadogPricingCalculator from '@/components/DatadogPricingCalculator/DatadogPricingCalculator'
import DatadogVsSigNoz from '@/components/DatadogVsSigNoz/DatadogVsSigNoz'

export const metadata = {
  title: 'Datadog Pricing Calculator | SigNoz',
  description:
    'Estimate your Datadog costs with our interactive pricing calculator. Compare Datadog pricing for logs, APM, and infrastructure monitoring.',
}

export default function DatadogPricingCalculatorPage() {
  return (
    <div className="relative bg-signoz_ink-500 p-8">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      <div className="container relative z-[1] mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Datadog Pricing Calculator
          </h1>
          <p className="text-xl text-gray-400">
            Estimate your Datadog bills and make informed decisions about your observability
            infrastructure
          </p>
        </div>

        <div className="mb-8">
          <p className="mb-4">
            Understanding Datadog pricing can be complex due to its various components and
            usage-based model. This calculator helps you estimate costs for different Datadog
            services including infrastructure monitoring, APM, and log management.
          </p>
          <p>
            For a comprehensive breakdown of Datadog's pricing structure and optimization
            strategies, check out our{' '}
            <Link href="/blog/datadog-pricing" className="text-blue-600 hover:underline">
              detailed guide on Datadog pricing
            </Link>
            .
          </p>
        </div>

        <DatadogPricingCalculator />

        <div className="my-8 rounded-xl bg-gray-800 p-8 shadow-lg transition-all hover:shadow-xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">Why Use This Calculator?</h2>
              <ul className="space-y-3 pl-0 text-gray-300">
                {[
                  'Get instant cost estimates for your Datadog setup',
                  'Compare different usage scenarios',
                  'Understand pricing implications of infrastructure changes',
                  'Plan your observability budget effectively',
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">How to Use?</h2>
              <ol className="list-decimal space-y-3 pl-5 text-gray-300">
                <li>Enter your estimated usage for each service</li>
                <li>Adjust values using sliders or input fields</li>
                <li>Review the detailed cost breakdown</li>
                <li>Compare with alternative solutions</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Datadog Plans and Pricing Summary
            <Link
              href="/blog/datadog-pricing"
              className="ml-2 text-sm text-blue-400 hover:underline"
            >
              (See detailed pricing)
            </Link>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Infrastructure Monitoring - Pro',
                price: '$15/host/month',
                note: 'Centralized monitoring of systems, services, and serverless functions',
              },
              {
                title: 'APM',
                price: '$31/host/month',
                note: 'End-to-end distributed traces, service health metrics, and 15-day historical search & analytics',
              },
              {
                title: 'Log Management',
                price: '$0.10/GB',
                note: 'Ingest, process, and analyze logs with out-of-the-box parsing for 200+ log sources',
              },
              {
                title: 'Real User Monitoring',
                price: '$1.50/1000 sessions',
                note: 'User journey tracking, performance metrics, session replays, and error tracking',
              },
              {
                title: 'Database Monitoring',
                price: '$70/host/month',
                note: 'Monitor database performance, queries, and explain plans with 3-month retention',
              },
              {
                title: 'Continuous Profiler',
                price: '$12/host/month',
                note: 'CPU, memory, and lock profiling for production code optimization',
              },
              {
                title: 'Network Performance Monitoring',
                price: '$5/host/month',
                note: 'Network flow monitoring and DNS request tracking',
              },
              {
                title: 'Synthetic Monitoring',
                price: '$5/1000 tests',
                note: 'API tests, browser tests, and multi-step journeys',
              },
              {
                title: 'Security Monitoring',
                price: '$0.20/GB',
                note: 'Threat detection, compliance monitoring, and SIEM functionality',
              },
              {
                title: 'Incident Management',
                price: 'User-based',
                note: 'Incident tracking and response coordination',
              },
            ].map((plan, index) => (
              <div
                key={index}
                className="bg-gray-850 rounded-lg border border-gray-700 p-6 transition-all hover:border-blue-500"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">{plan.title}</h3>
                <p className="mb-2 text-2xl font-bold text-blue-400">{plan.price}</p>
                <p className="text-sm text-gray-400">{plan.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Common Challenges with Datadog Pricing
          </h3>

          <div className="space-y-4 text-gray-300">
            <p>
              While Datadog offers powerful observability features, its pricing model can be complex
              and challenging to predict. Some key issues include:
            </p>

            <ul className="ml-4 list-inside list-disc space-y-2 pl-0">
              <li>
                <span className="font-semibold">Multiple Pricing Models:</span> Different products
                use different pricing models (host-based, volume-based, user-based), making total
                cost estimation difficult
              </li>
              <li>
                <span className="font-semibold">Autoscaling Impact:</span> Dynamic infrastructure
                changes can lead to unexpected cost spikes, especially with host-based pricing
              </li>
              <li>
                <span className="font-semibold">Hidden Costs:</span> Additional charges for features
                like extra span ingestion or exceeding committed usage can significantly impact your
                bill
              </li>
            </ul>

            <p>
              For a detailed breakdown of Datadog's pricing models and optimization strategies,{' '}
              <Link href="/blog/datadog-pricing" className="text-blue-400 hover:underline">
                read our comprehensive guide on Datadog Pricing
              </Link>
              .
            </p>
          </div>
        </div>

        <DatadogVsSigNoz />

        <p className="text-gray-400">
          Note: This calculator provides estimates. For precise pricing, please consult{' '}
          <Link href="https://www.datadoghq.com/pricing/" className="text-blue-400 hover:underline">
            Datadog's official pricing page
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
