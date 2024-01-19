---
title: OpenTelemetry Tracing - Things you need to know before implementing
slug: opentelemetry-tracing
date: 2022-12-08
tags: [OpenTelemetry, Distributed Tracing]
authors: ankit_anand
description: Thinking about using OpenTelemetry for distributed tracing? OpenTelemetry Tracing API provides options for manual as well as automated instrumentation..
image: /img/blog/2021/09/opentelemetry_tracing-min.webp
keywords:
  - opentelemetry
  - distributed tracing
  - opentelemetry tracing
  - traces
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-tracing/"/>
</head>

Setting up observability and robust monitoring for distributed systems is a challenging task. Engineering teams need access to different pieces of information to understand what's happening with their application. Is OpenTelemetry a step in the right direction for distributed tracing? Let's find out.

<!--truncate-->

![Cover Image](/img/blog/2021/09/opentelemetry_tracing-min.webp)


Nothing can guarantee how your systems will behave in production. Things will go wrong, and it's critical to monitor your application for any signs that need troubleshooting. A robust monitoring and observability framework requires telemetry data - logs, metrics and traces.

OpenTelemetry aims to standardize the creation and management of telemetry data. It can fit within any application's architecture and generate telemetry data with little to no overhead.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/09/opentelemetry_architecture.webp" alt="OpenTelemetry Architecture"/>
    <figcaption><i>Architecture - How OpenTelemetry fits in an application architecture. OTel collector refers to OpenTelemetry Collector</i></figcaption>
</figure>

## Why is distributed tracing needed?
In microservices architecture, often engineering teams are responsible for just one service and it becomes a nightmare to troubleshoot issues without an overview. Correlating logs and metrics is challenging with a lot of manual effort.

That's where distributed tracing comes into the picture. User requests are broken down into spans.

>What are spans?<br></br>
>Spans represent a single operation within a trace.
>It represents work done by a single service which can be broken down further depending on the use case.

A trace context is passed along when requests travel between services, which tracks a user request across services. You can see how a user request performs across services and identify what exactly needs your attention without manually shifting through multiple dashboards.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/opentelemetry_distributed_tracing-min.webp" alt="OpenTelemetry tracing uses trace context to track user request across services"/>
    <figcaption><i>A trace context is passed when user requests pass from one service to another</i></figcaption>
</figure>

<br></br>

Using OpenTelemetry you can encapsulate several pieces of information with a span. Common information includes **the name of the operation, start and end timestamp, events occurring during the span**. You can also add custom attributes with key/value pairs to enable more insights if needed.

