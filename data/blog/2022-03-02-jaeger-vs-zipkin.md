---
title: Jaeger vs Zipkin - Which tool to choose for tracing?
slug: jaeger-vs-zipkin
date: 2024-01-25
tags: [Tools Comparison, Jaeger]
authors: ankit_anand
description: Jaeger and Zipkin are two popular open-source projects used for end-to-end distributed tracing. While Zipkin is an older project and has a wider community, Jaeger has a modern, scalable architecture and supports open standards of instrumentation libraries..
image: /img/blog/2021/09/jaeger_vs_zipkin_apm_cover-min.jpeg
keywords:
  - jaeger
  - zipkin
  - distributed tracing
  - traces
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/jaeger-vs-zipkin/"/>
</head>

[Distributed tracing](https://signoz.io/blog/distributed-tracing-in-microservices/) is becoming a critical component of any application's performance monitoring stack. However, setting it up in-house is an arduous task, and that's why many companies prefer outside tools. [Jaeger](https://signoz.io/blog/distributed-tracing-jaeger/) and Zipkin are two popular open-source projects used for end-to-end distributed tracing. Let us explore their key differences in this article.

<!--truncate-->

![Cover Image](/img/blog/2021/09/jaeger_vs_zipkin_apm_cover-min.webp)

Both Zipkin and Jaeger are popular open-source distributed tracing tools. Zipkin was originally inspired by Google's Dapper and was developed by Twitter. Zipkin is a much older project than Jaeger and was first released as an open-source project in 2012. Jaeger was originally built by teams at Uber and then open-sourced in 2015. It got accepted as a Cloud Native incubation project in 2017 and graduated in 2019.

Before we dive into the differences between Jaeger and Zipkin, let's take a short detour to understand distributed tracing.

## What is distributed tracing?
In the world of microservices, a user request travels through hundreds of services before serving a user what they need. To make a business scalable, engineering teams are responsible for particular services with no insight into how the system performs as a whole. And that's where distributed tracing comes into the picture.


import Screenshot from "@theme/Screenshot"

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="Microservices architecture"
    
    src="/img/blog/2021/09/jaeger_vs_zipkin_microservices_architecture.webp"
    />
<figcaption><i>Microservice architecture of a fictional e-commerce application</i></figcaption>
</figure>
<br/>

Distributed tracing gives you insight into how a particular service is performing as part of the whole in a distributed software system. There are two important concepts involved in distributed tracing: **[Spans](https://signoz.io/blog/distributed-tracing-span/)** and **[trace context](https://signoz.io/blog/context-propagation-in-distributed-tracing/)**.

User requests are broken down into spans.

> What are spans?<br></br>
> Spans represent a single operation within a trace. Thus, it represents work done by a single service which can be broken down further depending on the use case.

A trace context is passed along when requests travel between services, which tracks a user request across services. You can see how a user request performs across services and identify what exactly needs your attention without manually shifting through multiple dashboards.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="Trace context is passed to track user requests across services"
    
    src="/img/blog/2021/09/opentelemetry_distributed_tracing-min.webp"
    />
<figcaption><i>A trace context is passed when user requests pass from one service to another</i></figcaption>
</figure>
<br/>

## Jaeger and Zipkin: Key components
<a href = "https://github.com/jaegertracing/jaeger" rel="noopener noreferrer nofollow" target="_blank" ><b>Jaeger's</b></a> source code is primarily written in Go, while <a href = "https://github.com/openzipkin/zipkin" rel="noopener noreferrer nofollow" target="_blank" ><b>Zipkin's</b></a> source code is primarily written in Java. The architecture of Jaeger and Zipkin is somewhat similar. Major components in both architectures include:

- Instrumentation Libraries
- Collectors
- Query Service and web UI
- Database Storage

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="Jaeger architecture"
    
    src="/img/blog/2021/09/Jaeger_architecture-min.webp"
    />
<figcaption><i>Illustration of  Jaeger architecture (Source: Jaeger website)</i></figcaption>
</figure>
<br/>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="Zipkin architecture"
    
    src="/img/blog/2021/09/zipkin_architecture-min.webp"
    />
<figcaption><i>Illustration of Zipkin architecture (Source: Zipkin website)</i></figcaption>
</figure>
<br/>

### Instrumentation Libraries
Instrumentation is the process of generating telemetry data(logs, metrics, and traces) from an application code. Both Jaeger and Zipkin provide language-specific instrumentation libraries. Instrumentation enables a service to create spans on incoming requests and to attach context information on outgoing requests.

Key points to note about instrumentation libraries of Jaeger and Zipkin:

- Jaeger recommends using OpenTelemetry APIs and SDKs for generating traces. Using OpenTelemetry users have the advantage of using a single open source standard for all types of telemetry signals as OpenTelemetry aslo supports logs and metrics.

- Zipkin provides client libraries in popular languages like C#, Go, Java, Javascript, Ruby, Scala, PHP, etc. There are also a lot of community supported libraries that you can use for instrumenting specific frameworks.

<!-- - Jaeger's instrumentation libraries are based on <a href = "https://opentracing.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>OpenTracing APIs</b></a>. OpenTracing was also started at Uber with an aim to create vendor-neutral instrumentation APIs for distributed tracing. Zipkin has its own instrumentation libraries.

- Jaeger has <a href = "https://www.jaegertracing.io/docs/1.26/client-libraries/" rel="noopener noreferrer nofollow" target="_blank" ><b>official client libraries</b></a> in Go, Java, Node.js, Python, C++, C#. Zipkin team maintains <a href = "https://zipkin.io/pages/tracers_instrumentation.html" rel="noopener noreferrer nofollow" target="_blank" ><b>instrumentation libraries</b></a> for frameworks in C#, Go, Java, Javascript, Ruby, Scala, and PHP. -->

- Both Jaeger and Zipkin support out-of-box instrumentation for a lot of popular frameworks. Jaeger is also compatible with Zipkin's API. That means you can use instrumentation libraries of Zipkin with Jaeger.

  <a href = "https://github.com/orgs/opentracing-contrib/repositories" rel="noopener noreferrer nofollow" target="_blank" >Jaeger's 3rd party supported frameworks</a><br></br>

  <a href = "https://zipkin.io/pages/tracers_instrumentation.html" rel="noopener noreferrer nofollow" target="_blank" >Zipkin's 3rd party supported frameworks</a>

### Collectors
Telemetry data collected by the instrumentation libraries are sent to a collector in both Jaeger and Zipkin. Jaeger's collectors validate traces, index them, perform any transformations, and finally stores them. Zipkin collector too validates and indexes the collected trace data for lookups.

### Query Service and Web UI
Zipkin provides a JSON API for finding and retrieving traces. Jaeger provides stateless service API endpoints which are typically run behind a load balancer, such as NGINX.

The consumer of the query service is a Web UI in both Jaeger and Zipkin, which is used to visualize trace data by a user.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="Jaeger's web UI showing Gantt charts"
    
    src="/img/blog/2021/08/jaeger_gantt_charts-min.webp"
    />
<figcaption><i>Jaeger's Web UI showing spans with Gantt charts</i></figcaption>
</figure>
<br/>

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="Zipkin trace UI"
    
    src="/img/blog/2021/09/jaeger_vs_zipkin_trace_ui.webp"
    />
<figcaption><i>Zipkin's trace UI</i></figcaption>
</figure>
<br/>

### Database storage
Both Jaeger and Zipkin provide pluggable storage backends for trace data. Cassandra and Elasticsearch are the primarily supported storage backends by Jaeger.

Zipkin was originally built to store data in Cassandra, but it later started supporting Elasticsearch and MySQL too.

## Comparing Jaeger and Zipkin

Jaeger and Zipkin have a lot of similarities in their architecture. Though Zipkin is an older project, Jaeger has a more modern and scalable design. 

Summarizing the key differences between Jaeger and Zipkin:

- **Instrumentation libraries**<br></br>
    Jaeger has shifted from its client libraries based on Opentracing APIs to recommended OpenTelemetry APIs and SDKs for application instrumentation. OpenTelemetry is a broader framework for observability that can help you generate different kinds of telemetry signals and correlate them for better contextual insights. Zipkin cal also receive traces from OpenTelemetry instrumented applications. Zipkin's instrumentation libraries are focused on simplicity and ease of integration. 

- **Deployment**<br></br>
    Jaeger can be deployed as a single binary where all Jaeger backend components run as a single process or as a scalable distributed system. Zipkin, on the other hand, can only be run as a single binary that includes the collector, storage, query service, and web UI.

- **Integrations**<br></br>
    As Jaeger comes under CNCF along with other projects such as Kubernetes, there are official orchestration templates for running Jaeger with [Kubernetes](https://github.com/jaegertracing/jaeger-kubernetes) and [OpenShift](https://github.com/jaegertracing/jaeger-openshift). Zipkin provides three options to build and start an instance of Zipkin: using Java, Docker, or running from the source.

- **Sampling strategis**<br></br>
    Jaeger offers adaptive sampling, which adjusts the sampling rate based on the traffic and error rates, enabling more efficient trace data collection without overwhelming storage with too much data. Zipkin relies on simpler, less flexible sampling strategies, such as per-service sampling, which may not be as efficient in environments with highly variable traffic patterns.

- **Community Support**<br></br>
    Despite being newer, Jaeger has caught up to Zipkin in terms of community support. Zipkin is a standalone project which came into existence before containerization went mainstream. Jaeger, as part of CNCF, is a recognized project in cloud-native architectures.

Both Jaeger and Zipkin are strong contenders when it comes to a distributed tracing tool. But are traces enough to solve all performance issues of a modern distributed application? The answer is no. You also need metrics and a way to correlate metrics with traces with a single dashboard. Most SaaS vendors provide both metrics and traces under a [single pane of glass](https://signoz.io/blog/single-pane-of-glass-monitoring/). But the beauty of Jaeger and Zipkin is that they are open-source. What if an open-source solution does both and comes with a great web UI with actionable insights for your engineering teams?

That's where [SigNoz](https://signoz.io/) comes into the picture.

## A better to alternative to Jaeger and Zipkin - SigNoz
SigNoz is a full-stack open-source application performance monitoring and observability tool which can be used in place of Jaeger and Zipkin. It provides advanced distributed tracing capabilities along with metrics under a single dashboard.

SigNoz is built to support OpenTelemetry natively. It also provides a fast OLAP datastore, ClickHouse as the storage backend.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="Architecture of SigNoz with OpenTelemetry and ClickHouse"
    
    src="/img/blog/2021/09/SigNoz_architecture_clickhouse.webp"
    />
<figcaption><i>Architecture of SigNoz with ClickHouse as storage backend and OpenTelemetry for code instrumentatiion</i></figcaption>
</figure>
<br/>

SigNoz comes with out of box visualization of things like RED metrics.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image"
    alt="SigNoz UI showing the popular RED metrics"
    
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    />
<figcaption><i>SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate</i></figcaption>
</figure>
<br/>

Some of the things SigNoz can help you track:

- Application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate
- Slowest endpoints in your application
- See exact request trace to figure out issues in downstream services, slow DB queries, call to 3rd party services like payment gateways, etc
- Filter traces by service name, operation, latency, error, tags/annotations.
- Run aggregates on trace data
- Unified UI for both metrics and traces

You can check out SigNoz's GitHub repo here 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

We also have an active slack community. Feel free to join in and say hi! 👋

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

___

#### **Related Content**

**[Jaeger vs ELastic APM](https://signoz.io/blog/jaeger-vs-elastic-apm/)**<br></br>
**[Jaeger vs SigNoz](https://signoz.io/blog/jaeger-vs-signoz/)**<br></br>
**[Jaeger vs Prometheus](https://signoz.io/blog/jaeger-vs-prometheus/)**<br></br>
**[Jaeger vs New Relic](https://signoz.io/blog/jaeger-vs-newrelic/)**<br></br>



