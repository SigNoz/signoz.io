# Trace Funnels Documentation

This directory contains the documentation for the Trace Funnels feature in SigNoz.

## Files

- `overview.mdx` - Comprehensive overview of the Trace Funnels feature, including use cases, how it works, and feature walkthrough
- `setup.mdx` - Setup and prerequisites for using Trace Funnels

## Navigation

The Trace Funnels documentation is accessible through:

1. **Main Navigation**: Under the "Trace Funnels" category in the sidebar
2. **Tutorials**: Listed under "APM & Distributed Tracing" > "Tutorials"

## Images

Placeholder images have been created in `/public/img/docs/trace-funnels/` for:

- `landing-page.gif` - Trace Funnels landing page
- `create-funnel.gif` - Creating a new funnel
- `define-steps.gif` - Defining funnel steps
- `step-conversion.gif` - Step-by-step conversion analysis
- `transition-analysis.gif` - Transition analysis between steps
- `performance-metrics.gif` - Performance metrics over time
- `add-from-trace.gif` - Adding spans from trace explorer
- `verification.webp` - Verification process
- `access-funnels.webp` - Accessing Trace Funnels

These placeholder files should be replaced with actual screenshots when the feature is implemented.

## Feature Description

Trace Funnels helps users measure and analyze the step-by-step progression of requests (spans) through their distributed system. By defining up to three sequential spans within the same trace, users can:

- Quantify conversion rates between critical operations
- Identify performance bottlenecks and error hotspots at each transition
- Drill into individual traces that experience the slowest transitions or failures

The documentation follows the same structure and style as other SigNoz features like External API Monitoring. 