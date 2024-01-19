---
title: OpenTelemetry vs Datadog - Choosing between OpenTelemetry and Datadog
slug: opentelemetry-vs-datadog
date: 2023-03-09
tags: [OpenTelemetry]
authors: [daniel, ankit_anand]
description: OpenTelemetry and DataDog are both used for monitoring applications. While OpenTelemetry is a set of tools, APIs, and SDKs to generate and collect telemetry data, DataDog is a cloud monitoring service. In this article, we will discuss OpenTelemetry and DataDog to help you...
image: /img/blog/2023/02/opentelemetry_vs_dd_cover-min.jpg
hide_table_of_contents: false
keywords:
  - opentelemetry
  - datadog
  - opentelemetry vs datadog
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-vs-datadog/"/>
</head>

OpenTelemetry and DataDog are both used for monitoring applications. While OpenTelemetry is an open source observability framework, DataDog is a cloud-monitoring SaaS service. OpenTelemetry is a collection of tools, APIs, and SDKs that help generate and collect telemetry data (logs, metrics, and traces).

<!--truncate-->

![Cover Image](/img/blog/2023/02/opentelemetry_vs_dd_cover.webp)

OpenTelemetry does not provide a storage and visualization layer, while DataDog does. If you’re using OpenTelemetry, you need an observability backend like SigNoz or DataDog to visualize and store the collected telemetry data.

So why do you need to use OpenTelemetry at all? DataDog provides agents to instrument applications and can be used as an end-to-end solution. But more and more <a href = "https://tech.ebayinc.com/engineering/why-and-how-ebay-pivoted-to-opentelemetry/" rel="noopener noreferrer nofollow" target="_blank" >companies</a> are moving to OpenTelemetry for their observability setup. There are many reasons why companies are moving to OpenTelemetry.

## Why use OpenTelemetry?

OpenTelemetry is quietly becoming the world standard for instrumenting cloud-native applications. Here are some reasons why people prefer OpenTelemetry over native vendor agents:

- **Part of the CNCF landscape**<br></br>
OpenTelemetry is part of the <a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >Cloud Native Computing Foundation</a>, so it would work well with other tools in the CNCF landscape. It is the second most active project after Kubernetes.

- **No vendor lock-in**<br></br>
If you use OpenTelemetry, you can avoid vendor lock-ins with SaaS services. The data collected by OpenTelemetry can be sent to multiple backends. Most observability vendors support the OTLP data format.

- **Future-proof instrumentation**<br></br>
OpenTelemetry has a wide community working on it to support the instrumentation of a wide range of libraries, frameworks, and languages. If you use an instrumentation SDK from a vendor, you are susceptible to the vendor’s support of emerging technologies.

- **Company knowledge base and easy onboarding**<br></br>
Using OpenTelemetry, you can have a standard observability setup in place at your company. Over time, the knowledge base will improve, and it will be easier to onboard new members of the observability team. In case the team decides to switch the vendor, it is easy to make configuration changes for the backend.

In an observability stack, the instrumentation layer is most tightly coupled with your application as it involves code changes. Using OpenTelemetry, you can have peace of mind about having standardized observability set up in place.

## Key Differences between OpenTelemetry and DataDog

Let us explore the key differences between OpenTelemetry and Datadog.

### Data Collection

OpenTelemetry provides language-specific client libraries and SDKs for instrumenting applications, services, and infrastructure. The OpenTelemetry client libraries can be used to collect telemetry data from applications written in various programming languages, and they provide a vendor-neutral, standardized way to collect and export telemetry data.

On the other hand, Datadog relies on its own agent to collect data from applications, infrastructure, and other services. The Datadog agent can be installed on hosts, containers, and other environments to collect metrics, traces, and logs.

### Customization and flexibility

OpenTelemetry is an open-source framework, meaning developers can access and customize the source code to meet their specific needs. This makes it easier for developers to integrate OpenTelemetry into their existing systems and workflows.

In contrast, Datadog is a closed-source platform with limited customization options. While it offers a wide range of integrations with other tools and services, it can be more challenging for developers to modify and adapt Datadog to their specific needs. This can be a limiting factor for teams that require a high degree of flexibility and customization in their observability practices.

### Data Storage

OpenTelemetry does not provide any data storage capabilities on its own. Instead, you need to choose an observability backend to store and analyze the telemetry data collected by OpenTelemetry.

In contrast, Datadog provides a comprehensive cloud-based platform that includes built-in data storage capabilities. This means you can use Datadog for data collection and storage, eliminating the need for a separate observability backend.

### Integration with other tools

One of the key advantages of OpenTelemetry is its vendor-neutral approach, which allows users to send data to any observability backend of their choice. This provides users with greater flexibility and the ability to customize their observability stack according to their needs.

On the other hand, DataDog is a closed SaaS platform that provides its own set of APIs and SDKs to collect and analyze telemetry data. While it offers integrations with various third-party tools and services, it is not as flexible as OpenTelemetry.

### Community

OpenTelemetry is a <a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >CNCF</a> project, which means it is an open-source project with a thriving community of contributors and users. Community support means that developers can access a wealth of resources, including documentation, tutorials, and support forums, to help them adopt and use OpenTelemetry effectively.

On the other hand, while DataDog offers support to its users, most of it is paid support. This means that developers may have limited resources available to them if they encounter issues or need help using DataDog. However, DataDog offers various paid support options, including phone and email support, as well as a knowledge base and community forums.

Now that we have discussed the differences, it’s time to answer what to choose between OpenTelemetry and DataDog. DataDog also provides support for OpenTelemetry. But the extent of this support is debatable. There has been some recent controversy regarding DataDog’s support of OpenTelemetry codebase.

[![Hacker news OTel vs Datadog](/img/blog/2023/02/dd_kills_otel_pr.webp)](https://news.ycombinator.com/item?id=34540419)

Since OpenTelemetry does not provide a backend, the question really is to choose between an OpenTelemetry native APM and DataDog.

## Choosing between an OpenTelemetry APM and DataDog

An OpenTelemetry native APM support OTLP data format natively and treats OTel data format as its primary format for ingestion. SigNoz is an open source observability platform that supports OpenTelemetry [natively](https://signoz.io/blog/opentelemetry-apm/). Its [architecture](https://signoz.io/docs/#architecture) involves OpenTelemetry client libraries and OpenTelemetry collectors to generate and collect telemetry data.

Some of the key reasons to choose SigNoz are:

- Out-of-the-box charts for application metrics like p90, p99, latency, error rates, request rates, etc.
- Distributed tracing to get end-to-end visibility of your services
- Monitor any metrics important to you, build dashboards for specific use-cases
- Logs Management equipped with a powerful search and filter query builder
- Exceptions monitoring to track exceptions in your application
- Easy to set alerts with DIY query builder
- Native support for OpenTelemetry native
- It can be self-hosted

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

**Related Posts**

**[SigNoz vs Datadog](https://signoz.io/comparisons/signoz-vs-datadog/)**<br></br>

**[SigNoz - an open source alternative to Datadog](https://signoz.io/blog/open-source-datadog-alternative)**<br></br>