In the picture below, you can see the details for the selected span. [SigNoz](https://signoz.io/) is a lightweight open-source APM tool based on OpenTelemetry, which can be used as an analysis tool.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/details_span-min.webp" alt="Attributes can be added to spans for more context"/>
    <figcaption><i>SigNoz is a lightweight APM tool based on OpenTelemetry. it provides out of box visualization for traces and metrics.</i></figcaption>
</figure>

<br></br>

When the user request finishes operation in one of the services and travels to another one, a trace ID is passed along, unique for every request. This way, you can correlate information about your requests easily across your entire architecture.

## What is OpenTelemetry?
OpenTelemetry is a set of APIs, SDKs, libraries, and integrations that is aiming to standardize the generation, collection, and management of telemetry data(logs, metrics, and traces). OpenTelemetry is a Cloud Native Computing Foundation project created after the merger of OpenCensus(from Google) and OpenTracing(from Uber).

## Five things to know about OpenTelemetry
Now that you understand a little bit about both OpenTelemetry and distributed tracing, let us see a list of things you must know about OpenTelemetry tracing:

1. **Backed by major cloud vendors**<br></br>
OpenTelemetry is an open-source project under Cloud Native Computing Foundation backed by major cloud providers like Microsoft and Google. As such, it has a wide community support as well as support by most APM and observability vendors.

2. **Reduced overhead for telemetry data**<br></br>
OpenTelemetry reduces overhead from your application to create and manage telemetry data. Your application is decoupled from OpenTelemetry implementation as OpenTelemetry provides an API to interact with. Telemetry is collected by otel-collectors which can receive, process and export data in multiple data formats.

3. **OpenTelemetry Tracing API is stable**<br></br>
OpenTelemetry has stable tracing API release in Java, .NET, Javascript, Python, and Erlang.

4. **Vendor-agnostic data formats**<br></br>
OpenTelemetry provides an otel-collector that can be used to receive trace data in multiple formats. Otel-collector also provides processors and exporters using which you can choose to export the collected data in your required format.

5. **Easy set-up and implementation**<br></br>
OpenTelemetry libraries come with default support for tracing. You just need to configure OpenTelemetry collectors via a config file to collect traces data in the format you prefer.

## Steps involved in implementing OpenTelemetry tracing<br></br>
OpenTelemetry provides auto-instrumentation libraries in multiple languages. With auto-instrumentation, you can get started with tracing without making any changes to your code.

For example [OpenTelemetry Java JAR agent](https://signoz.io/opentelemetry/java-agent/) can detect a number of popular libraries and frameworks and instrument it right out of the box for generating telemetry data.

You can also instrument your code manually to have more business specific context. You can check out examples in different programming language under [manual instrumentation](https://opentelemetry.io/docs/instrumentation/). Let's look at the steps involved in tracing code using OpenTelemetry in Java:

1. **Get a `Tracer`** <br></br>
   The first step is to acquire a `Tracer`. The `Tracer` is responsible for creating spans.

   ```java
   import io.opentelemetry.api;

   //...

   Tracer tracer =
      openTelemetry.getTracer("instrumentation-library-name", "1.0.0");
   ```

2. **Create a span**<br></br>
   Creating a span only involves naming it. The start and end time is managed by the OpenTelemetry SDK.
   
   ```java
   Span span = tracer.spanBuilder("my span").startSpan();
   
   // Make the span the current span
   try (Scope ss = span.makeCurrent()) {
      // In this scope, the span is the current/active span
      } finally {
    span.end();
    }
   ```

3. **Create nested spans**<br></br>
   There can be multiple logical operations inside a service for which you might want to measure things like duration or custom attributes. OpenTelemetry supports tracing within processes. Example of a method `A` calling method `B` where spans are linked manually:
   
   ```jsx
   void parentOne() {
   Span parentSpan = tracer.spanBuilder("parent").startSpan();
   try {
    childOne(parentSpan);
   } finally {
    parentSpan.end();
     }
   }

   void childOne(Span parentSpan) {
   Span childSpan = tracer.spanBuilder("child")
        .setParent(Context.current().with(parentSpan))
        .startSpan();
   // do stuff
   childSpan.end();
   }
   ```

4. **Add span attributes**<br></br>
   With OpenTelemetry, you can add attributes on span to get additional context. Attributes provide additional context on the specific operation it tracks.
   
   ```jsx
   Span span = tracer.spanBuilder("/resource/path").setSpanKind(SpanKind.CLIENT).startSpan();
   span.setAttribute("http.method", "GET");
   span.setAttribute("http.url", url.toString());
   ```

5. **Context propagation**<br></br>
   OpenTelemetry context propagation is based on <a href = "https://www.w3.org/TR/trace-context/" rel="noopener noreferrer nofollow" target="_blank" >W3C Trace Context</a> HTTP headers. The W3C trace context specification defines standard HTTP headers to propagate context information that enables distributed tracing.

## How to get started with OpenTelemetry tracing?
OpenTelemetry is becoming the world standard for instrumenting application code due to its multi-language support and ease of use. But OpenTelemetry helps only to generate and collect telemetry data. You need to export the telemetry data to a backend analysis tool so that your teams can store, query, and visualize the collected data.

And that's where [SigNoz](https://signoz.io/) comes into the picture. SigNoz is an open source APM and observability tool that supports logs, metrics, and traces under a single pane of glass.  

<figure data-zoomable>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz dashboard showing popular RED metrics"/>
    <figcaption><i>An OpenTelemetry backend built natively for OpenTelemetry, SigNoz provides out-of-box charts for application metrics</i></figcaption>
</figure>

<br></br>

The tracing signal from OpenTelemetry instrumentation helps you correlate events across services. With SigNoz, you can visualize your tracing data using Flamegraphs and Gantt charts. It shows you a complete breakdown of the request along with every bit of data collected with OpenTelemetry semantic conventions.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Detailed Flamegraphs & Gantt charts"/>
    <figcaption><i>Tracing data collected by OpenTelemetry can be visualized with the help of Flamegraphs and Gantt charts on the SigNoz dashboard</i></figcaption>
</figure>

<br></br>

SigNoz also supports Log management. You can either use OpenTelemetry SDKs to collect and send logs, or use your existing logging pipelines to send logs to SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log management in SigNoz"/>
    <figcaption><i>Log management in SigNoz</i></figcaption>
</figure>

<br></br>

## Getting started with SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)


You can check out SigNoz's GitHub repo here 👇
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

___

#### **Related Content**

**[OpenTelemetry Collector - Complete Guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)**<br></br>
**[OpenTelemetry vs Prometheus](https://signoz.io/blog/opentelemetry-vs-prometheus/)**<br></br>





