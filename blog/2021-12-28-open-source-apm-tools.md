---
title: Top 13 open source APM tools in 2022
slug: open-source-apm-tools
date: 2022-08-21
tags: [Tech Resources]
authors: ankit_anand
description: Latest top open source APM tool list - 1.SigNoz 2.Graphite 3.Pinpoint 4.Prometheus 5.JavaMelody 6.StageMonitor 7.Scouter 8.Zipkin 9.Jaeger 10.Skywalking...
image: /img/blog/2021/12/open_source_apm_2022.webp
hide_table_of_contents: true
keywords:
  - Open Source
  - Open Source apm tools
  - APM tools
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/open-source-apm-tools/"/>
</head>

Choosing the right APM tool is critical. How do you know which is the right one for you? Here are the top 13 open source application performance monitoring(APM) tools which can solve your monitoring needs.

<!--truncate-->

![Cover Image](/img/blog/2021/12/open_source_apm_2022.webp)

> **What is an open source APM tool?**<br></br>
> APM stands for Application Performance Monitoring. APM tools help you to monitor your application for any performance issues. When you opt for an open source APM tool, you get the added advantage of having access to the tool's source code.

Businesses are embracing digital transformation now more than ever. In most cases, the digital channel is the primary driver of revenue and growth. Customers and end-users are going online to fulfill both their daily and long-term needs.

The digital shift has made the app production environment a critical piece of an organization's success. The performance of your application in production needs to be monitored to ensure high availability at all times. Not only that, but organizations also need to monitor any latency issues in serving user's requests. As they say, "**Slow is the new down**" in today's competitive digital landscape.

This has led to the birth of a number of application performance monitoring tools. Open source APM tools have added benefits over their SaaS counterparts as the source code is available to your org's developers.

**Benefits of Open Source APM tool over SaaS APM tools:**

- **Customization** - You can customize the tool's source code to suit your needs.

- **Self-hosting** - You don't need to send your data outside your environment. With privacy laws becoming more stringent, this might be the future of APM tools.

- **Data Privacy and control** - When you use a self-hosted open source apm, you don't have to send any data outside your infra. This gives user more control over their data. You don't have to worry about sending any PII data to third party tools.

- **Developer First** - Your org's developers can look under the hood of an open source APM tool. They can decide for themselves whether the tool meets their requirements or not.

- **Community support** - Open source tools have active communities around them. Communities ensure code accountability and support. You can directly influence a product's roadmap by raising GitHub issues.

But first, let's understand what is application performance monitoring and why is it needed?

## What is application performance monitoring(APM)?

Application performance monitoring is the process of keeping your app's health in check. APM tools enable you to be proactive about meeting the demands of your customers. Some of the top metrics that APM tools monitor are application latency, error rate, and requests per second.

## Why is application performance monitoring(APM) needed?

A robust APM tool can provide your engineering teams the much-needed visibility and context into the inner workings of your application. Modern distributed systems have enabled scale at a global scale but at the same time have increased the complexity of an application.

A few essential APM benefits in solving performance issues are as follows:

- Gives a **centralized context and visibility** into the app's inner workings across a distributed system
- Allows you to **proactively identify issues** that can cause breakdown and solves latency issues
- Helps you to **meet end-user expectations** and demands
- **Increase revenue** by protecting against downtime and user churn
- **Saves engineering bandwidth** in debugging and troubleshooting

**List of top 13 open source APM tools in 2021**

