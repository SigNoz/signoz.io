---
title: Loki vs Elasticsearch - Which tool to choose for Log Analytics?
slug: loki-vs-elasticsearch
date: 2023-02-28
tags: [Tools Comparison]
authors: ankit_anand
description: Loki and Elastcisearch (ELK stack) are both log analytics tools. While Loki is designed to keep indexing low, Elasticsearch indexes all data in every field, and each indexed field has a dedicated, optimized data structure....
image: /img/blog/2022/11/loki_vs_elasticsearch_cover.jpeg
keywords:
  - loki vs elasticsearch
  - loki
  - elasticsearch
  - grafana loki
  - elk
  - elk stack
  - loki vs elk
  - loki alternatives
  - grafana
  - promtail
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/loki-vs-elasticsearch/"/>
</head>

import SignUps from '../docs/shared/sign-ups.md'
import LogsPerf from '../docs/shared/logs-perf-cta.md'

Elasticsearch, or the ELK stack, is a popular log analytics solution. The Loki project was started at Grafana Labs in 2018. Grafana leads the development of Loki, while Elastic is the company behind Elasticsearch. In this article, we will do a detailed comparison between these two tools for log analytics.

<!--truncate-->

![Cover Image](/img/blog/2022/11/loki_vs_elasticsearch_cover.webp)

Log data helps application owners debug their applications while also playing a critical role in cyber security. Most modern applications are now based on distributed components based on container technologies. Collecting log data from these systems and deriving timely insights from them can be complex. That’s where Log analytics tools like Loki and Elasticsearch come into the picture.

Before we look at the differences between these two tools, let us have a brief overview of both tools.

<SignUps />

## What is Loki?

Loki is a open source log aggregation tool developed by Grafana labs. It is inspired by Prometheus and is designed to be cost-effective and easy to operate. Loki is designed to keep indexing low. It does this by making use of labels. Labels are any key-value pairs that can be used to describe a log stream. For example:

```bash
scrape_configs:
 - job_name: system
   pipeline_stages:
   static_configs:
   - targets:
      - localhost
     labels:
      job: syslog
      __path__: /var/log/syslog
```

The above config will let you query the log stream with `{job=syslog}`. Labels act as an index to Loki's log data and keep the complexity low. But Loki does not support high cardinality efficiently. For example, if you create a label for the user's IP address, you will have thousands of log streams, as every user will have a unique IP. This can make Loki very slow as it requires building a huge index.

## What is Elasticsearch?

Elasticsearch is a search engine built on Apache Lucene. For log analytics, Elasticsearch is combined with Logstash or FluentD and Kibana. The ELK stack comprises of following independent components:

- Elasticsearch
- Logstash
- Kibana

There are other log-collecting tools too that can be used for collecting logs. FluentD and Filebeat are two popular log collectors used in the pipeline. Once the log data is collected, it is stored as unstructured JSON objects. Both the key of the JSON object and the contents of the key are indexed. Elasticsearch indexes all data in every field. Kibana lets you visualize the logs data to generate insights.

Now that we have an overview of both tools let’s discuss the key differences between them.

<LogsPerf />

## Key differences between Loki and Elasticsearch

### Storage

Log data is often huge, with every application, host machine, and infrastructure component generating its own set of log streams. And storage can quickly become costly. So it’s important to understand how Loki and Elasticsearch store log data.

Loki only indexes the metadata(labels) of logs. Once the indexing is done, the log data is compressed and stored in object stores like S3 and GCS. The compressed log data is called a chunk. Since only a set of labels is indexed for each log stream, the index created is small. Both index and chunks can be stored on the object store from Loki 2.0.

Elasticsearch indexes the full contents of stored documents. The data is stored on-disk as unstructured JSON objects. Elasticsearch makes documents fully searchable but at the cost of requiring more storage space.

### Indexing

The biggest difference between Loki and Elasticsearch is how they index data. While Loki is designed to keep indexing low, Elasticsearch indexes all data in every field, and each indexed field has a dedicated, optimized data structure. Since indexes are low in Loki, it is more cost-effective and performant. But it loses the rich text search capabilities that Elasticsearch provides.

### Query Language

Loki uses its own language for querying logs, called LogQL. Each query consists of two parts: a log stream selector and a filter expression. The performance of query execution depends on how many labels are selected to filter down log streams.

If you are using Kibana to visualize log data from Elasticsearch, you can use the Kibana Query Language (KQL). You can also choose to turn off Kibana Query Language and use <a href = "https://www.elastic.co/guide/en/kibana/8.5/lucene-query.html" rel="noopener noreferrer nofollow" target="_blank" >Lucene Query syntax</a> instead. 

