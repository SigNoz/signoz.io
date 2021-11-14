---
title: Challenges while starting out with OpenTelemetry
slug: opentelemetry-challenges
date: 2021-11-14
tags: [opentelemetry]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: OpenTelemetry is a huge project driven by a large community of developers. It can get overwhelming when starting out, so here are a few challenges...
image: /img/blog/2021/11/otel_challenges.webp
keywords:
 - observability
 - cloud-native
 - stats
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/why-observability-is-critical-for-cloud-native-applications/"/>
</head>

Instrumentation is a challenging task in the world of microservices and polyglot application architecture. OpenTelemetry is the leading open-source standard that aims to solve the instrumentation challenge in a vendor-agnostic manner.

<!--truncate-->

![Cover Image](/img/blog/2021/11/otel_challenges.webp)

It is currently a CNCF incubating project and has a huge expanding community of developers behind it. The community is focused on creating instrumentation libraries and SDKs for popular programming languages like C++, Java, Python, Go, etc. ([Full list](https://opentelemetry.io/docs/))

As an evolving project with so many specifications, it is sometimes challenging for users to get started with OpenTelemetry. At SigNoz, we are building an observability stack that natively uses OpenTelemetry for generating telemetry data. As such, we often have queries from our users in our slack community, asking for help around OpenTelemetry.

In this article, we have made a list of some of the common challenges/questions faced when starting out with OpenTelemetry. We will keep adding to the list!

### Status of OpenTelemetry APIs in various programming languages

OpenTelemetry specification is the guide for all cross-language requirements and expectations of all components and language implementations. Following is the status of different APIs and SDKs under OpenTelemetry specification:

**OpenTelemetry Specification**
[Tracing](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace)
Tracing API: Stable, Feature Freeze
Tracing SDK: Stable

[Metrics](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/metrics)
Metrics API: Stable
Metrics SDK: Feature Freeze

[Logging](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/logs)
Log Data Model: Experimental

Following is the list of latest releases in language specific implementation. Note version >1.0.0 denotes a stable release.

Java - [Version 1.9.0](https://github.com/open-telemetry/opentelemetry-java/releases/tag/v1.9.0)
Javascript - [SDK v1.0.0](https://github.com/open-telemetry/opentelemetry-js/releases/tag/stable/v1.0.0)
Go - [v1.2.0/v0.25.0](https://github.com/open-telemetry/opentelemetry-go/releases/tag/v1.2.0)
.NET - [1.1.0 core packages](https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.1.0)
Python - [v1.7.1 & v0.26b1](https://github.com/open-telemetry/opentelemetry-python/releases/tag/v1.7.1)
PHP - [0.0.3 Release](https://github.com/open-telemetry/opentelemetry-php/releases/tag/0.0.3)
Ruby - [opentelemetry-propagator-ottrace 0.19.3](https://github.com/open-telemetry/opentelemetry-ruby/releases/tag/opentelemetry-propagator-ottrace/v0.19.3)
Erlang - [OpenTelemetry API v0.3.2](https://github.com/open-telemetry/opentelemetry-erlang-api/releases/tag/v0.3.2)

[https://opentelemetry.io/status/](https://opentelemetry.io/status/)

### Correctly upgrading OpenTelemetry packages in production

OpenTelemetry follows the [semantic versioning](https://semver.org/) convention for numbering its release versions. The version number follows the following template:
Major:Minor: Patch 

- Major - increment when you make incompatible API changes
- Minor - increment when you add functionality in a backward-compatible manner
- Patch - increment when you make backward-compatible bug fixes

Need an example of list of things to check

[Sample user query](https://stackoverflow.com/questions/68492512/how-to-import-and-use-metrics-in-python-in-the-new-versions-of-opentelemetry-pac)

### Understanding terminologies when getting started

OpenTelemetry is a huge project. It's easy to get overwhelmed when starting out with a lot of terminologies and specifications. Here's a starter pack for common OpenTelemetry terminologies:

- OTel: OpenTelemetry
- OTLP: OpenTelemetry Protocol
- Attributes: Used to denote name/value pairs attached to spans
- Instrumentation: the process of enabling your application code to generate telemetry data
- Data Source: Can be either traces, metrics, or logs
- Trace: Made up of one or more spans grouped together to represent a transaction
- Metrics: A data point about a service captured as a timeseries
- Spans: A single logical operation within a trace
- Context: Identifiers to connect transactions across services
- Collector: An agent or gateway to receive, process, and export telemetry data
- Receiver: Component in OpenTelemetry Collector which defines how telemetry data is received
- Processor: Component in OpenTelemetry Collector used for performing operations on data after otel_collector receives it and before the data gets exported
- Exporter: Component in otel_collector which defines the format data should be exported to chosen backends
- Propagators:  Used to pass context(info about current span, trace) often via HTTP headers
- Tracer: Used for creating spans

[frustration using OpenTelemetry](https://www.reddit.com/r/devops/comments/nxrbqa/opentelemetry_is_great_but_why_is_it_so_bloody/)

### Configuring opentelemetry-collector for collecting Prometheus metrics

Prometheus is one of the most popular open-source metric monitoring application. OpenTelemetry collector supports collecting Prometheus metrics. You will need to update Prometheus scrape configs in your otel_collector. Here's a sample code taken from SigNoz

[Sample user query](https://stackoverflow.com/questions/65312795/opentelemetry-collector-export-to-prometheus-is-not-working)

```jsx
# Data sources: metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: "otel-collector"
          scrape_interval: 60s
          static_configs:
            - targets: ["otel-collector:8889"]
```

### Instrumenting a framework that is not auto-instrumented with OpenTelemetry

### Deploying OpenTelemetry Collectors

[Sample user query](https://stackoverflow.com/questions/66969097/opentelemetry-collector-scaling)

<!-- ![otel_collector_implementation.png](10%20challenges%20when%20starting%20out%20with%20OpenTelemetry%208d5b0cf0ba4c457f8845ed4c1bef3c0b/otel_collector_implementation.png)

![otel_collector_implementation_2.png](10%20challenges%20when%20starting%20out%20with%20OpenTelemetry%208d5b0cf0ba4c457f8845ed4c1bef3c0b/otel_collector_implementation_2.png) -->

### Documentation is still catching up.

OpenTelemetry as a project is evolving rapidly, and as such the documentation is mostly catching up with implementation. So sometimes, it gets difficult for users to figure out specifics of their implementation. But this is true for any large scale community-driven project, and you can expect documentation to get more detailed as APIs get more stable.

You can always reach out for help on our slack community or opentelemetry slack community. 

<!-- ![Screenshot 2021-11-13 at 4.11.57 PM.png](10%20challenges%20when%20starting%20out%20with%20OpenTelemetry%208d5b0cf0ba4c457f8845ed4c1bef3c0b/Screenshot_2021-11-13_at_4.11.57_PM.png) -->

### Choosing a backend for OpenTelemetry

[https://www.honeycomb.io/blog/so-you-want-to-build-an-observability-tool/](https://www.honeycomb.io/blog/so-you-want-to-build-an-observability-tool/)

[Sample user query](https://stackoverflow.com/questions/68134668/how-to-choose-an-opentelemetry-backend-vendor)