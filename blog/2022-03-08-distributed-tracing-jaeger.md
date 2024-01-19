---
title: Jaeger distributed tracing - complete guide
slug: distributed-tracing-jaeger
date: 2022-01-18
tags: [Distributed Tracing, Jaeger]
authors: ankit_anand
description: Jaeger is a popular open-source tool used for distributed tracing in a microservice architecture. See a demo ride-sharing application reporting its traces through Jaeger...
image: /img/blog/2022/09/jaeger_distributed_tracing.webp
keywords:
  - jaeger
  - distributed tracing
  - microservice architecture
  - apm tools
  - application performance monitoring
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/distributed-tracing-jaeger/"/>
</head>

Distributed tracing has become critical for application performance monitoring in microservice-based architecture. Jaeger is a popular open-source tool used for distributed tracing. With distributed tracing, engineering teams get a central overview of how user requests perform across multiple services.

<!--truncate-->

![Cover Image](/img/blog/2022/09/jaeger_distributed_tracing.webp)

## What is Jaeger?

Jaeger is an open-source distributed tracing tool meant to monitor and troubleshoot transactions in distributed systems. It was built by teams at Uber and then open-sourced in 2015. Jaeger is also a Cloud Native Computing Foundation graduate project.

In a microservice architecture, you can use Jaeger to track transactions across multiple services. The process of tracking transactions across different services is called distributed tracing.

