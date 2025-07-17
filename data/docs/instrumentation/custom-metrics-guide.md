---
title: Getting Started with Custom Metrics in SigNoz
slug: /docs/custom-metrics-guide
tags: [metrics, instrumentation, getting-started]
---

# Getting Started with Custom Metrics in SigNoz

This guide will help you understand how to send custom metrics to SigNoz from your applications.

## Overview

Custom metrics allow you to track business-specific KPIs and application performance indicators that are unique to your use case.

## Prerequisites

- SigNoz instance up and running
- Application instrumented with OpenTelemetry
- Basic understanding of metrics types (Counter, Gauge, Histogram)

## Step 1: Choose Your Metric Type

### Counter
Use for values that only increase (e.g., total requests, errors)

### Gauge  
Use for values that can go up and down (e.g., active users, queue size)

### Histogram
Use for measuring distributions (e.g., request latency, response sizes)

## Step 2: Implement Custom Metrics

### Example in Python

```python
from opentelemetry import metrics
from opentelemetry.sdk.metrics import MeterProvider

# Set up the meter provider
metrics.set_meter_provider(MeterProvider())
meter = metrics.get_meter(__name__)

# Create a counter
request_counter = meter.create_counter(
    name="custom_app_requests",
    description="Total number of requests",
    unit="1"
)

# Record a value
request_counter.add(1, {"endpoint": "/api/users", "method": "GET"})
```

## Step 3: Visualize in SigNoz

1. Navigate to the Metrics section in SigNoz
2. Search for your custom metric name
3. Create dashboards and alerts based on your metrics

## Best Practices

- Use descriptive metric names
- Add relevant labels/attributes
- Keep cardinality in check
- Document your metrics

## Next Steps

- Learn about [Creating Dashboards](/docs/dashboards)
- Set up [Alerts](/docs/alerts) for your metrics
- Explore [Advanced Querying](/docs/query-builder)
