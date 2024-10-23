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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Datadog Pricing Calculator</h1>
      <h2 className="text-xl font-semibold mb-6 text-gray-400">Estimate Your Datadog Bills</h2>
      <p className="my-4">
        Understanding Datadog pricing can be complex due to its various components and usage-based model. 
        This calculator helps you estimate costs for different Datadog services including infrastructure 
        monitoring, APM, and log management.
      </p>
      <p className="mb-6">
        For a comprehensive breakdown of Datadog's pricing structure and optimization strategies, 
        check out our <Link href="/blog/datadog-pricing" className="text-blue-600 hover:underline">
        detailed guide on Datadog pricing</Link>.
      </p>

      <DatadogPricingCalculator />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Why Use This Calculator?</h2>
        <ul className="list-disc pl-5">
          <li>Get a quick estimate of your potential Datadog costs</li>
          <li>Compare different usage scenarios</li>
          <li>Understand how changes in your infrastructure affect pricing</li>
          <li>Plan your observability budget more effectively</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-4">How to Use This Calculator</h2>
      <ol className="list-decimal pl-5 mb-6">
        <li>Enter your estimated usage for each Datadog service (e.g., number of hosts, log volume).</li>
        <li>Adjust the sliders or input fields to see how changes affect your total cost.</li>
        <li>Review the breakdown of costs for each service.</li>
        <li>Use the results to plan your observability budget or compare with alternative solutions.</li>
      </ol>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Datadog Plans and Pricing Summary</h2>
        <p className="mb-4">
          Datadog offers various pricing plans tailored to different needs, including:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li><strong>Infrastructure Monitoring:</strong> Starting at $15 per host per month (billed annually).</li>
          <li><strong>APM (Application Performance Monitoring):</strong> Starting at $31 per host per month (billed annually).</li>
          <li><strong>Log Management:</strong> $0.10 per GB ingested per month (billed annually).</li>
          <li><strong>Real User Monitoring:</strong> $1.50 per 1,000 sessions per month (billed annually).</li>
          <li><strong>Database Monitoring:</strong> $70 per database host per month (billed annually).</li>
        </ul>
        <p>
          For more detailed information on each plan, please refer to our <Link href="/blog/datadog-pricing" className="text-blue-600 hover:underline">detailed guide on Datadog pricing</Link>.
        </p>
      </div>

      <p className="mt-6">
        Remember, while this calculator provides a good estimate, actual costs may vary. Always consult 
        Datadog's official pricing page or contact their sales team for the most accurate and up-to-date pricing information.
      </p>

      <div className="w-full my-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <div className="space-y-4">
            <h3 className="text-2xl my-0 font-bold text-white">Ready to Optimize Your Observability Costs?</h3>
            <p className="text-gray-300">
              Discover how SigNoz offers a seamless migration path from Datadog with comparable features and significant
              cost savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>
                <a href="/product-comparison/signoz-vs-datadog/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Compare SigNoz vs. Datadog
                </a>
              </Button>
              <Button href="/teams/" type={Button.TYPES.SECONDARY}>
                <a href="/teams/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Try SigNoz for Free &rarr;
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
