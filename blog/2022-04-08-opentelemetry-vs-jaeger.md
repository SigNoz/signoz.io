---
title: OpenTelemetry and Jaeger | Key concepts, features, and differences
slug: opentelemetry-vs-jaeger
date: 2022-04-08
tags: [Tools Comparison, Jaeger]
authors: ankit_anand
description: Both OpenTelemetry and Jaeger enable application owners to set up monitoring and observability to measure application performance. But their solutions are meant to address different problems...
image: /img/blog/2022/03/opentelemetry_vs_jaeger.webp
keywords:
  - opentelemetry
  - jaeger
  - distributed tracing
  - observability
  - monitoring
  - apm tools
  - application performance monitoring
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-vs-jaeger/"/>
</head>

OpenTelemetry and Jaeger are both open-source projects under Cloud Native Computing Foundation. In this article, let us understand the key concepts involved in both projects, their features, and their differences.

<!--truncate-->

![Cover Image](/img/blog/2022/03/opentelemetry_vs_jaeger.webp)

OpenTelemetry is a vendor-agnostic instrumentation library. It provides a set of tools, APIs, and SDKs to create and manage telemetry data(logs, metrics, and traces).

Jaeger is an open-source tool focused on distributed tracing of requests in a microservice architecture.

Both OpenTelemetry and Jaeger enable application owners to set up monitoring and observability to measure application performance. But their solutions are meant for different problems. While OpenTelemetry helps generate telemetry data, Jaeger is a distributed tracing tool.

> **What is Observability?**<br></br>
In control theory, the term “observability” states that a system is observable if the internal states of the system can be determined by looking at its inputs and outputs.
For distributed software systems, observability means how well we are able to troubleshoot our systems for performance issues with collected data from the system.
> 

## What is OpenTelemetry?

OpenTelemetry is an open-source project under the Cloud Native Computing Foundation (<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >CNCF</a>) that aims to standardize the generation and collection of telemetry data. Telemetry data includes logs, metrics, and traces.

It is a collection of APIs, SDKs, and client libraries that is used to generate telemetry data from your application code. The data you collect with OpenTelemetry is vendor-agnostic and can be exported in many formats.

The biggest advantage of using OpenTelemetry is that you have the freedom to choose a backend of your choice. You don’t get locked into a vendor, and engineering teams can get ramped up on a single technology to generate telemetry data.

To integrate OpenTelemetry with your application code, you can use the OpenTelemetry client libraries of the required programming language. OpenTelemetry also provides a collector known as OTel (OpenTelemetry) collector that can be used to process and export telemetry data in multiple formats.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="OpenTelemetry Architecture"
    height={500}
    src="/img/blog/2022/03/opentelemetry_architecture_new.webp"
    title="The architecture of OpenTelemetry. You can integrate OTel libraries with your application code"
    width={700}
/>

## What is Jaeger?

Jaeger is a popular open-source distributed tracing tool that was originally built by teams at Uber and then open-sourced. It is used to monitor and troubleshoot applications based on microservices architecture.

A distributed tracing tool tracks user requests across services and gives a central overview of how different components of a microservices architecture interact to process user requests. Jaeger is used to store, analyze and visualize tracing data.

Jaeger does not support logs and metrics.

It provides instrumentation libraries that were built on OpenTracing standards. The libraries cover popular programming languages like Go, Java, Node, Python, C++, and C#. For storing trace data, it supports two storage backends:

- Cassandra
- Elasticsearch

Jaeger provides a minimal UI to analyze the trace data captured.

<Screenshot
    alt="Jaeger UI"
    height={500}
    src="/img/blog/2022/03/jaeger_ui.webp"
    title="Jaeger UI showing traces for selected services"
    width={700}
/>

## Comparing OpenTelemetry and Jaeger

While both OpenTelemetry and Jaeger are tools that enable setting up observability for modern-day cloud-native applications, they are meant to solve different problems.

There are two major steps involved in setting up observability for your application:

- Collecting relevant data that indicates the application health
- Storing, managing, and visualizing the collected data to take quick actions

OpenTelemetry addresses the first step, while Jaeger is meant to address the latter. In the domain of observability, a tool like Jaeger is called an observability backend, while OpenTelemetry provides instrumentation. Instrumentation is the process of enabling your application code to generate telemetry data.

You can use OpenTelemetry as your instrumentation layer and Jaeger for storing and visualizing trace data.

The key differences between OpenTelemetry and Jaeger can be summarized in the following points:

