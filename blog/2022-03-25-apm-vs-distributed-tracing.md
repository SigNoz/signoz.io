---
title: How Distributed Tracing augments the APM experience?
slug: apm-vs-distributed-tracing
date: 2022-03-25
tags: [Distributed Tracing]
authors: ankit_anand
description: There are standalone distributed tracing tools like Jaeger, and there are APM tools that do not provide distributed tracing capabilities. In this article, we will see how distributed tracing complements an APM tool for a holistic performance monitoring experience.
image: /img/blog/2022/03/apm_vs_distributed_tracing_cover.webp
hide_table_of_contents: false
keywords:
  - distributed tracing
  - apm
  - application performance monitoring
  - application performance management
  - distributed tracing in microservices
  - microservices
  - traces
  - open source
  - signoz
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/apm-vs-distributed-tracing/"/>
</head>

There are standalone distributed tracing tools like Jaeger, and there are APM tools that do not provide distributed tracing capabilities. In this article, we will see how distributed tracing complements an APM tool for a holistic performance monitoring experience.

<!--truncate-->

![Cover Image](/img/blog/2022/03/apm_vs_distributed_tracing_cover.webp)

Both APM and distributed tracing are critical tools to understand the performance of your applications. And if your application is facing performance issues impacting customer experience, you need to understand what’s causing it **fast**.

The goal of both APM and distributed tracing tools should thus be to help you understand performance issues in your application as quickly as possible.

> **APM vs. Distributed Tracing** <br></br>
> APM vs. Distributed Tracing is not a meaningful comparison. Most applications have some kind of APM tool in place. APM tools have a number of features that help developers track application performance. Distributed tracing is a specific technology to track how user requests are performing in a distributed system like a microservices-based application.


Let’s have a brief overview of APM and distributed tracing.

## What is APM?

APM stands for Application Performance Management or Application Performance Monitoring. You may wonder, what’s the difference? The term ‘management’ can signify a proactive approach, and the term monitoring can signify a reactive approach. But it doesn’t matter as long as the organization using APM can keep their application performance in check.

Some of the common capabilities of APM are as follows:

- Track application latency
- Track error rates
- Track request rates, top endpoints, external and DB calls

Apart from application metrics, some APM tools can also provide host, infrastructure, and network metrics. There is no end to what can be captured in terms of data, but the real value addition is to enable application owners to stay ahead of any potential performance issues.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="Metrics dashboard in SigNoz APM"
    height={500}
    src="/img/blog/2022/03/apm_vs_dt_metrics.webp"
    title="APM tools can measure application metrics like application latency, requests per sec, error percentage, etc. (Source: SigNoz dashboard)"
    width={700}
/>

## What is Distributed Tracing?

Distributed tracing is a technology that tracks user requests across services, networks, and protocols and creates a complete picture of how your distributed system performed while processing a user request. It is the best-suited technology for analyzing application performance in distributed systems like microservices, serverless, and lambda.

In modern-day cloud-native applications, a single user request triggered at the frontend web or mobile client can go through hundreds or thousands of services before serving the user what they need. As a result, it’s almost impossible for a single team to keep track of everything that happens to a user request. That’s where distributed tracing comes into the picture.

[Read our complete guide on Distributed Tracing](https://signoz.io/distributed-tracing/)

Distributed tracing works by passing by context object along the execution path of a user request. The context ID correlates a user request across network boundaries, processes, and protocols.

The data collected by distributed tracing is known as trace data. Trace data can be visualized in different formats to give you an idea of how the components of your application architecture interacted to process a user request.

Common visualization formats include Flamegraphs and Gantt Charts.

<Screenshot
    alt="Tracing data is often visualized in the form of Flamegraphs and Gantt Charts"
    height={500}
    src="/img/blog/2022/03/flamegraphs_gantt_charts_dt.webp"
    title="Tracing data visualized as Flamegraph and Gantt chart. (Source: SigNoz dashboard)"
    width={700}
/>

Tracing data visualized as Flamegraph and Gantt chart. (Source: SigNoz dashboard)

## APM and Distributed Tracing

Although there are standalone distributed tracing tools like Jaeger, you need an integrated experience of APM and distributed tracing. Engineering bandwidth is costly, and although bugs can’t be avoided, they should be resolved as fast as possible.

An APM tool that also provides the capability to implement distributed tracing can reconstruct an end-to-end picture of a distributed system like a microservices-based application.

For example, let’s suppose that you notice high latency in one of your services during a particular duration. You will need to dig deeper at that timestamp to identify the bottlenecks. In an APM tool that also provides distributed tracing, the tracing data is correlated with application metrics.

<Screenshot
    alt="Correlation of application metrics with tracing data helps in quick debugging"
    height={500}
    src="/img/blog/2022/03/apm_vs_dt_high_latency_point.webp"
    title="You can click on ‘View Traces` to see the tracing data at a timestamp of high latency. (Source: SigNoz dashboard)"
    width={700}
/>

You can click on `View Traces` to see the tracing data at a timestamp of high latency. (Source: SigNoz dashboard)

Once you access the tracing data, you can identify the exact events that caused the latency issues. Distributed tracing makes the root cause analysis of performance issues much quicker.

<Screenshot
    alt="Trace dashboard in SigNoz"
    height={500}
    src="/img/blog/2022/03/dt_traces_tab.webp"
    title="Tracing data as shown in SigNoz dashboard. With the help of filters, you can quickly identify the exact events that are causing latency issues."
    width={700}
/>

For microservices-based applications, it is critical for application owners to see how a specific event fits in the scheme of its entire user request. Tracing data in the form of Flamegraphs and Gantt charts can give you that picture. 

APM gives you application metrics that when combined with distributed tracing can empower engineering teams to troubleshoot complex issues quickly.

## Getting started with APM and Distributed Tracing

[SigNoz](https://signoz.io/) is an open-source full-stack APM tool that provides both application metrics and distributed tracing. It is built to support <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> natively, which is emerging as the default instrumentation layer for generating telemetry data in cloud-native applications.

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

## Further Reading

**Examples of Distributed Tracing**

[Implementing Distributed Tracing in a Java application](https://signoz.io/blog/distributed-tracing-java/)

[Implementing Distributed Tracing in a Nodejs application](https://signoz.io/blog/distributed-tracing-nodejs/)

**More articles on Distributed Tracing**

[Complete Guide on Distributed Tracing](https://signoz.io/distributed-tracing/)

[Spans - a key concept of Distributed Tracing](https://signoz.io/blog/distributed-tracing-span/)

[Context Propagation in Distributed Tracing](https://signoz.io/blog/context-propagation-in-distributed-tracing/)
