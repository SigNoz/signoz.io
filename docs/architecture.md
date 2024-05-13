---
id: architecture
title: Technical Architecture
---

![acrhitecture-diagram-clickhouse](../static/img/architecture-signoz-clickhouse.svg)

### Architecture Components

- SigNoz OpenTelemetry Collector
- ClickHouse
- Query Service
- Frontend
- Alert Manager

<!-- ## Kafka + Druid Setup Architecture

SigNoz uses industry proven Kafka and Druid to power highly scalable data ingestion and realtime data analysis.

![acrhitecture-diagram](../static/img/architecture-signoz-dark.svg)

### Architecture Components

- OpenTelemetry Collector
- Kafka
- Stream Processors
- Apache Druid
- Query Service
- Frontend -->

**OpenTelemetry Collector** can receive data in multiple formats. Here are some of the commonly used receivers:

- Jaeger Receiver
- Kafka Receiver
- OpenCensus Receiver
- OTLP Receiver
- Zipkin Receiver

One can send data from their applications directly to SigNoz Otel collector or external otel collectors can be used for collecting telemetry data & sending to SigNoz otel collector. These external otel collectors are then working effectively as an agent to collect data first and then send to SigNoz Otel collector. 

<!-- OpenTelemetry Collector then exports those traces to a kafka topic, `otlp_spans`.

**Apache Kafka is a distributed streaming platform** that can be used as message-driven backbone of communication. Applications can send messages between its components in the form of records that can be produced to Kafka topics and consumed from Kafka topics.

### _Stream Processing_ decentralizes and decouples the infrastructure.

You produce at whatever rate you want to into Kafka, scaling the brokers out to accommodate the ingest rate. You then consume as you want to; Kafka persists the data and tracks the offset of the consumers as they work their way through the data they read.
This behavior enables applications to be able to recover from outages, enables decoupling between application components, and encourages the use of backpressure within reactive application

Our stream processing applications read from `otlp_spans` kafka topic and flattens the structure of spans to be ingested to databases like Druid. This flattener-processor writes to `flattened_spans` topic in kafka.

We can easily build other processors for any processing we may want to do. For example:

- Remove PII data from spans
- Send input to anomaly detection framework

The flattened data is then ingested to **Druid** _which is a real-time analytics database_ designed for fast slice-and-dice analytics ([OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) queries) on large data sets. We use streaming ingestion from Kafka to Druid.

- We then add supervisor in druid to ingest from kafka at realtime
- We then add retention policy in druid. By default, we set 3 days of data retention
- We have option to add AWS S3 bucket credentials for deep storage of data in druid. By default, we use `storage: local` in helm `values.yaml` -->

**Query Service** is the interface between Frontend and ClickHouse. It provides APIs to be consumed by frontend application and queries ClickHouse to fetch data and processes data before responding back to the frontend.

**Frontend** is the UI, built in ReactJS and Typescript and provides advanced trace/span filtering capabilities and plot metrics to provide service overviews.

**Alert Manager** evaluates different alert rules set by the users and triggers an alert if a threshold is crossed.


### Opentelemetry Introduction

SigNoz uses OpenTelemetry for instrumenting applications and for collecting telemetry data. The following docs may be useful to get familiar with the basic concepts of OpenTelemetry

- [OpenTelemetry Data Collection](https://opentelemetry.io/docs/concepts/data-collection/)

- [OpenTelemetry Collector Configuration](https://opentelemetry.io/docs/collector/configuration/)