Both LogQL and KQL have a learning curve, and it depends on users how quickly they can become accustomed to it. As KQL is much older, you can find more examples online to learn and implement for your use case.

### Promtail vs Logstash

Loki uses Promtail to discover log files. Promtail is specifically designed for Loki. It discovers log files stored on disk and forwards them to Loki. It primarily does three things: discovers targets, attaches labels to the log stream, and pushes them to the Loki instance.

Logstash is used to collect and forward logs to Elasticsearch. Logstash is a data processing engine. Logstash can send data to a number of destinations, not just Elasticsearch. It can collect data from different sources, process it, and ship it to a destination.

Logstash uses input plugins to ingest data from different sources. Configuring Logstash is a bit more complex than Promtail. Promtail is an agent that needs to be deployed to every machine that has applications to be monitored.

### User Interface - Grafana vs Kibana

Loki is developed by Grafana Labs, the company behind the popular Grafana dashboards. You can use Grafana to query and visualize the log data stored in Loki. If you are familiar with Prometheus and Grafana setup, it will be easier for you to visualize log data in Grafana. Grafana was originally built to visualize time-series data.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/11/loki_dashboard.webp" alt="Loki Dashboard"/>
    <figcaption><i>Loki Dashboard (Source: Grafana website)</i></figcaption>
</figure>

The ELK stack uses Kibana as its data visualization layer. Kibana is more suited to visualizing data with context as Elasticsearch enables full-text search.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/11/kibana_dashboard_logs.webp" alt="Kibana Dashboard"/>
    <figcaption><i>Kibana Dashboard</i></figcaption>
</figure>

Both Grafana and Kibana are popular dashboarding tools. The difference between them mainly lies in their genesis. Kibana was built to visualize data of any kind. Grafana started out as a fork of Kibana to focus mainly on time-series data.

## Choosing between Loki and Elasticsearch

Choosing between Loki and Elasticsearch depends on your use cases and the resources available. While Loki is resource efficient, it does not give the rich search capabilities given by Elasticsearch. You also have to factor in the cost and resource requirements. Elasticsearch needs more resources as compared to Loki.

If you are starting out your log analytics journey and want something to start quickly, Loki can be a good option. At the same time, Elasticsearch makes more sense for larger-scale and enterprise teams.

You can also try out [SigNoz](https://signoz.io/). SigNoz can be a good choice for users who don’t have the resources to support the Elasticsearch stack and want better querying capabilities than Loki.

## SigNoz - an open source alternative to Loki and Elasticsearch

SigNoz is a full-stack open source APM that you can use as an alternative to Loki and Elasticsearch. SigNoz uses a columnar database ClickHouse to store logs, which is very efficient at ingesting and storing logs data. Columnar databases like ClickHouse are very effective in storing log data and making it available for analysis.

Big companies like Uber have <a href = "https://www.uber.com/en-IN/blog/logging/" rel="noopener noreferrer nofollow" target="_blank" >shifted</a> from the Elastic stack to ClickHouse for their log analytics platform. Cloudflare too was using Elasticsearch for many years but <a href = "https://blog.cloudflare.com/log-analytics-using-clickhouse/" rel="noopener noreferrer nofollow" target="_blank" >shifted to ClickHouse</a> because of limitations in handling large log volumes with Elasticsearch.

While Loki is also resource efficient, it does not give you advanced querying capabilities on high cardinality data. SigNoz utilizes the underlying columnar database to let users run advanced queries faster.

SigNoz uses <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> for instrumenting applications. OpenTelemetry, backed by <a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >CNCF</a>, is quickly becoming the world standard for instrumenting cloud-native applications.

The logs tab in SigNoz has advanced features like a log query builder, search across multiple fields, structured table view, JSON view, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log management in SigNoz"/>
    <figcaption><i>Log management in SigNoz</i></figcaption>
</figure>

<br></br>

You can also view logs in real time with live tail logging.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/10/signoz_live_logs.webp" alt="Live Tail Logging in SigNoz"/>
    <figcaption><i>Live Tail Logging in SigNoz</i></figcaption>
</figure>

<br></br>

With advanced Log Query Builder, you can filter out logs quickly with a mix and match of fields.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/10/signoz_log_query_builder.webp" alt="Advanced Log Query Builder in SigNoz"/>
    <figcaption><i>Advanced Log Query Builder in SigNoz</i></figcaption>
</figure>

<br></br>

## Getting started with SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.


[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

If you liked what you read, then check out our GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

---

**Related Posts**

[SigNoz - A Lightweight Open Source ELK alternative](https://signoz.io/blog/elk-alternative-open-source/)

[OpenTelemetry Logs - A complete introduction](https://signoz.io/blog/opentelemetry-logs/)