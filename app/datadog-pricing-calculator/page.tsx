import React from 'react';
import Link from 'next/link';
import DatadogPricingCalculator from '@/components/DatadogPricingCalculator/DatadogPricingCalculator';
import Button from '@/components/Button/Button';

export const metadata = {
  title: 'Datadog Pricing Calculator | SigNoz',
  description: 'Estimate your Datadog costs with our interactive pricing calculator. Compare Datadog pricing for logs, APM, and infrastructure monitoring.',
};

export default function DatadogPricingCalculatorPage() {
  return (
    <div className="relative bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      <div className="relative z-[1] container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Datadog Pricing Calculator
          </h1>
          <p className="text-xl text-gray-400">
            Estimate your Datadog bills and make informed decisions about your observability infrastructure
          </p>
        </div>

        <p className="my-4">
        Understanding Datadog pricing can be complex due to its various components and usage-based model. 
        This calculator helps you estimate costs for different Datadog services including infrastructure 
        monitoring, APM, and log management.
      </p>
      <p className="mb-6">
        For a comprehensive breakdown of Datadog's pricing structure and optimization strategies, 
        check out our <Link href="/blog/datadog-pricing" className="text-blue-600 hover:underline">
          detailed guide on Datadog pricing
        </Link>.
      </p>

        <DatadogPricingCalculator />

        <div className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all mx-auto my-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Why Use This Calculator?</h2>
              <ul className="space-y-3 text-gray-300">
                {[
                  'Get instant cost estimates for your Datadog setup',
                  'Compare different usage scenarios',
                  'Understand pricing implications of infrastructure changes',
                  'Plan your observability budget effectively'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">How to Use?</h2>
              <ol className="space-y-3 list-decimal pl-5 text-gray-300">
                <li>Enter your estimated usage for each service</li>
                <li>Adjust values using sliders or input fields</li>
                <li>Review the detailed cost breakdown</li>
                <li>Compare with alternative solutions</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Datadog Plans and Pricing Summary
            <Link href="/blog/datadog-pricing" className="text-sm text-blue-400 hover:underline ml-2">
              (See detailed pricing)
            </Link>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Infrastructure Monitoring - Pro',
                price: '$15/host/month',
                note: 'Centralized monitoring of systems, services, and serverless functions'
              },
              {
                title: 'APM',
                price: '$31/host/month',
                note: 'End-to-end distributed traces, service health metrics, and 15-day historical search & analytics'
              },
              {
                title: 'Log Management',
                price: '$0.10/GB',
                note: 'Ingest, process, and analyze logs with out-of-the-box parsing for 200+ log sources'
              },
              {
                title: 'Real User Monitoring',
                price: '$1.50/1000 sessions',
                note: 'User journey tracking, performance metrics, session replays, and error tracking'
              },
              {
                title: 'Database Monitoring',
                price: '$70/host/month',
                note: 'Monitor database performance, queries, and explain plans with 3-month retention'
              },
              {
                title: 'Continuous Profiler',
                price: '$12/host/month',
                note: 'CPU, memory, and lock profiling for production code optimization'
              },
              {
                title: 'Network Performance Monitoring',
                price: '$5/host/month',
                note: 'Network flow monitoring and DNS request tracking'
              },
              {
                title: 'Synthetic Monitoring',
                price: '$5/1000 tests',
                note: 'API tests, browser tests, and multi-step journeys'
              },
              {
                title: 'Security Monitoring',
                price: '$0.20/GB',
                note: 'Threat detection, compliance monitoring, and SIEM functionality'
              },
              {
                title: 'Incident Management',
                price: 'User-based',
                note: 'Incident tracking and response coordination'
              }
            ].map((plan, index) => (
              <div key={index} className="p-4 border border-gray-700 rounded-lg bg-gray-850 hover:border-blue-500 transition-all">
                <h3 className="font-semibold text-lg mb-2 text-white">{plan.title}</h3>
                <p className="text-2xl font-bold text-blue-400 mb-1">{plan.price}</p>
                <p className="text-sm text-gray-400">{plan.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-2xl font-bold text-white mb-4">Common Challenges with Datadog Pricing</h3>
          
          <div className="space-y-4 text-gray-300">
            <p>
              While Datadog offers powerful observability features, its pricing model can be complex and challenging to predict. Some key issues include:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <span className="font-semibold">Multiple Pricing Models:</span> Different products use different pricing models (host-based, volume-based, user-based), making total cost estimation difficult
              </li>
              <li>
                <span className="font-semibold">Autoscaling Impact:</span> Dynamic infrastructure changes can lead to unexpected cost spikes, especially with host-based pricing
              </li>
              <li>
                <span className="font-semibold">Hidden Costs:</span> Additional charges for features like extra span ingestion or exceeding committed usage can significantly impact your bill
              </li>
            </ul>

            <p className="mt-4">
              For a detailed breakdown of Datadog's pricing models and optimization strategies,{' '}
              <Link href="/blog/datadog-pricing" className="text-blue-400 hover:underline">
                read our comprehensive guide on Datadog Pricing
              </Link>.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r my-8 from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Ready to Optimize Your Observability Costs?</h3>
            <p className="text-lg text-gray-300">
              Discover how SigNoz delivers enterprise-grade observability with predictable pricing and significant cost savings
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>
                <a href="/product-comparison/signoz-vs-datadog/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Compare SigNoz vs. Datadog
                </a>
              </Button>
              <Button type={Button.TYPES.SECONDARY}>
                <a href="/teams/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Try SigNoz for Free →
                </a>
              </Button>
            </div>
          </div>
        </div>

        <p className="text-gray-400 mt-8">
          Note: This calculator provides estimates. For precise pricing, please consult{' '}
          <Link href="https://www.datadoghq.com/pricing/" className="text-blue-400 hover:underline">
            Datadog's official pricing page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