- [SigNoz](#signoz)
- [Graphite](#graphite)
- [Pinpoint](#pinpoint)
- [Prometheus](#prometheus)
- [Javamelody](#javamelody)
- [Stagemonitor](#stagemonitor)
- [Scouter](#scouter)
- [Zipkin](#zipkin)
- [Jaeger](#jaeger)
- [Apache Skywalking](#apache-skywalking)
- [Elastic APM](#elastic-apm)
- [App Metrics](#app-metrics)
- [Glowroot](#glowroot)

## Top Open Source APM Tools

Now let's explore the top 13 open source APM tools in 2021.

### SigNoz

🌐 [Website](https://signoz.io/)

💻 [GitHub](https://github.com/SigNoz/signoz)

SigNoz is a full-stack open source APM and observability tool. SigNoz provides logs, metrics, and traces under a single dashboard. Logs, metrics, and traces are considered to be the three pillars of observability in modern-day distributed systems. Using SigNoz, you can track things like:

- User requests per second
- 50th, 90th, and 99th percentile latencies of microservices in your application
- Error rate of requests to your services
- Slow endpoints in your application
- User requests across different microservices using distributed tracing

Without distributed tracing, you can not monitor and troubleshoot user requests across multiple services. As SigNoz supports distributed tracing, you can have code-level visibility of where your user requests are failing. That's why SigNoz is most suited as an open source APM tool for microservices-based application architectures.

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="SigNoz Architecture Diagram"
   height={500}
   src="/img/architecture-signoz-clickhouse.svg"
   title="SigNoz Architecture with ClickHouse as storage backend"
   width={700}
/>

SigNoz is built to support OpenTelemetry natively. OpenTelemetry is quietly becoming the world standard to instrument cloud-native applications. It provides a vendor-agnostic method to generate and collect telemetry data. Hence, you are never locked into any tool and have better control of your telemetry data.

SigNoz provides out-of-box charts for application metrics, making it easier for you to get started.

<Screenshot
   alt="SigNoz Dashboard showing RED metrics"
   height={500}
   src="/img/blog/common/signoz_charts_application_metrics.webp"
   title="Capture RED metrics (Rate of requests, Error rate and Duration) and visualize it with SigNoz"
   width={700}
/>

SigNoz provides flamegraphs and gantt charts to visualize your tracing data.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Flamegraphs and Gantt Charts to visualize traces"/>
    <figcaption><i>Traces visualized with flamegraphs and gantt charts</i></figcaption>
</figure>

<br></br>

You can also use logs management in SigNoz to debug application issues.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Logs in SigNoz"/>
    <figcaption><i>With log management, you have everything under a single dashboard to debug application performance issues.</i></figcaption>
</figure>

<br></br>

<!-- You can choose between industry-standard Kafka+Druid or fast OLAP database ClickHouse as the storage backend. The query service is written in GO, and the frontend is built with Typescript. -->

You can get started with SigNoz by visting its documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=open_source_apm_tools)

### Graphite

🌐 <a href = "https://graphiteapp.org/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/graphite-project/graphite-web" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Graphite is a time-series monitoring tool that was released in 2008. Graphite consists of three software components:

- **carbon -** a service that listens for time-series data
- **whisper -** a database library for storing time-series data
- **graphite-web -** Graphite's user interface & API for rendering graphs and dashboards

The primary purpose of Graphite is to store numeric time-series data and render graphs of this data. Time-series data is a sequence of data points for a particular metric indexed over time. It can give you insights into the performance of any application, process, or service.

Graphite does not do data collection. Instead, your app needs to be configured to send data to Graphite which passively listens for data using Carbon - a Twisted daemon. Carbon then sends the data to Whisper to store the time-series data to a filesystem.

<Screenshot
   alt="Graphite architecture"
   height={500}
   src="/img/blog/2021/07/Graphite-architecture-min.webp"
   title="Graphite Architecture (Source: Graphite documentation)"
   width={700}
/>

Graphite comes with an in-built UI, but that is fairly basic. Usually, for visualizations, Graphite is clubbed together with Grafana, which is an open source visualization tool.

<Screenshot
   alt="Graphite APM tool dashboard"
   height={500}
   src="/img/blog/2021/07/graphite_dashboard-min.webp"
   title="Graphite's UI (Source: [Nuxeo](https://doc.nuxeo.com/nxdoc/metrics/))"
   width={700}
/>

### Pinpoint

🌐 <a href = "https://pinpoint-apm.github.io/pinpoint/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/pinpoint-apm/pinpoint" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Pinpoint is an open source APM tool meant for large-scale distributed systems written in Java, Python, or PHP. This project is inspired and modeled after Google's Dapper. It traces transactions across different components of an application and provides insights to identify potential issues. Some of the key features of the Pinpoint APM tool includes:

- Application topology at a glance
- Real-time application monitoring
- Code-level visibility to every transaction
- APM agents which require minimal changes to code
- Minimal impact on performance

<Screenshot
   alt="Pinpoint APM tool architecture"
   height={500}
   src="/img/blog/2021/07/pinpoint-architecture-min.webp"
   title="Architecture of Pinpoint (Source: Pinpoint Documentation)"
   width={700}
/>

The main purpose of the Pinpoint APM tool is to identify and track how transactions flow between different components of a system. It does not track logs and metrics.

<Screenshot
   alt="Pinpoint dashboard"
   height={500}
   src="/img/blog/2021/07/pinpoint-dashboard-min.webp"
   title="Pinpoint Dashboard (Source: Pinpoint documentation)"
   width={700}
/>

### Prometheus

🌐 <a href = "https://prometheus.io/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/prometheus/prometheus" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Prometheus enables you to capture time-series data as metrics. These metrics can be aggregated to give insights into the behavior of our systems.

It was initially developed at SoundCloud in 2012 before being released as an open-source project. It was the second project to graduate from CNCF after Kubernetes.

Prometheus monitoring stack includes the following components:

- Prometheus server
- Client Libraries & Exporters
- Push Gateway
- Alertmanager
- Visualization Layer

<Screenshot
   alt="Prometheus APM tool architecture"
   height={500}
   src="/img/blog/2021/07/Prometheus_architecture-min.webp"
   title="Prometheus Architecture (Source: Prometheus Documentation)"
   width={700}
/>

Prometheus does not do distributed tracing but can be used effectively to monitor time-series data as metrics. It also has some limitations at scale as it is designed for a single machine.
The visualization layer of Prometheus is basic, but it is generally used with Grafana, a visualization tool to create charts and graphs.

<Screenshot
   alt="Prometheus Expression Browser"
   height={500}
   src="/img/blog/2021/07/prom_exp_browser-min.webp"
   title="Prometheus Expression Browser"
   width={700}
/>

<Screenshot
   alt="Grafana dashboard visualizing Prometheus metrics"
   height={500}
   src="/img/blog/2021/07/prometheus_grafana-min.webp"
   title="Grafana used for visualization with Prometheus"
   width={700}
/>

### Javamelody

💻 <a href = "https://github.com/javamelody/javamelody" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Javamelody is an open source APM tool that aims to monitor Java or Java EE applications in QA and production environments. It is mainly used to track and measure the statistics of requests on an application based on its usage.

Some of the key metrics captured by the Javamelody APM tool are as follows:

- Number of executions, mean execution time
- percentage of errors of HTTP requests, SQL requests, JSF actions, struts actions
- Java memory usage and CPU usage
- Number of user sessions
- Number of JDBC connections

<Screenshot
   alt="Charts shown on JavaMelody dashboard"
   height={500}
   src="/img/blog/2021/07/javamelody_ui-min.webp"
   title="Charts provided by Javamelody APM tool (Source: Javamelody GitHub repo)"
   width={700}
/>

### Stagemonitor

🌐 <a href = "https://www.stagemonitor.org/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/stagemonitor/stagemonitor" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Stagemonitor is an open source APM tool for Java server applications. It enables you to monitor the performance of your Java web app throughout its lifecycle in development, QA, and production. It monitors applications with the help of servlet filters and bytecode manipulation.

Stagemonitor integrates well with time-series databases like ElasticSearch, Graphite, and InfluxDB to analyze graphed metrics and Kibana to analyze requests and call stacks.

Some of the key features of Stagemonitor APM tool includes:

- Development-time Monitoring
- Production Monitoring
- Preconfigured Dashboards

<Screenshot
   alt="Architecture diagram of Stagemonitor APM tool"
   height={500}
   src="/img/blog/2021/07/stagemonitor_architecture-min.webp"
   title="Stagemonitor architecture (Source: Stagemonitor GitHub repo)"
   width={700}
/>

### Scouter

💻 <a href = "https://github.com/scouter-project/scouter" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Scouter is an open source APM tool written in Java, Javascript, and Scala. It captures and shows metrics about users, services, and resources. Some of the key metrics that Scouter captures:

- Users - active users and recent users
- Services - Active service, TPS, Response time, Application profiles
- Resources - Cpu, Memory, Network and Heap usage, Connection pools, etc.

<Screenshot
   alt="Architecture diagram of Scouter APM tool"
   height={500}
   src="/img/blog/2021/07/scouter_architecture-min-1.webp"
   title="Scouter Architecture (Source: Scouter GitHub repo)"
   width={700}
/>

Scouter's architecture consists of the following components:

- Server also called Collector to process data transferred by the host
- Host Agent to capture metrics for CPU, Memory, Disk performance
- Java Agent to capture performance data of the Java program such as heap memory, thread, profiles
- Client(Viewer) to visualize collected data

<Screenshot
   alt="Charts visualized with Scouter APM"
   height={500}
   src="/img/blog/2021/07/scouter_ui-min.webp"
   title="Scouter UI (Source: Scouter GitHub repo)"
   width={700}
/>

### Zipkin

🌐 <a href = "https://zipkin.io/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/openzipkin/zipkin" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Zipkin is an open source APM tool used for distributed tracing. Zipkin captures timing data need to troubleshoot latency problems in service architectures. In distributed systems, it's a challenge to trace user requests across different services. If a request fails or takes too long, distributed tracing helps to identify the events that caused it.

Zipikin was initially developed at Twitter and drew inspiration from Google's Dapper. Unique identifiers called Trace ID are attached to each request which then identifies that request across services.

Zipkin's architecture includes:

- Reporters to send data to Zipkin
- Collectors which persist trace data to storage
- API to query data
- UI

<Screenshot
   alt="Zipkin architecture diagram"
   height={500}
   src="/img/blog/2021/07/Zipkin_architecture-min.webp"
   title="Zipkin architecture (Source: Zipkin website)"
   width={700}
/>

Zipkin's in-built UI is limited, and you can use Grafana or Kibana from the ELK stack for better analytics and visualizations.

<Screenshot
   alt="Zipkin dashboard showing traces"
   height={500}
   src="/img/blog/2021/07/Zipkin_ui-min.webp"
   title="Zipkin UI (Source: Zipkin's GitHub repo)"
   width={700}
/>

It also includes a dependency diagram that shows how many user requests went through each service. It can help you to identify error paths and calls to deprecated services.

<Screenshot
   alt="Zipkin dependency diagram to show user requests across services"
   height={500}
   src="/img/blog/2021/07/zipkin_dependency_diagram-min.webp"
   title="Zipkin dependency diagram (Source: GitHub repo)"
   width={700}
/>

### Jaeger

🌐 <a href = "https://www.jaegertracing.io/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/jaegertracing/jaeger" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Jaeger is an open source APM tool developed at Uber, which was later donated to Cloud Native Computing Foundation(CNCF). Inspired by Google's Dapper, Jaeger is a distributed tracing system.

It is used for monitoring and troubleshooting microservices-based distributed systems. Some of its key features include:

- Distributed context propagation
- Distributed transaction monitoring
- Root cause analysis
- Service dependency analysis
- Performance / latency optimization

<Screenshot
   alt="Architecture diagram of Jaeger APM"
   height={500}
   src="/img/blog/2021/07/jaeger_architecture-min.webp"
   title="Jaeger Architecture (Source: Uber Engineering)"
   width={700}
/>

Jaeger supports two popular open source NoSQL databases as trace storage backends: Cassandra and Elasticsearch. Jaeger's UI can be used to see individual traces. You can also filter the traces based on service, duration, and tags.

<Screenshot
   alt="Jaeger UI"
   height={500}
   src="/img/blog/2021/07/jaeger_ui-min.webp"
   title="Jaeger UI showing list of filtered traces"
   width={700}
/>

### Apache Skywalking

🌐 <a href = "https://skywalking.apache.org/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/apache/skywalking" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

This open source APM tool is focused on monitoring distributed systems, including microservices, cloud-native, and container-based architectures. Some of the key features of the APM tool includes:

- Service, service instance, endpoint metrics analysis
- Root cause analysis with code profiling
- Service topology map analysis
- Slow services and endpoint detection
- Distributed tracing and context propagation

Skywalking also supports the collection of telemetry data in multiple formats.

<Screenshot
   alt="Skywalking dashboard"
   height={500}
   src="/img/blog/2021/07/skywalking_ui-min.webp"
   title="Skywalking dashboard (Source: Skywalking website)"
   width={700}
/>

### Elastic APM

🌐 <a href = "https://www.elastic.co/apm/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/elastic/apm-server" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

You might already be familiar with Elasticsearch. Elastic APM is an open source application performance monitoring tool built on top of the ELK stack (Elasticsearch, Logstash, Kibana). It consists of 4 main components:

- APM agents - These are open source libraries installed in your services for collecting performance data.
- APM server -It is a separate component that is free and open source. It receives performance data from the APM agents. The APM server validates and processes events from the APM agents.
- Elasticsearch - It is used to store the APM performance metrics.
- Kibana - It is a visualization platform designed to work with Elastsearch.

<Screenshot
   alt="Elastic APM architecture diagram"
   height={500}
   src="/img/blog/2021/07/elastic_apm_architecture-min.webp"
   title="Elastic APM architecture (Source: Elastic APM documentation)"
   width={700}
/>

With Kibana, you can have visualize your requests and services.

<Screenshot
   alt="Service maps on Elastic APM dashboard"
   height={500}
   src="/img/blog/2021/07/elasticapm_servicemaps-min.webp"
   title="Service Maps in Elastic APM (Source: Elastic APM website)"
   width={700}
/>

### App Metrics

🌐 <a href = "https://www.app-metrics.io/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/AppMetrics/AppMetrics" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

App Metrics is an open source and cross-platform .NET library that can be used to capture application metrics within any .NET application. App Metrics provides extensions to report to various open source time-series databases. It also provides dashboards to visualize application metrics in real-time. Some of the key features of this open source APM tool includes:

- Track metrics for any type of .NET applications
- Measure the performance and error of each endpoint in an MVC or Web API project
- Freedom to choose where to persist captured metrics and which dashboard tool to use for visualization

App Metrics does not include a visualization tool, but it does provide App Metrics specific Grafana dashboards.

<Screenshot
   alt="Grafana charts for visualization of App Metrics"
   height={500}
   src="/img/blog/2021/07/app-metrics-dashboard-min.webp"
   title="App Metrics dashboard using Grafana (Source: App Metrics website)"
   width={700}
/>

### Glowroot

🌐 <a href = "https://glowroot.org/" rel="noopener noreferrer nofollow" target="_blank" >Website</a>

💻 <a href = "https://github.com/glowroot/glowroot" rel="noopener noreferrer nofollow" target="_blank" >GitHub</a>

Glowroot is an open source Java APM tool. It is used to monitor Java-based applications. Glowroot can be implemented in two ways:

- With embedded collectors that can be used to monitor stand-alone applications
- With central collector that can be used to monitor distributed systems

<Screenshot
   alt="Glowroot architecture diagram"
   height={500}
   src="/img/blog/2021/07/glowroot-architecture-min.webp"
   title="Glowroot architecture"
   width={700}
/>

Glowroot agents help to capture metrics like:

- API’s average response time
- The average time taken by DB queries
- Trace capture for slow requests and errors
- Continuous profiling

## How to choose the right open source APM tool for you?

Choosing the right open source APM tool is critical to your team's ability to monitor and troubleshoot issues in your deployed application. If you are going for an open source tool, you must ensure that the tool is being actively developed on GitHub. You can ask yourself the following questions before choosing any open source tool:

- How recent was the last commit made?
- Are the maintainers of the repo responsive?
- How active is the community around the tool?
- Is the tool based on the latest industry-standard components?

But this is just one aspect. Another aspect is whether the tool serves all your needs for application monitoring or not. You don't want your team to manage multiple tools for end-to-end visibility into the performance of your apps.

Logs, metrics, and traces form the three cornerstones of full-stack APM tools. In that scenario, a tool like [SigNoz](https://github.com/SigNoz/signoz) can serve all your needs for application monitoring. As the instrumentation is based on OpenTelemetry, you also have the added advantage of not being locked into any product.

## Getting started with SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=open_source_apm_tools)

You can check out SigNoz's GitHub repo here 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you want to read more about SigNoz 👇

[Golang Application Performance Monitoring with SigNoz](/blog/monitoring-your-go-application-with-signoz/)

[Nodejs Application Performance Monitoring with SigNoz](/blog/nodejs-opensource-application-monitoring/)
