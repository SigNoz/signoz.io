---
id: product
title: Product - FAQs
description: Frequently Asked Questions About SigNoz

---

### I am looking for an application monitoring tool, is SigNoz an APM?

SigNoz is a full-stack open source APM tool. It provides logs, metrics, and traces under a single dashboard. You can correlate these signals to debug performance issues quickly. SigNoz uses OpenTelemetry for instrumentation. OpenTelemetry is quietly becoming the world standard for instrumenting cloud-native applications.

SigNoz is an [open source alternative](https://signoz.io/blog/open-source-datadog-alternative/) to traditional SaaS APMs like DataDog.

### How is SigNoz different from Prometheus?

Prometheus is good if you want to do just metrics. But metrics are just one aspect of monitoring. Ideally, you would also use other telemetry signals like logs and traces to set up a robust monitoring framework for your application. SigNoz provides logs and traces too, everything under a single pane of glass.

Moreover, it’s not trivial to get application metrics with Prometheus. SigNoz provides out-of-box charts for application metrics like p99 latency of requests. You can also correlate your application metrics with traces seamlessly.

Our goal is to provide an integrated UI between all telemetry signals - metrics, traces, and logs - similar to what SaaS vendors like Datadog provide.

### How does SigNoz compare to Grafana stack ( Prometheus, Loki, Tempo)?

The advantages of SigNoz are powered by the choice of columnar database underlying it. Running aggregates on traces and logs would be much more efficient when doing in a columnar db. So, if you use Tempo you won't be able to get sum/rate/count/percentile on spans filtered by tags/labels. Similarly, for Loki if you look into their open issues on performance, you will find issues in running fast aggregations on millions of log lines.
Moreover, running 3 stacks for metrics, traces and logs would prove to be more cumbersome for millions of events.

Using a single underlying datastore helps us in switching context from metrics to traces. Say, you see a spike in latency or error % of external calls or db calls from a service, SigNoz can take you to relevant traces on the click of a button which may not be as simple in Grafana (as far as we know).


#### To Summarise

- Underlying distributed columnar db to power analytical queries, Uber mentioned 80% of the queries over logs data were analytical and hence they shifted to clickhouse from elk. Here's the <a href="https://www.uber.com/en-IN/blog/logging/" rel="noopener noreferrer nofollow" target="_blank">blog link</a>.
- Ability to handle high cardinality traces as these types of databases support wide columns
- Single app vs combining different products for metrics, traces and logs
- UI streamlined for APM use cases

### Is Prometheus included in SigNoz?

We support PromQL and Prometheus remote read for users to shift seamlessly from Prometheus to SigNoz as their metrics monitoring tool. We also support PromQL for configuring alerts.

SigNoz supports all the exporters that are listed on the <a href="https://prometheus.io/docs/instrumenting/exporters/" rel="noopener noreferrer nofollow" target="_blank">Exporters and Integrations</a> page of the Prometheus documentation. If you have a running Prometheus instance and you expose metrics in Prometheus, then you can scrape them in SigNoz by [configuring Prometheus receivers](https://signoz.io/docs/userguide/send-metrics/#enable-a-prometheus-receiver).

### I am using Jaeger, can I use SigNoz? How does it differ from Jaeger?

Yes, you can. SigNoz provides better distributed tracing capabilities than Jaeger. The traces tab of SigNoz provides advanced filtering based on different attributes. Moreover, you can also run aggregates on filtered traces. For example, you can get the p99 latency of spans with a tag of premium_customers.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/trace_filter_apply_aggregates.webp" alt="Use advanced filters and aggregates to analyze span data"/>
    <figcaption><i>Analyze your spans with advanced filters and aggregates</i></figcaption>
</figure>

<br></br>

Trace data is also visualized with Flamegraphs and Gantt charts.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Traces visualized with Flamegraphs and Gantt Charts"/>
    <figcaption><i>Traces represented as Flamegraphs and Gantt charts in SigNoz</i></figcaption>
</figure>

<br></br>

With SigNoz, you get metrics, traces and logs in a single application unlike Jaeger which primarily focuses on distributed tracing.

### What will be your paid plan like?

SigNoz will be always open-source and free to self-host for smaller
teams. You can find more details about our pricing plans [here](https://signoz.io/pricing/).


### What is unique about SigNoz as an observability tool?

SigNoz is full-stack open source APM and observability tool. Some key aspects that make SigNoz unique are as follows:

- SigNoz is open source and based on open standards. SigNoz is built to support OpenTelemetry natively.

- SigNoz provides metrics, traces, and logs under a single pane of glass. Rather than running different projects like Prometheus for metrics and Jaeger for traces and stitching them together, you can use SigNoz as your one-stop observability solution.

- SigNoz uses columnar datastores, which makes aggregating queries very fast. It also helps in slicing and dicing the data using `Group BY` and aggregates. You can identify the root cause of performance issues quickly.

### How do you compare with Honeycomb feature-wise?

The last we checked Honeycomb (August 2022), they were primarily focused on traces and support for metrics in their pro plan.

We do have support for metrics, traces and also logs. So you can get all the 3 signals in a single app. You get out of the box dashboards for services with metrics like latency, etc. We have good support for trace aggregates and filters based on trace attributes, with a trace detail page with attributes. You can check more details in [our docs](https://signoz.io/docs/userguide/traces/)

Though Honeycomb does have some features like Bubble up and correlation which we don't have currently, but we have some advanced correlation based features in our roadmap.

So, it depends on the use cases you are trying to solve - whether SigNoz will fit your needs today or not.


### Can I run SigNoz as a service in AWS?

Yes, you can run SigNoz in an AWS instance using Docker-Compose or Docker Swarm. You can also use our helm chart to deploy SigNoz in EKS.

Refer here: [https://signoz.io/docs/install/](https://signoz.io/docs/install/)


### Is it possible to remove default SigNoz Services (Applications) from the dashboard that comes bundled with SigNoz installation?

*If yes, after removing those, do I need to put my application's container and image in that place?*

Yes, it is possible to remove the sample app. Refer [here](https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application). No, you do not need to put your application’s container and image in that place.


### Why does SigNoz not support Windows?

We currently do not support Windows because we are a small team. At first, we are focussing on MAC and Linux users.

Try SigNoz on your macOS or Linux system, and use the [install script](https://signoz.io/docs/install/docker/#install-signoz-using-the-install-script) for easy setup.

Supported Linux Disto - Ubuntu | Debian | OpenSuse | CentOS | SUSE Linux Enterprise Server (SLES)

If you're using a different Linux distribution, see the [Install SigNoz Using Docker Compose](https://signoz.io/docs/install/docker/#install-signoz-using-docker-compose) section.



### We have deployed SigNoz in the Kubernetes cluster, does it show CPU and memory utilization metrics at the node level, as well as pod level like Prometheus does? 

*If yes, is it available by default on the dashboard or do we have to perform some additional configuration?*

Yes, SigNoz can monitor resource utilization metrics at the node and pod level from your Kubernetes cluster. You can enable it by following the set of instructions [here](https://signoz.io/docs/tutorial/kubernetes-infra-metrics/#steps-to-export-k8s-metrics-to-signoz).


### Is there a provision to modify the base path of SigNoz UI and host it behind Nginx or others at the subpath?

*For instance: instead of [https://mydomain.com/](https://mydomain.com/), I want [https://mydomain/signoz/](https://mydomain/signoz/), since my application is already running at the basepath.*

We currently working on supporting custom baseURL to support that.

You can track it here: [https://github.com/SigNoz/signoz/pull/1115](https://github.com/SigNoz/signoz/pull/1115)<a href="https://www.uber.com/en-IN/blog/logging/" rel="noopener noreferrer nofollow" target="_blank">blog link</a>


### Is there anything I need to do after upgrading SigNoz to a version with some breaking changes?

You need to follow our [migration guides](https://signoz.io/docs/operate/migration/) to upgrade SigNoz correctly.


### Is the frontend SigNoz level user data stored in ClickHouse DB?

No, it’s stored in SQLite. But we are planning to move to PostgreSQL. You can track the GitHub issue <a href="https://github.com/SigNoz/signoz/issues/941" rel="noopener noreferrer nofollow" target="_blank">here</a>.



<!-- ## What is Kafka and Druid?

Kafka is a queuing system, it provides a way to send requests to be processed asynchonously by unknown to the sender instances. The idea that you can scale your processes more easily by decoupling the two and unlike a load balancer, if one instance fails to process a request it can stay on the queue to be processed by another.

Druid is a timeseries database for running queries against pre-aggregated data. Imagine a bunch of records like {host: "ABC", event: "foo", timeperiod: "00:00-01:00", count: 1234}. It's designed to be really fast then at answering queries like "How many bar events occurred in hosts matching "prod-\*" between 3am and 5am?" or "Give me the Baz events at daily intervals for the last 90 days" -->
