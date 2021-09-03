---
title: OpenTelemetry tracing - 10 things you need to know before implementing
slug: opentelemetry-tracing
date: 2021-09-03
tags: [opentelemetry, distributed-tracing]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: OpenTelemetry and Prometheus are both open-source projects under Cloud Native Computing Foundation. One is used for managing telemetry data and the other is a metrics monitoring tool..
image: /img/blog/2021/09/opentelemetry_tracing-min.jpg
keywords:
  - opentelemetry
  - tracing
  - distributed tracing
  - telemetry data
  - traces
---

Setting up observability and robust monitoring for distributed systems is a challenging task. Engineering teams need access to different pieces of information to understand what's happening with their application. Is OpenTelemetry a step in the right direction for microservices observability? Let's find out.

<!--truncate-->

![Cover Image](/img/blog/2021/09/opentelemetry_tracing-min.jpg)

Nothing can guarantee how your systems will behave in production. Things will go wrong, and it's critical to monitor your application for any signs that need troubleshooting. The most common pieces of information that engineering teams look for are logs and metrics. But they fail to correlate a single user request across services. It's often a lot of manual effort to correlate this information to identify the root cause of issues in your application. Distributed tracing promises to solve this problem. When combined with logs and metrics, distributed tracing gives you a centralized view of your application in action.

OpenTelemetry aims to standardize the creation and management of telemetry data - logs, metrics, and traces. It can fit within any application's architecture and generate telemetry data with little to no overhead.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="OpenTelemetry Architecture"
    height={500}
    src="/img/blog/2021/08/opentelemetry_architecture-min.png"
    title="OpenTelemetry architecture - client libraries instrument application code to send telemetry data to a collector agent which then exports the data to a backend analysis tool."
    width={700}
/>

## Why is distributed tracing needed?
Microservices architecture enables teams to have ownership of standalone applications and services that then communicate with each other to serve the user's needs. When something goes wrong with a user request, it is necessary to identify its root cause. But in a distributed system, one service can break due to things happening in another service. And when engineering pods are responsible for just one service, it becomes a nightmare to troubleshoot issues without an overview.

That's where distributed tracing comes into the picture. User requests are broken down into spans. Spans represent work done by a single service which can be broken down further depending on the use case. A trace context is passed along when requests travel between services, which tracks a user request across services. You can see how a user request performs across services and identify what exactly needs your attention without manually shifting through multiple dashboards.

<Screenshot
    alt="Trace context helps track a user request across services"
    height={500}
    src="/img/blog/2021/09/opentelemetry_distributed_tracing-min.png"
    title="A trace context is passed when user requests passes from one service to another"
    width={700}
/>

Using OpenTelemetry you can encapsulate several pieces of information with a span. Common information includes the name of the operation, start and end timestamp, events occurring during the span. You can also add custom attributes with key/value pairs to enable more insights if needed.

