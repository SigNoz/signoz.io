---
id: introduction
title: Introduction
slug: /
---


SigNoz is an open-source application performance monitoring tool that helps you monitor your applications and troubleshoot problems. SigNoz uses distributed tracing to gain visibility into your software stack.

With SigNoz, you can do the following:

- Monitor application metrics such as latency, requests per second, error rates
- Monitor infrastructure metrics such as CPU utilization or memory usage
- Track user requests across services
- Set alerts on metrics
- Find the root cause of the problem by going to the exact traces which are causing the problem
- See detailed flame graphs of individual request traces


## How Does SigNoz Work?

<!-- Is this accurate? Do we want to add more details? -->

SigNoz collects data using [OpenTelemetry](https://opentelemetry.io/), an open-source observability solution. Therefore, SigNoz supports all the frameworks and languages supported by OpenTelemetry. You can find the complete list of supported languages on the [Instrumentation](https://opentelemetry.io/docs/instrumentation/) page of the OpenTelemetry documentation.

Then, SigNoz aggregates all the collected data, and you use the dashboard to see all the metrics and traces related to your application.

### Architecture

![acrhitecture-diagram-clickhouse](../static/img/architecture-signoz-clickhouse.svg)
SigNoz includes the following components:
- **OpenTelemetry Collector**: Collects telemetry data from your services and applications.
- **ClickHouse**: An open-source, high performance columnar OLAP database management system. 
- **Query Service**: The interface between the front-end and ClickHouse
- **Frontend**: The user interface, built in ReactJS and TypeScript.

To learn more about the architecture of SigNoz, see the [Architecture](/docs/architecture) page.

## Get Started

Perform the following steps to get started with SigNoz and instrument your first application:

<div class="row">
  <article class="col col--6">
    <a class="card margin-bottom--lg padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module cardContainerLink_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" href="/docs/install/">
      <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="1. Install SigNoz">1. Install SigNoz</h2>
      <div class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="Learn how to install SigNoz ">Learn how to install SigNoz</div>
    </a>
  </article>
  <article class="col col--6">
    <a class="card margin-bottom--lg padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module cardContainerLink_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" href="/docs/instrumentation/overview/">
      <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="2. Instrument Applications">2. Instrument Applications</h2>
      <div class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="Learn how to instrument your application">Learn how to instrument your application</div>
    </a>
  </article>
</div>

## Use SigNoz

The topics in this section provide details on using SigNoz to monitor your application.

<div class="row">
 
  <article class="col col--6">
    <a class="card margin-bottom--lg padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module cardContainerLink_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" href="/docs/tutorials">
      <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="1. Tutorials">1. Tutorials</h2>
      <div class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="Tutorials about monitoring your applications and infrastructure<">Tutorials about monitoring your applications and infrastructure</div>
    </a>
  </article>
  <article class="col col--6">
    <a class="card margin-bottom--lg padding--lg cardContainer_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module cardContainerLink_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" href="/docs/operate">
      <h2 class="text--truncate cardTitle_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="2. Operate">2. Operate</h2>
      <div class="text--truncate cardDescription_node_modules-@docusaurus-theme-classic-lib-next-theme-DocCard-styles-module" title="This section explains how to manage SigNoz">This section explains how to manage SigNoz</div>
    </a>
  </article>

</div>

