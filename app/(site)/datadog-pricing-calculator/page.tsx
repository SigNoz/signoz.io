import React from 'react'
import Link from 'next/link'
import DatadogPricingCalculator from '@/components/DatadogPricingCalculator/DatadogPricingCalculator'
import DatadogVsSigNoz from '@/components/DatadogVsSigNoz/DatadogVsSigNoz'

export const metadata = {
  title: 'Datadog Pricing Calculator',
  description:
    'Estimate Datadog costs for logs, APM, and infrastructure monitoring with billed-annually list rates, then review how SigNoz Cloud pricing differs.',
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
            Estimate your Datadog bill, then review how SigNoz Cloud uses usage-based pricing
          </p>
        </div>

        <div className="mb-8">
          <p className="mb-4">
            Understanding Datadog pricing can be complex because its products use different billing
            units. This calculator estimates billed-annually list-price costs for infrastructure
            monitoring, APM, and{' '}
            <Link href="/blog/datadog-logs-pricing/" className="text-blue-400 hover:underline">
              log management
            </Link>
            .
          </p>
          <p>
            The result estimates Datadog only. Use it with current SigNoz Cloud usage and retention
            pricing when you compare the two products. For a full breakdown of Datadog's pricing
            structure and optimization strategies, see our{' '}
            <Link href="/blog/datadog-pricing/" className="text-blue-400 hover:underline">
              detailed guide on Datadog pricing
            </Link>
            .
          </p>
        </div>

        <DatadogPricingCalculator />

        <p className="mb-0 mt-3 text-xs leading-5 text-gray-400">
          Estimate method: selected log units × selected log rate + APM hosts × selected APM rate +
          infrastructure hosts × selected infrastructure rate. Rates are billed-annually monthly list
          prices checked on August 9, 2026. The estimate excludes taxes, negotiated discounts,
          contract-specific commitments, containers, custom metrics and events, extra span ingestion,
          and products not shown. The APM DevSecOps options are not on Datadog&apos;s current public
          price list; confirm those rates with Datadog.
        </p>

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
                <li>Review how the estimate differs from SigNoz Cloud pricing</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Datadog Plans and Pricing Summary
            <Link
              href="/blog/datadog-pricing/"
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
                title: 'Logs - Ingestion',
                price: '$0.10/GB',
                note: 'Log ingestion only; indexed storage and other log products are billed separately',
              },
              {
                title: 'Real User Monitoring',
                price: '$0.15–$3/1000 sessions',
                note: 'RUM Measure (ingest) starts at $0.15/1000 sessions and RUM Investigate is $3/1000 filtered sessions. User journey tracking, performance metrics, and error tracking',
              },
              {
                title: 'Database Monitoring',
                price: '$70/host/month',
                note: 'Monitor database performance, queries, and explain plans with 3-month retention',
              },
              {
                title: 'Continuous Profiler',
                price: '$19/host/month',
                note: 'CPU, memory, and lock profiling for production code optimization',
              },
              {
                title: 'Cloud Network Monitoring',
                price: '$5/network host/month',
                note: 'Network flow monitoring and DNS request tracking',
              },
              {
                title: 'Synthetic API Tests',
                price: '$5/10,000 API test runs',
                note: 'API test runs; browser tests use a separate billing unit and rate',
              },
              {
                title: 'Cloud SIEM',
                price: '$5/1M analyzed events',
                note: 'One million analyzed events per month at the billed-annually list rate',
              },
              {
                title: 'Incident Management',
                price: '$30/seat/month',
                note: 'Incident tracking and response coordination at the billed-annually list rate',
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
                like extra span ingestion,{' '}
                <Link
                  href="/blog/datadog-custom-metrics-pricing/"
                  className="text-blue-400 hover:underline"
                >
                  custom metrics
                </Link>
                , or exceeding committed usage can significantly impact your bill
              </li>
            </ul>

            <p>
              If your bill is already climbing, our guide on{' '}
              <Link
                href="/guides/how-to-reduce-datadog-costs/"
                className="text-blue-400 hover:underline"
              >
                how to reduce Datadog costs
              </Link>{' '}
              walks through practical ways to bring it down.
            </p>
          </div>
        </div>

        <DatadogVsSigNoz />

        <p className="text-gray-400">
          Note: This calculator provides a billed-annually list-price estimate. Contract terms,
          negotiated discounts, taxes, and products outside the selected inputs can change the
          actual bill. Datadog pricing was checked on August 9, 2026. For current pricing, consult{' '}
          <Link href="https://www.datadoghq.com/pricing/" className="text-blue-400 hover:underline">
            Datadog's official pricing page
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
