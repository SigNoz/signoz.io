---
title: Choosing an OpenTelemetry backend - Things To Keep In Mind
slug: opentelemetry-backend
date: 2023-10-10
tags: [OpenTelemetry]
authors: [ankit_anand]
description: Confused about choosing a backend analysis tool for OpenTelemetry? Here’s a guide on what factors you should consider while choosing a backend to store and visualize the telemetry data collected by OpenTelemetry...
image: /img/blog/2023/03/opentelemetry_backend_cover-min.jpg
keywords:
  - opentelemetry
  - opentelemetry backend
  - opentelemetry specification
  - logs
  - metrics
  - traces
  - logs
  - signoz
  - apm tools
  - application performance monitoring
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-backend/"/>
</head>

import SignUps from '../docs/shared/sign-ups.md'

OpenTelemetry is a Cloud Native Computing Foundation(<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) incubating project aimed at standardizing the way we instrument applications for generating telemetry data(logs, metrics, and traces). However, OpenTelemetry does not provide storage and visualization for the collected telemetry data. And that’s where an OpenTelemetry backend is needed.

<!--truncate-->

![Cover Image](/img/blog/2023/03/opentelemetry_backend_cover.webp)

Cloud computing and containerization made deploying and scaling applications easier. Modern applications make use of modular code and architectures like microservices and serverless. Engineering teams can ship features faster, and any surge in user demand can be met by just spinning up more containers.

But every coin has two sides. While having benefits like smaller engineering teams and on-demand scaling of applications, cloud computing and containerization have also increased operational complexity manifolds. Troubleshooting an application based on a distributed system for performance issues is like finding a needle in a haystack.

<SignUps />

Collecting data from applications that can act as signals for troubleshooting performance issues is a practice as old as writing software. The data that helps to analyze performance issues is known as telemetry data. For cloud-native applications, it became a challenge to have a consistent framework for generating telemetry data.

OpenTelemetry solves this problem by creating an open standard for generating telemetry data. Let’s learn a bit about OpenTelemetry.

## What is OpenTelemetry?

OpenTelemetry is an open-source collection of tools, APIs, and SDKs that aims to standardize the way we generate and collect telemetry data. It follows a specification-driven development. The <a href = "https://github.com/open-telemetry/opentelemetry-specification" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry specification</a> has design and implementation guidelines for how the instrumentation libraries should be implemented. In addition, it provides client libraries in all the major programming languages which follow the specification.

OpenTelemetry was formed after the merger of two open-source projects - OpenCensus and OpenTracing in 2019. Since then, it has been the go-to open source standard for instrumenting cloud-native applications.

The specification is designed into distinct types of telemetry known as signals. Presently, OpenTelemetry has specifications for these three signals:

- Logs,
- Metrics, and
- Traces

Together these three signals form the three pillars of observability. OpenTelemetry is the bedrock for setting up an observability framework. The application code is instrumented using OpenTelemetry client libraries, which enables the generation of telemetry data. Once the telemetry data is generated and collected, OpenTelemetry needs a backend analysis tool to which it can send the data.

## Why does OpenTelemetry need a backend?

The founders of OpenTelemetry wanted to standardize two things:

- The way we instrument application code
- The data format of generated telemetry data

Once we have the telemetry data in a consistent format, it can be sent to any observability backend. This provides users the freedom to select any OpenTelemetry backend based on their observability needs. 

The aim of OpenTelemetry was always to have a pluggable architecture using which users can build robust observability stacks using additional technology protocols and formats. 

Here’s a snapshot showing how OpenTelemetry fits within a microservice-based application and an observability backend.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/distributed_tracing_app_otel_signoz.webp" alt="How OpenTelemetry fits within an application and an observability backend"/>
    <figcaption><i>How OpenTelemetry fits within a microservice-based application and an observability backend - SigNoz</i></figcaption>
</figure>

<br></br>

The OpenTelemetry collector acts as the routing layer. Once the telemetry data is collected with the help of OpenTelemetry libraries, it is sent to the OpenTelemetry collector. The OpenTelemetry collector can export the telemetry data in multiple formats to multiple observability backends.

## Things to look out for when choosing an OpenTelemetry backend

OpenTelemetry provides you the freedom to choose a backend analysis tool of your choice. Most observability vendors currently have introduced support for OpenTelemetry. So how do you ensure which OpenTelemetry backend to go for? There are three main components that an OpenTelemetry backend is responsible for:

- **Data Storage**<br></br>
  Observability data can be huge. The data storage of an OpenTelemetry backend should be highly scalable, and query execution performance should be top-notch.

- **Query Service**<br></br>
  OpenTelemetry has three distinct signals. Each signal has different data formats with different use-cases for users. Moreover, the signals are correlated. The query service of an OpenTelemetry backend should be built with these considerations in mind.

- **Visualization**<br></br>
  Making sense out of data is what impacts the end-user of observability dashboards. OpenTelemetry backends should provide intuitive dashboards that enable end-users to take quick actions on performance issues.

Below is the list of factors that should be taken into consideration before selecting an OpenTelemetry backend:

- **Support for all distinct signals of OpenTelemetry**<br></br>
  Currently, OpenTelemetry collects telemetry data in three distinct signals, namely, logs, metrics, and traces. Setting up a robust observability framework requires the use of all three signals. 
  An OpenTelemetry backend should be able to ingest and visualize all three signals. Moreover, the frontend of the OpenTelemetry backend should also provide features to easily correlate the signals.

- **Native support for OpenTelemetry semantic conventions**<br></br>
  In OpenTelemetry, every component of a distributed system is defined as an attribute. The attribute is nothing but a key-value pair. These attributes are defined by the OpenTelemetry specification as OpenTelemetry semantic conventions. For example, here is a glimpse of how HTTP conventions look like:
    
    
  | Attribute | Description | Example |
  | --- | --- | --- |
  | http.method | HTTP request method | GET; POST; HEAD |
  | http.target | The full request target as passed in an HTTP request line or equivalent | /blog/june/ |
  | http.scheme | The URI scheme that identifies the used protocol | http; https |
        
  An OpenTelemetry backend should have native support to store data with OpenTelemetry semantic conventions. Existing observability vendors usually transform the data collected using OpenTelemetry semantic conventions into their propriety formats. But OpenTelemetry has a <a href = "https://github.com/open-telemetry/semantic-conventions" rel="noopener noreferrer nofollow" target="_blank">huge list</a> of semantic conventions which might not be fully utilized in such scenarios.
    
- **Should allow aggregates on trace data**<br></br>
  Running aggregates on trace data enables you to create service-centric views. OpenTelemetry also provides you the ability to create custom tags. Combined with custom tags and aggregated trace data gives you a powerful magnifying glass to surface performance issues in your services. For example, you can get the error rate and 99th percentile latency of `customer_type: gold` or `deployment_version: v2` or `external_call: paypal`

- **Open Source**<br></br>
  OpenTelemetry is an open source standard with a huge community backing. It is testimonial to the fact that community-driven projects can solve large complex engineering problems. It is not necessary for the OpenTelemetry backend to be open source.
  
  But having an open source OpenTelemetry backend can enable you to have a full-stack open source solution. Open source solutions have more flexibility, and if you self-host, you don’t need to worry about things like data privacy.

Nearly all observability vendors now claim to be 100% compatible with OpenTelemetry. But it’s difficult to move away from legacy systems. A solution built natively for OpenTelemetry can be a good choice for an OpenTelemetry backend. And that’s where [SigNoz](https://signoz.io/) comes into the picture.

## Trying out an OpenTelemetry Backend

If you want to play around with an OpenTelemetry backend, it is easy to get started with SigNoz. SigNoz is an open source APM built natively on OpenTelemetry. 

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple installation script.

The install script automatically installs Docker Engine on Linux. However, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> on macOS before running the install script.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

Once your application is instrumented with OpenTelemetry client libraries, the data can be sent to the SigNoz backend by specifying a specific port on the machine where SigNoz is installed.

You can then use Signoz to monitor application metrics with out-of-box charts and visualization.

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

SigNoz also lets you run aggregates on your tracing data. Running aggregates on tracing data enables you to create service-centric views, providing insights to debug applications at the service level. It also makes sense for engineering teams as they own specific microservices.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/06/otel_backend_running_aggregates.webp" alt="Running aggregates on trace data"/>
    <figcaption><i>Running aggregates on your tracing data enables you to create service-centric views</i></figcaption>
</figure>

<br></br>

You can check out the SigNoz GitHub repo here:

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)


---

## Further Reading

[SigNoz - an open source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)

[OpenTelemetry Collector - a complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)