In the picture below, you can see the details for the selected span highlighted. [SigNoz](https://signoz.io/) is a lightweight open-source APM tool based on OpenTelemetry, which can be used as an analysis tool.

<Screenshot
    alt="SigNoz UI showing details of a selected span"
    height={500}
    src="/img/blog/2021/09/details_span-min.png"
    title="SigNoz is a lightweight APM tool based on OpenTelemetry. It provides out of box visualization for traces and metrics."
    width={700}
/>

When the user request finishes operation in one of the services and travels to another one, a trace ID is passed along, unique for every request. This way, you can correlate information about your requests easily across your entire architecture.

## What is OpenTelemetry?
OpenTelemetry is a set of API, SDKs, libraries, and integrations that is aiming to standardize the generation, collection, and management of telemetry data(logs, metrics, and traces). OpenTelemetry is a Cloud Native Computing Foundation project created after the merger of OpenCensus(from Google) and OpenTracing(from Uber).

The data you collect with OpenTelemetry is vendor-agnostic and can be exported in many formats. Telemetry data has become critical to observe the state of distributed systems. With microservices and polyglot architectures, there was a need to have a global standard. OpenTelemetry aims to fill that space and is doing a great job at it thus far.

OpenTelemetry does not provide a backend analysis tool. Instead, the data collected with OpenTelemetry can be sent to SigNoz - a full-stack open-source APM tool natively built to work with OpenTelemetry. It provides actionable charts and visualization for your metrics and traces right out of the box.

[![SigNoz repo](/img/blog/common/signoz_github.png)](https://github.com/signoz/signoz)

## 10 things to know about OpenTelemetry Tracing
Now that you understand a little bit about both OpenTelemetry and distributed tracing, let us see a list of things you must know about OpenTelemetry tracing:

1. OpenTelemetry is an open-source project under Cloud Native Computing Foundation backed by major cloud providers and technology giants. As such, it has wide community support as well as support by most APM and observability vendors. In the long run, having OpenTelemetry for code instrumentation can be a good bet for companies of any size.

2. OpenTelemetry reduces overhead from your application to create and manage telemetry data. Your application is decoupled from OpenTelemetry implementation as OpenTelemetry provides an API to interact with. Traces are generated using otel-libraries which are programming language-specific. Once the trace data is generated, it is sent to otel-collectors. Otel-collector can be deployed in your hosts as agents or can be deployed as a standalone service. This architecture is very lightweight in terms of managing telemetry data like traces.

3. OpenTelemetry announced its tracing API to be stable on Feb 21. OpenTelemetry aims to be a single solution for generating logs, metrics, and traces in all programming languages starting with distributed tracing. It has a stable tracing API release in Java, .NET, Javascript, Python, and Erlang.

4. One of the major advantages of using OpenTelemetry is that it provides you the flexibility to switch backend analysis tools if needed or even use multiple backend analyses. OpenTelemetry provides an otel-collector that can be used to receive trace data in multiple formats. Otel-collector also provides processors and exporters using which you can choose to export the collected data in your required format.

5. OpenTelemetry tracing API consists of three main classes:
   - `Traceprovider` is the entry point of the API. It provides access to Tracers.
   - `Tracer` is the class responsible for creating Spans.
   - `Span` is the API to trace an operation.

6. An OpenTelemetry trace contains a single root span that covers the end-to-end latency for an entire request which involves a logical operation — for example, clicking a button on a web application to make payment.

7. With the root span, OpenTelemetry tracing would measure the time it took to either complete the request or the time it took for the request to fail.

8. The `tracer` interface of OpenTelemetry API is responsible for creating and managing active spans. A trace is a collection of spans with one root span representing a logical operation.

9. Adding attributes to spans can give you rich context about operations in each service. But you should be careful about adding attributes. Anything added to spans can have a compounding effect when requests travel across services and when the user requests scale.

10. OpenTelemetry libraries come with default support for tracing. You need to configure your otel-collector to collect traces data in the format you prefer. The default format is called OTLP, but you can also import trace data in formats like Jaeger. SigNoz supports OTLP formats for receiving trace data as it works natively with OpenTelemetry.

## How to get started with OpenTelemetry tracing?
OpenTelemetry is becoming the world standard for instrumenting application code due to its multi-language support and ease of use. But OpenTelemetry helps only to generate and collect telemetry data. You need to export the telemetry data to a backend analysis tool so that your teams can store, query, and visualize the collected data.

And that's where [SigNoz](https://signoz.io/) comes into the picture. SigNoz uses OpenTelemetry natively to instrument application codes. OpenTelemetry collector then sends the data to the SigNoz backend, where users have the option to choose between ClickHouse or Kafka+Druid as a storage option.

SigNoz comes with out of box visualization of things like RED metrics. There is a unified UI of metrics and traces, unlike Prometheus, so that you can easily identify the root cause of issues causing things like latency in your apps.

<Screenshot
    alt="SigNoz UI"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.png"
    title="SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate"
    width={700}
/>

You can check out SigNoz's GitHub repo here 👇
[![SigNoz repo](/img/blog/common/signoz_github.png)](https://github.com/signoz/signoz)