- OpenTelemetry provides an instrumentation layer for your application code, while Jaeger is a backend analysis tool used for storage and visualization of trace data.
- Using OpenTelemetry libraries, you can generate logs, metrics, and traces. Jaeger does not support logs and metrics.
- OpenTelemetry can only be used to generate and collect data. It does not provide a storage layer. Jaeger provides Cassandra and Elasticsearch as two options for storing data.
- OpenTelemetry does not provide any web UI components. Jaeger comes with a web UI component that is used for visualizing trace data.

## Key Features of OpenTelemetry and Jaeger

Both OpenTelemetry and Jaeger aim to improve the observability of cloud-native applications by targeting different levels of the observability stack.

The main features of OpenTelemetry as an instrumentation layer include:

- A single consistent instrumentation layer covering multiple programming languages and technologies
- Generation and collection of telemetry data that includes logs, metrics, and traces
- Supports exporting telemetry data in multiple data formats to a backend of choice
- Cross-language capabilities with the ability to produce telemetry data in consistent formats across all major programming languages

While OpenTelemetry gives you access to raw data needed to analyze application health, Jaeger provides the analysis and storage layer to the end-user, i.e., the application owner.

The main features of Jaeger as a distributed tracing tool include:

- Distributed transaction monitoring with traces
- Performance and latency optimization
- Root cause analysis
- Service dependency analysis
- Distributed context propagation

## A better alternative to Jaeger

OpenTelemetry is the future of instrumentation for cloud-native applications. It is backed by a huge community of developers, observability vendors, and cloud vendors. Modern-day distributed software systems are complex to operate and troubleshoot.

Instrumenting every aspect of your application and infrastructure is the first critical step to keeping a check on application performance. OpenTelemetry can take care of the entire instrumentation layer as it supports multiple programming languages and technologies.

The next step is about choosing a backend analysis tool. Jaeger supports data formats of OpenTelemetry. But Jaeger is limited in terms of its UI and does only distributed tracing. For a robust monitoring and observability framework, you need a unified UI for both metrics and traces. And that's where [SigNoz](https://signoz.io/) is far [more suited](https://signoz.io/blog/jaeger-vs-signoz/) than Jaeger as a distributed tracing tool.

SigNoz is a full-stack open-source application performance monitoring and observability tool which can be used in place of Jaeger. SigNoz is built to support OpenTelemetry natively. It also provides a fast OLAP database - ClickHouse as the storage backend.

It comes with out-of-box application metrics charts.

<Screenshot
    alt="Application metrics charts in SigNoz dashboard"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    title="Application metrics charts in SigNoz dashboard"
    width={700}
/>

You can analyze tracing data with powerful filters. You can also analyze service level performance with aggregated trace metrics, like the p99 latency of a specific service.

<Screenshot
    alt="Filters for tracing data with capabilities for aggregated trace metrics"
    height={500}
    src="/img/blog/common/signoz_list_of_traces_hc.webp"
    title="Filters for tracing data with capabilities for aggregated trace metrics"
    width={700}
/>

SigNoz also provides a rich visualization of tracing data with the help of Flamegraphs and Gantt charts. You can see exactly how a single event performed as part of an entire user request.

<Screenshot
    alt="Flamegraphs and Gantt charts in SigNoz dashbaord"
    height={500}
    src="/img/blog/common/signoz_flamegraphs.webp"
    title="Flamegraphs and Gantt charts in SigNoz dashbaord"
    width={700}
/>

Check out SigNoz GitHub repo:

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

## Frequently asked questions

**Does Jaeger use OpenTelemetry?**

Jaeger is based on OpenTracing APIs for instrumentation. But, OpenTracing is now archived, and it is suggested to migrate to OpenTelemetry if your project is using OpenTracing. Jaeger’s <a href = "https://www.jaegertracing.io/docs/1.21/opentelemetry/" rel="noopener noreferrer nofollow" target="_blank" >website</a> mentions that future Jaeger backend components will be based on OpenTelemetry Collector.

**Should I use OpenTracing or OpenTelemetry?**

OpenTracing is now <a href = "https://opentracing.io/" rel="noopener noreferrer nofollow" target="_blank" >archived</a>, and it is suggested to migrate to OpenTelemetry.

---

## Further Reading

**[Jaeger vs SigNoz](https://signoz.io/blog/jaeger-vs-signoz/)**

**[OpenTelemetry Collector - architecture and configuration guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)**
