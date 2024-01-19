---
title: OpenTelemetry Architecture - Understanding the design concepts
slug: opentelemetry-architecture
date: 2023-02-23
tags: [OpenTelemetry, Distributed Tracing]
authors: nitin
description: OpenTelemetry is a set of tools, APIs, and SDKs to generate telemetry signals. The OpenTelemetry architecture has several main components that comes together to create an instrumentation layer for all kinds of telemetry signals....
image: /img/blog/2023/02/opentelemetry_architecture_cover-min.jpg
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry architecture
  - opentelemetry api
  - opentelemetry sdk
  - signoz
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-architecture/"/>
</head>

OpenTelemetry consists of several main components. But to understand the architecture, we will start by understanding some of the key design principles behind the design and architecture of OpenTelemetry.

<!--truncate-->

![Cover Image](/img/blog/2023/02/opentelemetry_architecture_cover.webp)

But before that, let us have a brief overview of OpenTelemetry.

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is an open-source observability framework that aims to standardize the generation, collection, and management of telemetry data(Logs, metrics, and traces). It is incubated under Cloud Native Computing Foundation(<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >Cloud Native Computing Foundation</a>), the same foundation which incubated Kubernetes.

OpenTelemetry follows a <a href = "https://opentelemetry.io/docs/specs/otel/" rel="noopener noreferrer nofollow" target="_blank" >specification-driven</a> development and provides client libraries to instrument applications in most programming languages. Once you have instrumented with OpenTelemetry, you should be able to collect various telemetry signals like logs, metrics, and traces from it.

## What are OpenTelemetry Signals?

OpenTelemetry specification is organized into distinct types of telemetry, which we call **signals**. Currently, OpenTelemetry supports three telemetry signals: traces, metrics, and logs. Signals are the most fundamental unit of design in OpenTelemetry.

OpenTelemetry provides a way to **merge the three signals into a single cohesive data** so that debugging issues becomes very easy. For e.g, if you look at metrics on a chart, you can find the corresponding logs or find the trace associated with that metric instance if you have instrumented your application with OpenTelemetry client libraries.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/07/o11y-net-trans.webp" alt="Telemetry signals are correlated"/>
    <figcaption><i>Telemetry signals are correlated to give maximum contextual insights for troubleshooting issues.</i></figcaption>
</figure>

<br></br>


## Design Concepts:

OpenTelemetry is a cross-cutting concern that follows the execution of a transaction as it passes through each library and service. To achieve this feat, it uses a separation of concerns design principle to separate signals with the underlying system which stores context data and helps propagating data across the network calls.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/context_and_propagators.webp" alt="Context and Propagators in Action"/>
    <figcaption><i>Context and Propagators in Action</i></figcaption>
</figure>

<br></br>

All OpenTelemetry signals are built on top of a shared context propagation system. Other non-observability cross-cutting concerns may also use the context propagation mechanism to
transport their data through a distributed system. Let's understand the key objects which form the Data transport system of OpenTelemetry.

### Context:

The context object is a key-value store associated with an execution context, such as a thread or coroutine. Implementation of context is language-dependent, but OpenTelemetry provides a context object in every language.

### Propagators:

In order for distributed tracing to work, the trace context must be shared by every service that participates in the transaction. Propagators accomplish this by serializing and deserializing the context object, allowing the signals to follow their transactions across network requests.

Hopefully, you must be comfortable with the basic concepts now.  Let's try to understand the design of OpenTelemetry from a client perspective.

## Client Side Architecture :

An application is instrumented with OpenTelemetry by installing a collection of software libraries: the API, the SDK (software development kit), SDK plug-ins, and library instrumentation. This set of libraries is referred to as the OpenTelemetry client.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/otel_client_side_architecture.webp" alt="OpenTelemetry client-side Architecture"/>
    <figcaption><i>OpenTelemetry client-side architecture</i></figcaption>
</figure>

<br></br>

As you can see from the diagram above, there are two key concepts to understand -

the API  & the SDK.

### The OpenTelemetry API

**The API** is the bare-bones interface for instrumentation and does not provide any implementation. Third-party libraries or vendors can instrument their code using the API.
This is the only part of OpenTelemetry that shared libraries and application logic should
take a direct dependency on.

### The OpenTelemetry SDK

**The SDK** is a complete language library that provides implementations of the API.  The SDK implements the OpenTelemetry API by providing a plug-in framework. When an application starts, an implementation can be loaded by registering a provider for each signal. 

The providers become the receivers of all API calls. When no providers are loaded, the API defaults to a no-op provider. This makes OpenTelemetry instrumentation safe to include in shared libraries. If the application does not use OpenTelemetry, the API calls simply become no-ops and do not incur any overhead.  

OpenTelemetry provides SDK implementations for major languages, as shown below.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/otel_ref_implementations.webp" alt="OpenTelemetry Standard and Implementation Libraries support"/>
    <figcaption><i>OpenTelemetry Standard and Implementation Libraries support</i></figcaption>
</figure>

<br></br>

## Server-Side Architecture:

The server-side architecture is mostly concerned with what to do with the telemetry data which is generated in your application by using the API and SDK. The telemetry data needs to be received, processed, and then sent to the target visualization or storage tools like [SigNoz](https://signoz.io/).

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/traces_combined_with_logs_and_metrics.webp" alt="How Otel fits in an application architecture"/>
    <figcaption><i>How OpenTelemetry fits in the entire application stack - OTel agent sends data to OTel collector from where you can export data to a backend of your choice</i></figcaption>
</figure>

<br></br>

As per the figure, you see three key components:

**On the client side:**

The applications uses an agent ( Auto instrumentation ) to produce telemetry data using zero code instrumentation.

**On the server side:**  

- All the signal data is sent to a **Collector** component which is considered to be the heart of the system. It is optional, but any matured and complex implementation will need an OpenTelemetry collector component in the architecture.

- All the data gets processed via the Collector and then sent to different observability backends. More on Collectors later, but the collector is responsible for **receiving, processing, and sending** the signal data to the target visualization tool.

- Application telemetry data can now be exported to **multiple backends**, depending on the requirements. Also, note that you can plug in various out-of-box **exporters** for any target backend.

For example - *Jaeger backend accepts both jaeger format as well as OTLP format.* 

*But Zipkin needs data in Zipkin format, so Zipkin exporter translates the trace data from OTLP to Zipkin native format. In the diagram , you can also see that we can configure the exporters directly from the agent library without routing the traces via collector, but such implementations are for simplified requirements only.*

## Understanding OpenTelemetry Collectors :

OpenTelemetry Collector is a **vendor-independent agent** that can receive, process, and export telemetry data. It can receive telemetry data in various formats, including OTLP (the native OpenTelemetry protocol), Jaeger, Zipkin, Prometheus, and other formats, including proprietary ones.

The OpenTelemetry Collector then forwards the telemetry it receives to one or more observability backends. It also supports processing and filtering of telemetry data before export, for example, batching data to increase the efficiency of compression or converting between formats, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/09/collector_pipeline.webp" alt="Architecture of OpenTelemetry Collector"/>
    <figcaption><i>Architecture of OpenTelemetry Collector with receivers, processors and exporters.</i></figcaption>
</figure>

## Components in OpenTelemetry Collector

The Collector consists of three components that access telemetry data:

- <a href = "https://opentelemetry.io/docs/collector/configuration/#receivers" rel="noopener noreferrer nofollow" target="_blank" >Receivers</a> — A receiver, which can be push or pull-based, is how data gets into the Collector. Receivers may support one or more <a href = "https://opentelemetry.io/docs/concepts/signals" rel="noopener noreferrer nofollow" target="_blank" >data sources</a>).

- <a href = "https://opentelemetry.io/docs/collector/configuration/#processors" rel="noopener noreferrer nofollow" target="_blank" >Processors</a> — Processors are run on data between being received and being exported. Processors are optional though <a href = "https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor#recommended-processors" rel="noopener noreferrer nofollow" target="_blank" >some are recommended</a>. Processors are very useful when you want to do sampling, enriching, or any additional processing with the telemetry data.

- <a href = "https://opentelemetry.io/docs/collector/configuration/#exporters" rel="noopener noreferrer nofollow" target="_blank" >Exporters</a> — An exporter, which can be push or pull-based, is how you send data to one or more backends/destinations. Exporters may support one or more <a href = "https://opentelemetry.io/docs/concepts/signals" rel="noopener noreferrer nofollow" target="_blank" >data sources</a>. Once the processing is completed, the data can be exported by the Collector to the required destinations.

OpenTelemetry Collector also provides a feature known as pipelines . For a given use case, we can configure a pipeline as below to handle a particular kind of signal.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/otel_collector_pipeline.webp" alt="OpenTelemetry Collector Pipeline"/>
    <figcaption><i>OpenTelemetry Collector Pipeline</i></figcaption>
</figure>

<br></br>

Pipeline defines a path the data follows in the Collector, starting from reception, then further processing or modification, and finally exiting the Collector via exporters. You can chain the processors, and they will get executed in the order of their definition. Everything is configurable.

In the example above, we can configure multiple receivers to feed the data to a set of processors and then export the data to multiple exporters. 

With this, we have come to conclude our topic on the Architecture of OpenTelemetry.

## Conclusion

OpenTelemetry is quietly becoming the world standard for instrumenting cloud-native applications. It is the right choice for instrumentation as it future-proofs your observability set up from any vendor lock-ins. It is also beneficial for companies as onboarding becomes consistent, and with time a good knowledge base can be built.

It is easy to get started with OpenTelemetry. You can check out instrumentation instructions [here](https://signoz.io/docs/instrumentation/). As OpenTelemetry does not provide a backend, you need to choose one which supports OpenTelemetry. An [OpenTelemetry-native APM](https://signoz.io/blog/opentelemetry-apm/) can be a good choice for your observability backend.

SigNoz is a full-stack open source APM that you can use as your OpenTelemetry backend. It provides logs, metrics, and traces under a single pane of glass with intelligent correlation between the telemetry signals.

## Getting started with SigNoz

It is easy to get started with SigNoz. It can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs <a href = "https://docs.docker.com/engine/install" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> on Linux. However, on macOS, you must manually install Docker Engine before running the install script.

```bash
git clone --single-branch --depth 1 <https://github.com/SigNoz/signoz.git>
cd signoz/deploy/
./install.sh
```

You can visit its documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

If you liked what you read, then check out our GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

---

Related Posts

[OpenTelemetry Collector - Complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)

[An open source OpenTelemetry APM - SigNoz](https://signoz.io/blog/opentelemetry-apm/)