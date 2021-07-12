---
id: faq
title: Frequently Asked Questions
---

## I am looking for an application monitoring tool, is SigNoz an APM?

SigNoz is more than an APM. We provide all features like
metrics and request traces which APMs provide. On top
of that. we provide advanced filtering on trace data and
custom aggregation on it

## How is SigNoz different from Prometheus?

Prometheus is good if you want to do just metrics. But if you want to have a seamless experience between metrics and traces, then current experience of stitching together Prometheus & Jaeger is not great. Grafana is making some efforts in this direction with Trace viewer - but we think this is just stitching 2 disparate systems.

Our goal is to provide an integrated UI between metrics & traces - similar to what SaaS vendors like Datadog provides - and give advanced filtering and aggregation over traces, something which Jaeger currently lack.

## I am using Jaeger, can I use SigNoz?

- Jaegar UI doesn’t show any metrics on traces or on filtered traces
- Can’t get aggregates on filtered traces.
- For example, Cassandra doesn’t support Group By, Max()

## What will be your paid plan like?

SigNoz will be always open-source and free to self-host for smaller
teams. We will have role based pricing for our enterprise
edition which will have advanced features needed by
bigger teams.

## What is Kafka and Druid?

Kafka is a queuing system, it provides a way to send requests to be processed asynchonously by unknown to the sender instances. The idea that you can scale your processes more easily by decoupling the two and unlike a load balancer, if one instance fails to process a request it can stay on the queue to be processed by another.

Druid is a timeseries database for running queries against pre-aggregated data. Imagine a bunch of records like {host: "ABC", event: "foo", timeperiod: "00:00-01:00", count: 1234}. It's designed to be really fast then at answering queries like "How many bar events occurred in hosts matching "prod-\*" between 3am and 5am?" or "Give me the Baz events at daily intervals for the last 90 days"