> Jaeger is a fantastic open-source tool for distributed tracing. But for effective resolution of production issues, engineering teams need more than traces. [SigNoz](https://signoz.io/), a full-stack open-source tool, provides a unified UI for logs, metrics, and traces.

## What is distributed tracing?
In the world of microservices, a user request travels through hundreds of services before serving a user what they need. To make a business scalable, engineering teams are responsible for particular services with no insight into how the system performs as a whole. And that's where distributed tracing comes into the picture.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/jaeger_vs_zipkin_microservices_architecture.webp" alt="Microservices architecture"/>
    <figcaption><i>Microservice architecture of a fictional e-commerce application</i></figcaption>
</figure>

<br></br>

Distributed tracing gives you insight into how a particular service is performing as part of the whole in a distributed software system. There are two essential concepts involved in distributed tracing: **Spans** and **trace context**.

User requests are broken down into spans.

> What are spans?<br></br>
> Spans represent a single operation within a trace. Thus, it represents work done by a single service which can be broken down further depending on the use case.

A collection of spans from a single user request forms a trace.

A **trace context** is passed along when requests travel between services, which tracks a user request across services. Thus, you can see how a user request performs across services and identify what exactly needs your attention without manually shifting through multiple dashboards.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/opentelemetry_distributed_tracing-min.webp" alt="Trace context"/>
    <figcaption><i>A trace context is passed when user requests pass from one service to another</i></figcaption>
</figure>

<br></br>

## How does Jaeger accomplish distributed tracing?

There are four key components to a distributed tracing tool. These components together capture transactions into spans and then correlate those spans to form a trace.

The four key components of a distributed tracing tool are:

- Instrumentation
- Data pipeline
- Backend Storage
- Web UI/Visualization

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/Jaeger_architecture-min.webp" alt="Jaeger architecture"/>
    <figcaption><i>Jaeger architecture (Source: Jaeger Website)</i></figcaption>
</figure>

<br></br>

Let us see in detail what these components are and how these components come together to monitor a microservice architecture.

### Instrumentation
**What is instrumentation?**

Instrumentation is the process of generating telemetry data(logs, metrics, and traces) from your application code. It is essentially writing code that enables your application code to emit telemetry data, which can be used later to investigate issues.

Most distributed tracing tools offer clients libraries, agents, and SDKs to instrument application code. Jaeger's client libraries for instrumentation are based on <a href = "https://opentracing.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>OpenTracing APIs</b></a>. 

OpenTracing was an open-source project aimed at providing vendor-neutral APIs and instrumentation for distributed tracing. It later got merged into <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>OpenTelemetry</b></a>. Jaeger has official client libraries in the following languages:

- Go
- Java
- Node.js
- Python
- C++
- C#

When a service is instrumented, it generates spans for incoming transactions and attaches trace context to outgoing transactions.

### Data pipeline

Once the trace data is collected with the help of client libraries, it can be directly sent to the storage backends for storage and visualization. But it's a good practice to have a tracing pipeline for data buffering as the application scales. The pipeline enables receiving data in multiple formats, manipulation, batching, indexing, and queueing.

Jaeger provides Jaeger collectors, as seen in the architecture diagram. The collectors validate traces, index them and perform any transformation before storing the trace data.

### Backend Storage

Jaeger ships with simple in-memory storage for testing setups. Jaeger supports two popular open-source NoSQL databases as trace storage backends:

- Cassandra
- ElasticSearch

### Web UI/Visualization

Jaeger's UI is basic but comprehensive when it comes to distributed tracing.

## Implementing distributed tracing in Jaeger - Sample App

### Sample HotRod application

The sample HotRod application is a demo ride-sharing application. It shows four locations and by clicking on a location you call a ride to that location.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/hotrod_application_ui-min.webp" alt="HotRod application webUI"/>
    <figcaption><i>HotRod application webUI</i></figcaption>
</figure>

<br></br>

The sample HotRod application is a demo ride-sharing application. It shows four locations, and by clicking on a location, you call a ride to that location.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/hotrod_app_customer_call-min.webp" alt="Backend responses"/>
    <figcaption><i>When you click a customer button, the backend responds with a license plate number and ETA</i></figcaption>
</figure>

<br></br>

### Steps to get started with Jaeger distributed tracing

In order to see how Jaeger is used for distributed tracing, let's run the demo application HotRod  and see its traces using Jaeger.

Steps to run HotRod application with Jaeger:

1. The recommended way to run Jaeger is with a Docker image. If you don't have docker installed, install it from the [official Docker website](https://docs.docker.com/engine/install/).

2. The HotRod application is implemented in Go, so you need to [install Go](https://golang.org/doc/install). 

3. Run Jaeger backend as an all-in-one Docker image with the following command:
   ```jsx
   docker run -d -p6831:6831/udp -p16686:16686 jaegertracing/all-in-one:latest
   ```
   Once the container starts, you will be able to access Jaeger's UI at [http://localhost:16686/search](http://localhost:16686/search)

4. Clone Jaeger's GitHub repo in local and change directory
   ```jsx
   git clone --single-branch --depth 1 https://github.com/jaegertracing/jaeger.git
   cd jaeger
   ```
5. Run the sample HotRod application
   ```
   go run ./examples/hotrod/main.go all
   ```
   You will be able to access the app UI at http://127.0.0.1:8080/ 

   <figure data-zoomable align='center'>
    <img src="/img/blog/2022/09/jaeger_distributed_tracing.webp" alt="HOTrod application UI"/>
    <figcaption><i>Sample hotrod application</i></figcaption>
</figure>

<br></br>

To see traces on Jaeger, we need to generate some load. Click on different locations a number of times. When you access the Jaeger UI now, you can find the list of services along with its trace captured on Jaeger.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/distributed_tracing_jaeger_reporting-min.webp" alt="Jaeger UI"/>
    <figcaption><i>List of services of HotRod application reported on Jaeger dashboard</i></figcaption>
</figure>

<br></br>

Jaeger also creates a dependency diagram by tracing how requests flow and shows it in the dashboard. From the dependency diagram, we can see that the HotRod application has four microservices and two databases.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/09/jaeger_dependency_graph-min.webp" alt="Jaeger dependency graph"/>
    <figcaption><i>Jaeger shows a dependency diagram mapping your services</i></figcaption>
</figure>

<br></br>

## Limitations of using Jaeger as a distributed tracing tool

Jaeger is a preferred choice when it comes to distributed tracing. But engineering teams need more than traces to resolve issues quickly. They need access to both metrics and traces. Metrics such as response times, error rates, request rates, and CPU usage are equally important to understand application performance.

A few key challenges of using Jaeger as a distributed tracing tool are as follows:

- Only provides trace data. You will have to use another tool for metrics and logs management.
- Databases supported by Jaeger need active maintenance.
- Jaeger's web UI is limited with basic visualizations.

For a fast-moving engineering team, you need dashboards that can drive quick insights and resolution. And that's where [SigNoz](https://signoz.io/) comes into the picture. It is a great alternative to Jaeger for distributed tracing in microservices.

## SigNoz - a Jaeger alternative for distributed tracing

SigNoz is a full-stack open-source application performance monitoring and observability tool which can be used in place of Jaeger. SigNoz is built to support OpenTelemetry natively. OpenTelemetry is becoming the world standard to generate and maintain telemetry data(Logs, metrics, and traces).

SigNoz can be used as a distributed tracing tool for a microservice architecture. 

But SigNoz provides much more than distributed tracing. It also comes with application & infrastructure metrics as well as logs. With logs, metrics, and traces all under a single dashboard, you can use SigNoz as a one-stop observability solution.

<!-- SigNoz also provides users flexibility in terms of data storage.You can choose between ClickHouse or Kafka + Druid as your backend storage while installing SigNoz. Both are industry-proven and highly scalable databases. -->

<figure data-zoomable align='center'>
    <img src="/img/architecture-signoz-clickhouse.svg" alt="Architecture of SigNoz with OpenTelemetry and ClickHouse"/>
    <figcaption><i>Architecture of SigNoz with ClickHouse as storage backend and OpenTelemetry for code instrumentatiion</i></figcaption>
</figure>

<br></br>

SigNoz comes with out of box visualization of things like RED metrics.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz UI showing the popular RED metrics"/>
    <figcaption><i>SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate</i></figcaption>
</figure>

<br></br>

You can also use flamegraphs to visualize spans from your trace data. All of this comes out of the box with SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Flamegraphs used to visualize spans of distributed tracing in SigNoz UI"/>
    <figcaption><i>Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing</i></figcaption>
</figure>

<br></br>

SigNoz also provides Logs management. Using OpenTelemetry, you can correlated your logs to metrics and traces. Intelligently correlating your telemetry signals can help developers to debug performance issues quickly.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Logs management in SigNoz"/>
    <figcaption><i>Logs management in SigNoz</i></figcaption>
</figure>

<br></br>


Some of the things SigNoz can help you track:

- Application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate
- Slowest endpoints in your application
- See exact request trace to figure out issues in downstream services, slow DB queries, call to 3rd party services like payment gateways, etc
- Filter traces by service name, operation, latency, error, tags/annotations.
- Run aggregates on trace data
- Unified UI for both metrics, traces, and logs
- Exceptions monitoring
- Service dependency graph
- Alerts on critical metrics

You can check out SigNoz's GitHub repo here 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

___

#### **Related Content**

**[Using Jaeger for your microservices](https://signoz.io/blog/jaeger-microservices/)**<br></br>
**[Jaeger vs SigNoz](https://signoz.io/blog/jaeger-vs-signoz/)**<br></br>








