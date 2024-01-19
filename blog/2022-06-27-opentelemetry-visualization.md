---
title: Getting started with OpenTelemetry visualization
slug: opentelemetry-visualization
date: 2023-09-14
tags: [OpenTelemetry, SigNoz]
authors: [ankit_anand]
description: OpenTelemetry provides language-specific client libraries to instrument application code for generating telemetry data. You can then use a backend analysis tool to visualize the collected OpenTelemetry data. In this article, we will see what types of OpenTelemetry visualizations are possible and how to use a backend analysis tool for OpenTelemetry visualization...
image: /img/blog/2023/03/opentelemetry_visualization_cover-min.jpg
keywords:
  - opentelemetry
  - opentelemetry visualization
  - opentelemetry specification
  - open source
  - logs
  - metrics
  - traces
  - signoz
  - apm tools
  - application performance monitoring
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-visualization/"/>
  <title>Getting started with OpenTelemetry visualization</title>
</head>

import SignUps from '../docs/shared/sign-ups.md'
import GetStartedSigNoz from '../docs/shared/get-started-signoz.md';


OpenTelemetry is a Cloud Native Computing Foundation(<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) project aimed at standardizing the way we instrument applications for generating telemetry data(logs, metrics, and traces). However, OpenTelemetry does not provide storage and visualization for the collected telemetry data. For OpenTelemetry visualization, you need to use a backend that can ingest the collected data and provide a web UI to visualize it.

<!--truncate-->

![Cover Image](/img/blog/2023/03/opentelemetry_visualization_cover.webp)

OpenTelemetry is quietly becoming the web standard for instrumenting cloud-native applications. For applications based on distributed systems, OpenTelemetry becomes a natural choice for instrumentation. Few reasons why OpenTelemetry is the preferred choice for generating telemetry data:

- Lightweight<br></br>
OpenTelemetry APIs are lightweight and are completely decoupled from any implementation. By default, OpenTelemetry APIs are no-op implementation.

- Diverse<br></br>
OpenTelemetry provides instrumentation in almost all the major programming languages. It also covers instrumentation for a large number of open source libraries and frameworks.

- Community<br></br>
OpenTelemetry is backed by a huge community and is incubating under CNCF. It is also backed by major cloud vendors. The huge community support makes it a safe choice for future-proofing your instrumentation layer.

<SignUps />

But once the telemetry data is collected with OpenTelemetry, it needs to be stored and visualized for end-user consumption. A good visualization of telemetry data collected by OpenTelemetry can lead to quicker insights to debug performance issues.

## What is OpenTelemetry?

OpenTelemetry is an open-source collection of tools, APIs, and SDKs that aims to standardize the way we generate and collect telemetry data. It follows a specification-driven development. The <a href = "https://github.com/open-telemetry/opentelemetry-specification" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry specification</a> has design and implementation guidelines for how the instrumentation libraries should be implemented. In addition, it provides client libraries in all the major programming languages which follow the specification.

OpenTelemetry was formed after the merger of two open-source projects - OpenCensus and OpenTracing in 2019. Since then, it has been the go-to open-source standard for instrumenting cloud-native applications.

The specification is designed into distinct types of telemetry known as signals. Presently, OpenTelemetry has specifications for these three signals:

- Logs
- Metrics and
- Traces

Together these three signals form the three pillars of observability. OpenTelemetry is the bedrock for setting up an observability framework. The application code is instrumented using OpenTelemetry client libraries, which enables the generation of telemetry data. Once the telemetry data is generated and collected, OpenTelemetry needs a backend analysis tool to which it can send the data for storage and visualization.

OpenTelemetry can send to multiple backends. You can use different backends for each signal in OpenTelemetry. But managing different tools is not recommended. Engineering teams also need to correlate all signals for effective analysis. And that’s where SigNoz comes into the picture.

## SigNoz - an open source APM built natively for OpenTelemetry

