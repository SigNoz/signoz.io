---
title: Launching support for ClickHouse as storage backend for SigNoz
slug: clickhouse-storage-monitoring
date: 2021-06-16
tags: [Product Updates, Database Monitoring]
authors: ankit_anand
description: In this article, we dig deeper into why we decided to extend support for ClickHouse as a storage backend for SigNoz and the efficiency gains we achieved using it.
image: /img/blog/2021/06/clickhouse_support_cover_hc.webp
keywords:
  - ClickHouse database
  - Open Source
  - Open source database
  - OLAP databases
  - kafka
  - Druid
---

In this article, we dig deeper into why we decided to extend support for ClickHouse as a storage backend for SigNoz and the efficiency gains we achieved using it.

<!--truncate-->

![Cover Image](/img/blog/2021/06/clickhouse_support_cover_hc.webp)

### What is SigNoz?

SigNoz is an open-source alternative to DataDog, New Relic etc. It is a full-stack application monitoring and observability platform, which can be used to track both metrics and traces. Link to our GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

### Launching support for ClickHouse

In our [latest release](https://github.com/SigNoz/signoz) `v0.3.1` , we launched support for ClickHouse as storage backend for SigNoz. ClickHouse is a column-oriented database management system (DBMS) for online analytical processing of queries (OLAP). Now when you install SigNoz, you will have the option to choose between ClickHouse or Kafka + Druid as a database system.

![choose clickhouse](/img/blog/2021/06/clickhouse_choose_setup_hc.webp)

Users can choose between ClickHouse or Kafka + Druid for their storage system of choice while installing SigNoz
In this article, let's dig deeper into why we decided to introduce support for ClickHouse as a database storage system and how our users can benefit from it.

## Community demands for ClickHouse

As an open-source software, we build what our community wants. We listened to [demands](https://github.com/SigNoz/signoz/issues/22) from our community for supporting ClickHouse as a storage backend.

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/06/Clickhouse_community_demands_hc.webp" alt="Community demands for ClickHouse support"/>
    <figcaption><i>Issue raised on our GitHub repo demanding ClicHouse support</i></figcaption>
</figure>

<br></br>

As a storage backend, ClickHouse is less resource-intensive than using Kafka + Druid. It makes getting started with SigNoz much quicker, and users can now try out SigNoz on their local machine easily as the entire setup takes **less than 1.5GB of memory space.**

## Why ClickHouse for SigNoz?

### Improvements in installation time

One of the key focus area of our engineering team is to make trying out SigNoz as simple as possible. Extending support for ClickHouse as a database is part of one such initiative.

As we are self-hosted and open source, you can try SigNoz out in a matter of a few minutes to understand how it can help you with performance monitoring.

You can get started with SigNoz with just three commands at your terminal:

    $ git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
    $ cd signoz/deploy/
    $ ./install.sh

You can then proceed with either ClickHouse or Kafka+Druid installation set up. On a macOS 2017 model with 8 GB RAM, following were the installation times in seconds for the two set ups:

- ClickHouse set up: _93.99 seconds_
- Kafka + Druid set up: _269.25 seconds_

So in just over a minute, you will be able to access our dashboard with the ClickHouse set up on your local host.

![Dashboard of SigNoz](/img/blog/2021/06/signoz_ui-1.webp)

<!--- Track metrics & use traces to monitor app performance with SigNoz --->

### Improvements in memory usage

Let's analyse the performance of ClickHouse and Kafka+Druid set ups with `docker stats` command. The `docker stats` command displays a live data stream with CPU, memory usage, memory limit, block I/O, and network IO metrics for all the running containers.

![memory usage](/img/blog/2021/06/docker_stats_clickhouse_final.webp)

<!--- Memory usage stats snapshot with ClickHouse installation --->

Total memory usage with ClickHouse set up: 340.391 MiB

![memory usage](/img/blog/2021/06/docker_stats_kafka_final.webp)

<!--- Memory usage stats snapshot with kafka + Druid installation --->

Total memory usage with Kafka + Druid set up: 2,896.82 MiB

As we can see, the ClickHouse set up uses about **8.5x less memory** than the Kafka + Druid set up for getting started with SigNoz. It makes trying out SigNoz much easier for developers even on their local machine.

## SigNoz architecture with ClickHouse

![architecture of SigNoz with ClickHouse](/img/blog/2021/06/architecture-signoz-clickhouse-1.webp)

<!--- SigNoz Architecture with ClickHouse as storage backend --->

With ClickHouse as the storage backend, OpenTelemetry collector directly writes to ClickHouse. The query service makes queries to ClickHouse to fetch relevant data points and display it on the frontend UI.

We will also be soon bringing support for long term storage from ClickHouse to S3.

## Upcoming features in the ClickHouse set up

We will soon be enabling custom metrics in SigNoz with the ClickHouse  storage backend. Metrics represent the health of your system over time and are a crucial component of observability. SigNoz uses OpenTelemetry for instrumentation and you can measure metrics like p99, p50 latency, etc.

And with custom metrics you will be able to define more specific metrics to gauge the health of your system.

As an open-source monitoring tool, we want to provide our users flexibility in setting up monitoring for their services. Monitoring data is often critical and private to a company, and as such, users should have flexibility in choosing a database that their teams feel most comfortable with. Providing support for different storage backends is an effort in this direction.

SigNoz is also self-hosted, so you don't need to send your critical data to SaaS vendors outside your cloud. Visit our GitHub repo, and try out SigNoz in a matter of minutes.

We are constantly looking out for community feedback and will be pleased to hear from you.

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)
