---
title: Jaeger vs Zipkin - Key architecture components, differences and alternatives
slug: jaeger-vs-zipkin
date: 2022-03-02
tags: [Tools Comparison, Jaeger]
authors: ankit_anand
description: Jaeger and Zipkin are two popular open-source projects used for end-to-end distributed tracing. While Zipkin is an older project and has a wider community, Jaeger has a modern, scalable architecture and supports open standards of instrumentation libraries..
image: /img/blog/2021/09/jaeger_vs_zipkin_apm_cover-min.webp
keywords:
  - jaeger
  - zipkin
  - distributed tracing
  - traces
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/jaeger-vs-zipkin/"/>
</head>

Distributed tracing is becoming a critical component of any application's performance monitoring stack. However, setting it up in-house is an arduous task, and that's why many companies prefer outside tools. Jaeger and Zipkin are two popular open-source projects used for end-to-end distributed tracing. Let us explore their key differences in this article.

<!--truncate-->

![Cover Image](/img/blog/2021/09/jaeger_vs_zipkin_apm_cover-min.webp)

Both Zipkin and Jaeger are popular open-source distributed tracing tools. Zipkin was originally inspired by Google's Dapper and was developed by Twitter. Zipkin is a much older project than Jaeger and was first released as an open-source project in 2012. Jaeger was originally built by teams at Uber and then open-sourced in 2015. It got accepted as a Cloud Native incubation project in 2017 and graduated in 2019.

Before we dive into the differences between Jaeger and Zipkin, let's take a short detour to understand distributed tracing.

## What is distributed tracing?
In the world of microservices, a user request travels through hundreds of services before serving a user what they need. To make a business scalable, engineering teams are responsible for particular services with no insight into how the system performs as a whole. And that's where distributed tracing comes into the picture.


import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="Microservices architecture"
    height={500}
    src="/img/blog/2021/09/jaeger_vs_zipkin_microservices_architecture.webp"
    title="Microservice architecture of a fictional e-commerce application"
    width={700}
/>

Distributed tracing gives you insight into how a particular service is performing as part of the whole in a distributed software system. There are two important concepts involved in distributed tracing: **Spans** and **trace context**.

User requests are broken down into spans.

> What are spans?<br></br>
> Spans represent a single operation within a trace. Thus, it represents work done by a single service which can be broken down further depending on the use case.

A trace context is passed along when requests travel between services, which tracks a user request across services. You can see how a user request performs across services and identify what exactly needs your attention without manually shifting through multiple dashboards.

<Screenshot
    alt="Trace context is passed to track user requests across services"
    height={500}
    src="/img/blog/2021/09/opentelemetry_distributed_tracing-min.webp"
    title="A trace context is passed when user requests pass from one service to another"
    width={700}
/>

## Jaeger and Zipkin: Key components
<a href = "https://github.com/jaegertracing/jaeger" rel="noopener noreferrer nofollow" target="_blank" ><b>Jaeger's</b></a> source code is primarily written in Go, while <a href = "https://github.com/openzipkin/zipkin" rel="noopener noreferrer nofollow" target="_blank" ><b>Zipkin's</b></a> source code is primarily written in Java. The architecture of Jaeger and Zipkin is somewhat similar. Major components in both architectures include:

- Instrumentation Libraries
- Collectors
- Query Service and web UI
- Database Storage

<Screenshot
    alt="Jaeger architecture"
    height={500}
    src="/img/blog/2021/09/Jaeger_architecture-min.webp"
    title="Illustration of  Jaeger architecture (Source: Jaeger website)"
    width={700}
/>

<Screenshot
    alt="Zipkin architecture"
    height={500}
    src="/img/blog/2021/09/zipkin_architecture-min.webp"
    title="Illustration of Zipkin architecture (Source: Zipkin website)"
    width={700}
/>

### Instrumentation Libraries
Instrumentation is the process of generating telemetry data(logs, metrics, and traces) from an application code. Both Jaeger and Zipkin provide language-specific instrumentation libraries. Instrumentation enables a service to create spans on incoming requests and to attach context information on outgoing requests.

Key points to note about instrumentation libraries of Jaeger and Zipkin:

- Jaeger's instrumentation libraries are based on <a href = "https://opentracing.io/" rel="noopener noreferrer nofollow" target="_blank" ><b>OpenTracing APIs</b></a>. OpenTracing was also started at Uber with an aim to create vendor-neutral instrumentation APIs for distributed tracing. Zipkin has its own instrumentation libraries.

- Jaeger has <a href = "https://www.jaegertracing.io/docs/1.26/client-libraries/" rel="noopener noreferrer nofollow" target="_blank" ><b>official client libraries</b></a> in Go, Java, Node.js, Python, C++, C#. Zipkin team maintains <a href = "https://zipkin.io/pages/tracers_instrumentation.html" rel="noopener noreferrer nofollow" target="_blank" ><b>instrumentation libraries</b></a> for frameworks in C#, Go, Java, Javascript, Ruby, Scala, and PHP.