[SigNoz](https://signoz.io/) is a full-stack open source APM built natively to support OpenTelemetry. It supports OpenTelemetry semantic conventions and provides visualization for all three distinct types of signals(log management is under active development) supported by OpenTelemetry.

It also provides advanced OpenTelemetry visualizations of trace aggregates which can be analyzed with a powerful set of filters.

It is easy to get started with SigNoz. It can be installed on macOS or Linux computers in just three steps by using a simple installation script.

The install script automatically installs Docker Engine on Linux. However, you must manually install [Docker Engine](https://docs.docker.com/engine/install/) on macOS before running the install script.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

Once your application is instrumented with OpenTelemetry client libraries, the data can be sent to the SigNoz backend by specifying a specific port on the machine where SigNoz is installed.

You can then use Signoz to monitor application metrics with out-of-box charts and visualization.

## Visualizing OpenTelemetry data with SigNoz

A sample application comes bundled with SigNoz to explore the dashboard capabilities. Let us see what kind of visualizations are possible with OpenTelemetry data.

**Application Metrics**

SigNoz comes with out-of-box charts for the popular RED(requests, error, and duration) metrics. 

<figure data-zoomable>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz dashboard showing popular RED metrics"/>
    <figcaption><i>An OpenTelemetry backend built natively for OpenTelemetry, SigNoz provides out-of-box charts for application metrics</i></figcaption>
</figure>

<br></br>

**Distributed tracing with Flamegraphs and Gantt Charts**

The tracing data captured with OpenTelemetry can be visualized with the help of Flamegraphs and Gantt charts. This view gives you a complete breakdown of a single user request as it travels across services and protocols.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Detailed Flamegraphs & Gantt charts"/>
    <figcaption><i>Tracing data collected by OpenTelemetry can be visualized with the help of Flamegraphs and Gantt charts on the SigNoz dashboard</i></figcaption>
</figure>

<br></br>

**Trace aggregates**

Using SigNoz dashboards, you can run and visualize aggregated trace data collected with OpenTelemetry. Create trace aggregates visualizations helps you create service-centric views. For example, you can see the P99 latency of all your services to pinpoint the one causing performance issues.

You can also analyze the trace data using a set of powerful filters like `status`, `operation`, `HTTP codes`, etc. SigNoz uses OpenTelemetry semantic conventions to visualize this data.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/trace_filter_apply_aggregates.webp" alt="Trace aggregates on SigNoz dashboard"/>
    <figcaption><i>Visualize  and analyze trace aggregates with SigNoz</i></figcaption>
</figure>

<br></br>

**Custom Dashboards**

OpenTelemetry provides [receivers](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver) for receiving metrics from metrics exporters of a lot of common technologies. For example, there are receivers for Redis, AWS container insights, Docker stats, etc. Using these receivers, you can build custom dashboards with SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/06/k8s_node_monitoring.webp" alt="Node metrics monitoring with SigNoz"/>
    <figcaption><i>Using OpenTelemetry receivers, you can create custom dashboards with SigNoz. For example, this is a custom dashboard for Kubernetes host metrics monitoring</i></figcaption>
</figure>



## Getting started with OpenTelemetry visualization

To start with OpenTelemetry visualization, you first need to instrument your application code with OpenTelemetry client libraries. Opentelemetry also provides auto-instrumentation agents for some programming languages like Java. With auto-instrumentation, you can start to monitor your application with minimal code changes.

Below are the steps required to start with OpenTelemetry visualization:

- Instrument application code with language-specific OpenTelemetry libraries
- Configure OpenTelemetry Exporters to send data to SigNoz
- Visualize and analyze telemetry data using SigNoz dashboards

OpenTelemetry has language-specific instrumentation steps. You can explore our blog for specific instructions for different programming languages:

- [Java](https://signoz.io/blog/opentelemetry-spring-boot/)
- [Python](https://signoz.io/blog/opentelemetry-django/)
- [Nodejs](https://signoz.io/opentelemetry/nodejs/)
- [PHP](https://signoz.io/blog/opentelemetry-php/)
- [Ruby](https://signoz.io/blog/opentelemetry-ruby/)
- [Rust](https://signoz.io/blog/opentelemetry-rust/)
- [Elixir](https://signoz.io/blog/opentelemetry-elixir/)
- [.NET](https://signoz.io/blog/opentelemetry-dotnet/)

<GetStartedSigNoz />

---

## Further Reading

[SigNoz - an open-source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)

[OpenTelemetry Collector - a complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)
