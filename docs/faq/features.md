---
id: features
title: FAQ - Features
description: Frequently Asked Question About Features of SigNoz

---

### 1. What are the different Alert-Channel do SigNoz supports? 

Currently we support `Slack`, `Pagerduty`, and `Generic Webhook`. 

Using the generic WebHook you should be able to plug in anything on the other end.
However, if you require support for something specific, please create a feature request issue in the SigNoz GitHub repository, so that we can evaluate and prioritize the same.



### 2. What are the Setup expressions to evaluate for the error in the PromQL alert setup?

SigNoz uses the same AlertManager as Prometheus and thus all PromQL configurations for writing the expression will be supported by SigNoz, including email and WebHook. Signoz Alert Manager is a fork of Prometheus Alert Manager.

Resources:

- [https://prometheus.io/docs/alerting/latest/configuration/](https://prometheus.io/docs/alerting/latest/configuration/)
- [https://prometheus.io/docs/prometheus/latest/querying/basics/](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- https://signoz.io/docs/userguide/send-metrics/
 


### 3. I was able to create Alerts for App Latency and Database calls. How can I create Alerts for p99, p95, and p50 Application Latency? 

Use the below query. Change `service_name` to your own and change `0.99` based on the percentile you are looking for.

```
histogram_quantile(0.99, sum(rate(signoz_latency_bucket{service_name="customer"}[1m])) by (le))
```

For writing queries, we support PromQL by Prometheus, so you can write expressions based on that - both in plotting charts in Dashboards and for writing queries for Alerts. 

Refer here: [https://prometheus.io/docs/prometheus/latest/querying/basics/](https://prometheus.io/docs/prometheus/latest/querying/basics/)



### 4. How the Legend Format works in the Metrics Query Dashboard? 

If your PromQL expression is like,

```
http_requests_total{job="prometheus"}
```

the legend format `{{job}}` shows just `prometheus` in the legends of the chart and helps in better visualization when the `expr` can be lengthy and difficult to read.



### 5. Is there a way to see what metrics are available with SigNoz?

Yes, refer to the links below:

- [Find Metrics available in SigNoz](https://signoz.io/docs/userguide/send-metrics/#find-metrics-available-in-signoz)
- [Metrics from Hostmetrics receiver](https://signoz.io/docs/userguide/send-metrics/#metrics-from-hostmetrics-receiver)
- [Mongo Metrics](https://signoz.io/docs/tutorial/mongodb-metrics/#plotting-mongo-metrics-in-signoz)



### 6. How are the tabs `Database Calls` and `External Calls` supposed to work? Do we need to send any attributes from the backend so that SigNoz recognizes them? 

`External Calls` and `Database Calls` are part of automatically generated data. If you use some `HTTP` library to do requests and similarly database client libraries to query a database server, the data will be automatically available if the libraries are supported by OpenTelemetry.

If that is not working you can always add data using OpenTelemetry SDKs. For the semantics, refer to [this official otel docs](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md) which we use to extract data.



### 7. How do I compare spans in Signoz? 

SigNoz in its current state can compare spans with their aggregates. 

Example: In the Trace Filter page, choose a filter to correctly represent a set of spans in which you are interested. The chart above can show you the `p50` of the filtered spans and you can click on a span in the list below the chart to see the trace in detail.

Refer here: https://signoz.io/docs/userguide/span-details/
