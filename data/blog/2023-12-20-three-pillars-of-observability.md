---
title: Three Pillars of Observability [And Beyond]
slug: three-pillars-of-observability
date: 2023-12-20
tags: [OpenTelemetry]
authors: leigh-finch
description: Observability is often defined in the context of three pillars - logs, metrics, and traces. Modern-day cloud-native applications are complex and dynamic. To avoid surprises and performance issues, you need a robust observability stack. But is observability limited to collecting logs, metrics, and traces?...
image: /img/blog/2023/12/3-pillars-of-observability-cover.jpeg
hide_table_of_contents: false
keywords:
  - opentelemetry
  - signoz
  - observability
  - metrics
  - logs
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/three-pillars-of-observability/"/>
</head>

Observability is often defined in the context of three pillars: logs, metrics, and traces. Modern-day cloud-native applications are complex and dynamic. To avoid surprises and performance issues, you need a robust observability stack. But is observability limited to collecting logs, metrics, and traces? How is observability evolving to make our systems more observable?

<!--truncate-->

![Cover Image](/img/blog/2023/12/3-pillars-of-observability-cover.webp)

In this tutorial, we cover:

- [A Brief Overview of Observability](#a-brief-overview-of-observability)
- [Metrics](#metrics)
- [Traces](#traces)
- [Logs](#logs)
- [Beyond the three pillars - Context](#beyond-the-three-pillars---context)
- [Data Visualization - The Critical Component in Observability](#data-visualization---the-critical-component-in-observability)
- [Navigating Observability Maturity in Your Organization](#navigating-observability-maturity-in-your-organization)
- [Conclusion](#conclusion)

## A Brief Overview of Observability

Monitoring tools have been a key part of any enterprise for over 25 years, providing advanced alerts on infrastructure and application issues before they affect customers. As the years progressed, we increased the number of metrics in our monitoring systems for a better understanding of the systems being monitored.

However, as software systems have become more complex, relying solely on metrics for monitoring has its limitations. It often fails to identify unknown variables that could lead to digital experience issues, impacting end-users.

Recently, the concept of 'Observability' has emerged in the industry, marking a shift from traditional monitoring. Unlike the latter, which focuses on predefined metrics, observability emphasizes understanding a system's state at any given time, including both leading and trailing Service Level Indicators. This approach allows for real-time insights into performance problems or errors without being confined to specific metrics. For instance, using an observability tool like [SigNoz](https://signoz.io/) to trace a web request reveals the entire journey and internal operations of the request, providing a more comprehensive view than just measuring server response times. It includes the details of the work being completed (methods, classes, database queries) in the context of a particular request.

The popular three pillars of observability are metrics, traces, and logs.

## Metrics

When examining metrics, they typically represent the state of a specific measure at a given moment. This is crucial for understanding changes over time, as seen in time-series graphs like CPU utilization.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/12/k8s_pods_cpu_util.webp" alt="SigNoz dashboard with K8s Pod CPU utilization"/>
    <figcaption><i>SigNoz dashboard with K8s Pod CPU utilization</i></figcaption>
</figure>
<br/>

Time series graphs were popularised by one of the oldest monitoring tools, called MRTG (Multi-Router Traffic Grapher). MRTG would typically collect data every 5 minutes using SNMP (Simple Network Monitoring Protocol) to graph the utilization of router interfaces. SNMP was then popularised on Linux (and even MS Windows) to collect all kinds of metrics in regular polling intervals. SNMP is still popular but less preferred over newer methods such as agent-based monitoring (including the OTEL Collector), REST APIs, and streaming telemetry.

Two popular types of metrics are related to utilization and saturation. Utilization metrics indicate the percentage of a resource in use, such as CPU and memory utilization or the usage of application server worker threads. Meanwhile, saturation metrics reflect the degree of contention for a resource. For example, a disk queue length indicates the excess workload beyond the disk's processing capacity in a given interval. Here, while utilization might show 100%, saturation reveals the pending workload exceeding the system’s processing ability.

## Traces

Traces offer insights into events over time. In the context of APM and OpenTelemetry, this usually involves embedding libraries into the code or using a profiler/agent to profile applications and runtimes. For an example of integrating Spring Boot with OpenTelemetry and SigNoz for all three pillars of observability, refer to my article on [Spring Boot Monitoring](https://signoz.io/blog/spring-boot-monitoring/).

A typical example of a trace is an HTTP request to a web front end, involving multiple tasks to complete and return a response. Consider an HTTP POST request to add a new pet to an owner's profile. This request encompasses 25 units of work ([Spans](https://signoz.io/blog/distributed-tracing-span/)), each containing detailed attributes about the unit of work, SQL statements, thread IDs, and service details.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/12/sample_http_trace.webp" alt="Sample HTTP Trace"/>
    <figcaption><i>Sample HTTP Trace</i></figcaption>
</figure>
<br/>

While some of this information can be derived from logs, a trace presents these units of work in a contextual and standardized format. Trace visualization like Flamegraphs and Gantt charts make it easy to visualize an entire request as it traverses different components in a complex distributed setup. This approach eliminates the need to comb through multiple servers, containers, and log files to track an individual request, thereby saving hours of work.

## Logs

Logs, the oldest of the three observability pillars, have evolved from basic ‘print’ statements to sophisticated, structured formats. While their inherent flexibility and unstructured nature originally made analysis challenging, modern logging libraries, frameworks, and standards have significantly improved their usability. Tools like SigNoz provide [log pipelines](https://signoz.io/docs/logs-pipelines/introduction/) to transform logs to suit your querying and aggregation needs.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/12/sample_logs_by_traceID.webp" alt="Sample logs aggregated by trace ID"/>
    <figcaption><i>Sample logs aggregated by trace ID</i></figcaption>
</figure>
<br/>

### Enhancing Logs with Context

Frameworks like Logback and Log4J have streamlined the modification of logs for easy consumption by OpenTelemetry and SigNoz, eliminating the need for a separate logging pipeline. For example, Logback's structured fields, attributes, and values can be queried by SigNoz to filter irrelevant data or isolate logs related to specific trace or span IDs.

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/12/sample_logs_by_traceID_and_Logs_ID.webp" alt="Sample log showing trace and span IDs"/>
    <figcaption><i>Sample log showing trace and span IDs</i></figcaption>
</figure>
<br/>

## Beyond the three pillars - Context

Observability has evolved from just the collection and analysis of three pillars of observability - logs, metrics, and traces. “Context” is increasingly recognized as a crucial component in debugging complex distributed systems, complementing the traditional three pillars: metrics, logs, and traces.

Context can be termed as the fourth pillar of observability - correlating different signals and providing more information to the three pillars of observability.

### The Role of Context in Observability

In troubleshooting, context is key. It connects disparate pieces of information from metrics, logs, and traces. This interconnectedness helps in quickly pinpointing issues, understanding their impact, and devising more effective solutions.

Integrating context with three pillars of observability:

1. **Correlated Logs and Traces:** Logs and traces can be correlated by injecting trace and span identifiers. Use the traces to understand the flow of the problematic request and identify where in the journey the issue occurred. Then, delve into the logs for those specific spans or services to gain detailed insights into what went wrong.
2. **Metrics with Context**: Instead of just quantitative data, metrics become more meaningful when combined with context. For instance, a spike in resource usage is more informative when you know which deployment or change triggered it.

The future of Observability is trending towards leveraging AI for rapid data interpretation based on learned patterns to prioritize critical information for SRE and Observability teams while filtering out less essential data. This approach streamlines the focus on the most impactful issues. Furthermore, AI's role extends to automating routine responses to standard events, such as collecting relevant debugging information and restarting services. This automation minimizes the need for human intervention in restoring services, allowing teams to concentrate on Root Cause Analysis (RCA) and preventative strategies.

## Data Visualization - The Critical Component in Observability

Visualization is key in Observability, enabling the transformation of data into a story that's accessible to various audiences. Dashboards should convey essential information to users of all technical levels and subject matter expertise, not just experts.

One of the biggest challenges organizations struggle with is creating dashboards that display every possible piece of information in a single view. If a dashboard needs to be read to understand it, then it is not a dashboard; it is a report.

### Making Dashboards Consumable

Effective dashboards require empathy for the intended audience. For example, an executive probably only wants to know if a service is available and performant, therefore a traffic light may be all that is needed. In contrast, a service owner might benefit from more detailed metrics, such as user count, average performance, and p95 and p99 values, to identify outliers.

> “**Key to effective dashboards: simplicity, readability, and user-centric design.**"

<figure data-zoomable align='center'>
    <img className="box-shadowed-image" src="/img/blog/2023/12/simple_CPU_dashboard.webp" alt="Simple CPU and threads dashboard in SigNoz"/>
    <figcaption><i>Simple CPU and threads dashboard in SigNoz</i></figcaption>
</figure>
<br/>

## Navigating Observability Maturity in Your Organization

Maturity indexes are an efficient way to baseline our applications and services and understand what can be done to reduce the risk of a degraded digital experience. To gauge maturity, we must evaluate the people, processes, and technology associated with a service.

Starting with people, assess the team’s observability skills and the organization's commitment to embedding observability practices.

Processes should reduce reliance on specific individuals, enhancing business or service resilience. For example, a service degradation plan might outline steps to gather information from the three pillars during a transient event.

Technology involves more than just tools; it's about using them to adequately instrument services. For an illustration, consider the article on [Spring boot monitoring](https://signoz.io/blog/spring-boot-monitoring/), which discusses instrumentation using the three pillars.

For each of these elements, we would apply a current state vs. a desired state using the maturity index to help us focus on which services need investment.

## Conclusion

We presented a comprehensive view of the evolving landscape of observability in modern cloud-native applications. It moves beyond the traditional scope of monitoring, highlighting how observability has become more dynamic and interconnected with the inclusion of context as a fourth pillar. The future of observability is seen as increasingly reliant on AI and effective data visualization to make complex data understandable and actionable.

For organizations looking to enhance their digital experience and system reliability, embracing these evolving aspects of observability is crucial. The key is to integrate these practices into their operational culture, ensuring a robust, responsive, and resilient technological ecosystem.

## Further reading

- [Spring Boot Monitoring with Open-Source Tools](https://signoz.io/blog/spring-boot-monitoring/)

- [Using OpenTelemetry Collector Loki Receiver to Send Logs to SigNoz [Code Tutorial]](https://signoz.io/blog/using-opentelemetry-loki-receiver-to-collect-logs/)

- [OpenTelemetry Collector - architecture and configuration guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)