- Both Jaeger and Zipkin support out-of-box instrumentation for a lot of popular frameworks. Jaeger is also compatible with Zipkin's API. That means you can use instrumentation libraries of Zipkin with Jaeger.

  <a href = "https://github.com/orgs/opentracing-contrib/repositories" rel="noopener noreferrer nofollow" target="_blank" >Jaeger's 3rd party supported frameworks</a><br></br>

  <a href = "https://zipkin.io/pages/tracers_instrumentation.html" rel="noopener noreferrer nofollow" target="_blank" >Zipkin's 3rd party supported frameworks</a>

### Collectors
Telemetry data collected by the instrumentation libraries are sent to a collector in both Jaeger and Zipkin. Jaeger's collectors validate traces, index them, perform any transformations, and finally stores them. Zipkin collector too validates and indexes the collected trace data for lookups.

### Query Service and Web UI
Zipkin provides a JSON API for finding and retrieving traces. Jaeger provides stateless service API endpoints which are typically run behind a load balancer, such as NGINX.

The consumer of the query service is a Web UI in both Jaeger and Zipkin, which is used to visualize trace data by a user.

<Screenshot
    alt="Jaeger's web UI showing Gantt charts"
    height={500}
    src="/img/blog/2021/08/jaeger_gantt_charts-min.webp"
    title="Jaeger's Web UI showing spans with Gantt charts"
    width={700}
/>

<Screenshot
    alt="Zipkin trace UI"
    height={500}
    src="/img/blog/2021/09/jaeger_vs_zipkin_trace_ui.webp"
    title="Zipkin's trace UI"
    width={700}
/>

### Database storage
Both Jaeger and Zipkin provide pluggable storage backends for trace data. Cassandra and Elasticsearch are the primarily supported storage backends by Jaeger.

Zipkin was originally built to store data in Cassandra, but it later started supporting Elasticsearch and MySQL too.

## Comparing Jaeger and Zipkin
Jaeger and Zipkin have a lot of similarities in their architecture. Though Zipkin is an older project, Jaeger has a more modern and scalable design. 

Summarizing the key differences between Jaeger and Zipkin:

- Jaeger's has wider support of instrumentation libraries as it supports OpenTracing APIs and is also compatible with Zipkin's API. Jaeger also provides an option to <a href = "https://www.jaegertracing.io/docs/1.26/getting-started/#migrating-from-zipkin" rel="noopener noreferrer nofollow" target="_blank" ><b>migrate from Zipkin</b></a>. On the other hand, Zipkin supports popular frameworks in the official clients, while leaving the community to instrument smaller libraries like database drivers.

- Jaeger can be deployed as a single binary where all Jaeger backend components run as a single process or as a scalable distributed system. Zipkin, on the other hand, can only be run as a single binary that includes the collector, storage, query service, and web UI.

- As Jaeger comes under CNCF along with other projects such as Kubernetes, there are official orchestration templates for running Jaeger with [Kubernetes](https://github.com/jaegertracing/jaeger-kubernetes) and [OpenShift](https://github.com/jaegertracing/jaeger-openshift). Zipkin provides three options to build and start an instance of Zipkin: using Java, Docker, or running from the source.

- Despite being older, Jaeger has caught up to Zipkin in terms of community support. Zipkin is a standalone project which came into existence before containerization went mainstream. Jaeger, as part of CNCF, is a recognized project in cloud-native architectures.

Both Jaeger and Zipkin are strong contenders when it comes to a distributed tracing tool. But are traces enough to solve all performance issues of a modern distributed application? The answer is no. You also need metrics and a way to correlate metrics with traces with a single dashboard. Most SaaS vendors provide both metrics and traces under a single pane of glass. But the beauty of Jaeger and Zipkin is that they are open-source. What if an open-source solution does both and comes with a great web UI with actionable insights for your engineering teams?

That's where [SigNoz](https://signoz.io/?utm_source=blog&utm_medium=jaeger_vs_zipkin) comes into the picture.

## A better to alternative to Jaeger and Zipkin - SigNoz
SigNoz is a full-stack open-source application performance monitoring and observability tool which can be used in place of Jaeger and Zipkin. It provides advanced distributed tracing capabilities along with metrics under a single dashboard.

SigNoz is built to support OpenTelemetry natively. It also provides a fast OLAP datastore, ClickHouse as the storage backend.

<Screenshot
    alt="Architecture of SigNoz with OpenTelemetry and ClickHouse"
    height={500}
    src="/img/blog/2021/09/SigNoz_architecture_clickhouse.webp"
    title="Architecture of SigNoz with ClickHouse as storage backend and OpenTelemetry for code instrumentatiion"
    width={700}
/>

SigNoz comes with out of box visualization of things like RED metrics.

<Screenshot
    alt="SigNoz UI showing the popular RED metrics"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    title="SigNoz UI showing application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate"
    width={700}
/>

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

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)

___

#### **Related Content**

**[Jaeger vs ELastic APM](https://signoz.io/blog/jaeger-vs-elastic-apm/)**<br></br>
**[Jaeger vs SigNoz](https://signoz.io/blog/jaeger-vs-signoz/)**<br></br>
**[Jaeger vs Prometheus](https://signoz.io/blog/jaeger-vs-prometheus/)**<br></br>
**[Jaeger vs New Relic](https://signoz.io/blog/jaeger-vs-newrelic/)**<br></br>



