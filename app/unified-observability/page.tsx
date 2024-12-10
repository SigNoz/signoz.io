'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GetStartedSigNoz from '@/components/GetStartedSigNoz/GetStartedSigNoz';
import Button from '@/components/ui/Button';

const UnifiedObservability = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mb-10 lg:mb-0"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Unified Observability
          </h1>
          <h3 className="text-xl lg:text-2xl mb-8 text-gray-300">
            Transform your monitoring from fragmented silos to seamless insights with SigNoz's single-pane unified observability platform
          </h3>
          <div className="flex gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
              href="/signup"
            >
              Get Started - Free
            </Button>
          </div>
          <p className="mt-4 text-gray-400">
            Where Metrics, Traces, and Logs Unite for Faster Resolution
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <video 
              width="820" 
              height="540" 
              controls 
              autoPlay 
              muted 
              loop 
              className="w-full"
            >
              <source 
                src="/img/blog/2024/06/correlating-traces-logs-metrics-nodejs-video-interaction.mov" 
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-gray-300 text-lg leading-relaxed">
          <p>
            Unified observability is a comprehensive approach that consolidates various monitoring data—such as logs, metrics, and traces—into a single platform. This integration provides a holistic view of system health and performance, enabling teams to detect and resolve issues more efficiently. By breaking down data silos, unified observability facilitates better collaboration across development, operations, and security teams, leading to enhanced system reliability and a superior user experience.
          </p>
        </div>
      </section>

      {/* Current State Section */}
      <section className="container mx-auto px-4 py-16 bg-opacity-50 backdrop-blur-lg">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
          Current State: Fragmented Tools & Complex Environments
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300">
            <p className="text-xl">
              Many organizations struggle with disconnected observability tools. Each team operates in isolation:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>Metrics team manages Prometheus without trace context</li>
              <li>Tracing team runs Jaeger/Zipkin without metric correlation</li>
              <li>Logging team handles ELK/Splunk without trace linking</li>
            </ul>
            <p className="text-xl mt-6">
              Result: Slower resolution times, missed insights, and team friction.
            </p>
            <p className="text-xl">
              Multi-cloud environments. Each cloud having its own monitoring tool. Need data at a central place for unified observability.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/img/unified-observability/fragmented-tools.png"
              alt="Fragmented Tools Diagram"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SigNoz Platform Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">
          SigNoz: Unified Observability Platform Powered by OpenTelemetry
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300">
            <p className="text-xl">
              Unified observability is more than just monitoring—it's about gaining a comprehensive understanding of your entire system's health, performance, and behavior in real-time. SigNoz brings together metrics, traces, and logs into a single, cohesive platform, enabling you to:
            </p>
            <ul className="list-disc list-inside space-y-3">
              <li>Quickly identify and resolve issues across your entire stack spanning multiple clouds.</li>
              <li>Automatic correlation between different data types.</li>
              <li>Make data-driven decisions with confidence.</li>
              <li>Reduce mean time to resolution (MTTR).</li>
            </ul>
          </div>
          <div className="relative">
            <Image
              src="/img/unified-observability/signoz-platform.png"
              alt="SigNoz Platform"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* OpenTelemetry Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <h2 className="text-3xl font-bold mb-8">Why OpenTelemetry?</h2>
        <div className="max-w-4xl mx-auto text-gray-300">
          <p className="text-xl mb-6">
            Collect telemetry with OpenTelemetry - a single open source standard for instrumenting cloud native applications. Using OpenTelemetry future-proofs your observability needs:
          </p>
          <ul className="list-disc list-inside space-y-3">
            <li>Frees you from vendor lock-in</li>
            <li>Semantic conventions ensure consistent data collection across different services and languages</li>
            <li>Extensive language support with SDKs for all major programming languages</li>
            <li>Active community and industry backing from major cloud providers</li>
          </ul>
        </div>
      </section>

      {/* Features Carousel */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose SigNoz as Your Unified Observability Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Complete Visibility",
              description: "Get full-stack observability with metrics, traces, and logs, exceptions, in one unified platform"
            },
            {
              title: "Cost-Effective Solution",
              description: "Eliminate expensive vendor lock-in with our open-source approach"
            },
            {
              title: "Built on top of OpenTelemetry",
              description: "Future-proof your observability with the fastest-growing observability standard"
            },
            {
              title: "Custom Dashboards",
              description: "Create tailored views for different teams and use cases or use templates provided by SigNoz"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-400">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Need for Unified Observability */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">Need for Unified Observability</h2>
        <div className="space-y-12">
          <div className="text-gray-300">
            <p className="text-xl mb-6">Imagine your e-commerce platform is experiencing issues:</p>
            <Image
              src="/img/unified-observability/unified-vs-fragmented.png"
              alt="Unified vs Fragmented Observability"
              width={1200}
              height={600}
              className="rounded-xl shadow-2xl mb-8"
            />
            <ul className="list-disc list-inside space-y-3 mb-8">
              <li>Multiple services showing alerts</li>
              <li>Auth, API, and User services all failing</li>
              <li>No clear indication of which service failed first</li>
              <li>Teams scrambling to find the root cause</li>
            </ul>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">This is the reality of modern architectures:</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Microservices spanning multiple clouds</li>
                <li>Complex container orchestration</li>
                <li>Serverless functions triggering in chains</li>
                <li>Each service generating its own telemetry data</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">When issues arise:</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Periodic latency spikes affecting user experience</li>
                <li>High query response times impacting sales</li>
                <li>Teams working in silos with incomplete data</li>
                <li>Revenue lost per minute of downtime</li>
                <li>Brand reputation at stake with every delay</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How SigNoz Transforms */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <h2 className="text-3xl font-bold mb-8">How SigNoz transforms this chaos into clarity:</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Platform Response:</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Automatic correlation of service dependencies</li>
              <li>Instant identification of failure points</li>
              <li>Clear visualization of cascading impacts</li>
              <li>All through one unified dashboard</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Development Team Benefits:</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Immediate root cause visibility</li>
              <li>Direct correlation with code deployments</li>
              <li>Comprehensive performance context</li>
              <li>Single-pane investigation workflow</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12">Best Practices for Unified Observability</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">1. Implement the THREE PILLARS of Observability</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-3 text-blue-400">Metrics</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Monitor system-level indicators</li>
                  <li>Track business KPIs</li>
                  <li>Set up proactive alerts</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 text-blue-400">Traces</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Track request flows across services</li>
                  <li>Identify performance bottlenecks</li>
                  <li>Debug distributed transactions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 text-blue-400">Logs</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Capture detailed system events</li>
                  <li>Debug application issues</li>
                  <li>Maintain audit trails</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">2. Follow Observability-Driven Development</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Selecting the right tools and integrations for the environment</li>
              <li>Design with observability in mind from the start</li>
              <li>Instrument code properly using OpenTelemetry</li>
              <li>Create meaningful custom metrics and spans</li>
              <li>Establish clear logging practices</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">3. Establish Clear Processes</h3>
            <ul className="list-disc list-inside space-y-3 text-gray-300">
              <li>Define service level objectives (SLOs)</li>
              <li>Create runbooks for common scenarios</li>
              <li>Implement alert thresholds thoughtfully</li>
              <li>Regular review and optimization of observability practices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <h2 className="text-3xl font-bold mb-8">Role of AI in Unified Observability</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6 text-gray-300">
            <p className="text-xl">
              AI and machine learning have changed the field of observability by automating the detection and resolution of issues within complex systems. These technologies help streamline monitoring processes and provide deeper insights into system performance.
            </p>
            <h3 className="text-2xl font-bold">Several key areas illustrate their impact:</h3>
            <ul className="list-disc list-inside space-y-3">
              <li>Automated Pattern Recognition and Anomaly Detection</li>
              <li>Predictive Analytics for Proactive Issue Prevention</li>
              <li>Intelligent Alert Correlation and Noise Reduction</li>
              <li>Continuous Learning and Improvement of Observability Insights</li>
            </ul>
            <p className="text-xl">
              SigNoz offers the <Link href="https://signoz.io/blog/introducing-anomaly-detection-for-smarter-alerts/" className="text-blue-400 hover:text-blue-300">Anomaly Detection feature</Link>. It enables users to create smarter alerts based on dynamic metrics, moving beyond traditional fixed-threshold alerts.
            </p>
          </div>
          <div>
            <Image
              src="/img/unified-observability/anomaly-detection.png"
              alt="Anomaly Detection in SigNoz"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
            />
            <p className="text-center mt-4 text-gray-400">Anomaly Detection Alert in SigNoz</p>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Get started with Unified Observability</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">1. Quick SetUp</h3>
              <GetStartedSigNoz />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">2. Instrument Your Application</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Choose your <Link href="https://signoz.io/docs/instrumentation/" className="text-blue-400 hover:text-blue-300">programming language</Link></li>
                <li>Install OpenTelemetry SDK</li>
                <li>Configure your application</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">3. Start Monitoring</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Access the SigNoz UI</li>
                <li>Import pre-built dashboards</li>
                <li>Set up initial alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <h2 className="text-3xl font-bold mb-8 text-center">Resources to Help You Succeed</h2>
        <div className="flex justify-center space-x-8">
          <Link 
            href="https://signoz.io/docs/"
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            <span className="mr-2">📚</span> Documentation
          </Link>
          <Link 
            href="https://github.com/SigNoz/signoz"
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            <span className="mr-2">⭐</span> GitHub Repository
          </Link>
        </div>
        <div className="text-center mt-12">
          <p className="text-xl mb-6">
            Take the first step toward comprehensive observability by signing up for a free trial of SigNoz today.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
            href="/signup"
          >
            Get Started - Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default UnifiedObservability;
