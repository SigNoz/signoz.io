---
title: Spans - a key concept of distributed tracing
slug: distributed-tracing-span
date: 2023-10-18
tags: [Distributed Tracing]
authors: ankit_anand
description: Spans are fundamental blocks of distributed tracing. A single trace in distributed tracing consists of a series of tagged time intervals known as spans...
image: /img/blog/2023/01/distributed_tracing_sapns_cover-min.jpg
keywords:
  - distributed tracing
  - distributed tracing spans
  - application performance monitoring
  - span context
  - latency
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/distributed-tracing-span/"/>
</head>

Spans are fundamental building blocks of distributed tracing. A single trace in distributed tracing consists of a series of tagged time intervals known as spans. Spans represent a logical unit of work in completing a user request or transaction.

<!--truncate-->

![Cover Image](/img/blog/2023/01/distributed_tracing_sapns_cover.webp)

Distributed tracing is critical to application performance monitoring in microservice-based architecture. Before we deep dive into spans, let's have a brief overview of distributed tracing.

## What is distributed tracing?
In a microservices architecture, a user request travels through hundreds, even thousands of services before serving the user what they need. Engineering teams often responsible for maintaining single services have no visibility over how the system performs as a whole.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="Microservices architecture"
    height={500}
    src="/img/blog/2021/12/fictional_ecommerce_microservices_architecture.webp"
    title="Microservice architecture of a fictional e-commerce application"
    width={700}
/>

Distributed tracing gives insights into how a particular service is performing as part of the whole in a distributed software system. It involves passing a trace context with each user request which is then passed across hosts, services, and protocols to track the user request.

These requests are broken down into spans, and the entire request is represented by a trace.

> **What are spans in distributed tracing?**<br></br>
> In distributed tracing, a user request or a transaction is represented by a trace. Traces are broken down into multiple spans. Spans represent a single logical operation within a trace. For example, a function call during a user request can be represented by a span.

## Spans in distributed tracing

### What are spans in distributed tracing?
Each unit of work in a trace is represented by a span. A trace represents a complete process for a request - from its initiation to its completion. The picture below shows one trace which is composed of multiple spans.

In the example shown below, the request is initiated from a frontend web client. The first span is the parent span which shows the total time taken by the request.

Parent span calls four services which form the child spans, namely:

- auth - to authenticate the user
- route - to find the nearest route
- driver - to allocate the nearest driver
- customer - to add customer details

These spans can then further have their own child spans.

<Screenshot
    alt="A complete trace consisting of multiple spans"
    height={500}
    src="/img/blog/2021/12/trace_spans.webp"
    title="A sample trace demonstrating a request initiated by a frontend web client."
    width={700}
/>

The first span is known as the parent span and the subsequent spans are child spans. 

**Parent Span:**<br></br>
Also known as root spans, a parent span encapsulates the end-to-end latency of an entire request. To explain it more clearly, let us define adding a product to a cart on an e-commerce website as a user request. The parent span will measure the time it took from the event of an end-user clicking a button to the product being added to the cart. The parent span can also end if some error occurs.

**Child Spans:**<br></br>
A child span is triggered by a parent span and can be a function call, DB calls, calls to another service, etc. In the example mentioned above, a child span can be a function checking whether the item is available or not. Child spans provide visibility into each component of a request.

Combining all the spans in a trace can give you a detailed idea about how the request performed across its entire lifecycle.

### What are spans composed of?

A span contains a span context that uniquely identifies the request the span is part of. Spans can provide request, error, and duration metrics that can be used to debug availability and performance issues.

You can also add span attributes to provide more context to your operations. Span attributes are key-value pairs that can be used to provide additional context on a span about the specific operation it tracks.

Let us see details of a selected span in an APM tool like [SigNoz](https://signoz.io/).

<Screenshot
    alt="Span attributes"
    height={500}
    src="/img/blog/2021/12/span_attributes1.webp"
    title="Span attributes: Details associated with a span captured by SigNoz"
    width={700}
/>

### Example of a basic span
Let’s see an example of creating a basic span using the OpenTelemetry instrumentation library. <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is a set of API, SDKs, libraries, and integrations that is aiming to standardize the generation, collection, and management of telemetry data(logs, metrics, and traces).

Example of creating a basic span in java (Source: OpenTelemetry docs)

```jsx
Span span = tracer.spanBuilder("my span").startSpan();
// put the span into the current Context
try (Scope scope = span.makeCurrent()) {
	// your use case
	...
} catch (Throwable t) {
    span.setStatus(StatusCode.ERROR, "Change it to your error message");
} finally {
    span.end(); // closing the scope does not end the span, this has to be done manually
}
```
<br></br>

Example of adding span attributes
```jsx
Span span = tracer.spanBuilder("/resource/path").setSpanKind(SpanKind.CLIENT).startSpan();
span.setAttribute("http.method", "GET");
span.setAttribute("http.url", url.toString());
```

## Getting started with Distributed Tracing

Distributed tracing has become a key debugging tool for applications based on microservices architecture. If you want to implement distributed tracing for your application, you can use SigNoz - a full stack open source APM. 

SigNoz provides metrics monitoring, log management, and distributed tracing under a single pane of glass and is built to support OpenTelemetry natively. OpenTelemetry is quietly becoming the world standard for application instrumentation. Using OpenTelemetry, you can avoid vendor lock-in and it comes with handy client libraries which can help you get started with distributed tracing easily.

SigNoz provides easy-to-use visualizations like flamegraphs and Gantt charts from tracing data collected with OpenTelemetry.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Detailed Flamegraphs & Gantt charts"/>
    <figcaption><i>Spans of a trace visualized with the help of flamegraphs and gantt charts in SigNoz dashboard</i></figcaption>
</figure>

<br></br>

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" > Docker Engine </a> before running the install script.

```
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.


[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

---

Read more about OpenTelemetry:<br></br>
[OpenTelemetry Collector: architecture and configuration guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)<br></br>








