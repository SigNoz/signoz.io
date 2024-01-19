---
title: OpenTelemetry MongoDB | Monitor and visualize your MongoDB database calls
slug: opentelemetry-mongodb
date: 2023-10-18
tags: [OpenTelemetry Instrumentation, Database Monitoring, JavaScript]
authors: [pranshu, ankit_anand]
description: In this tutorial, we will learn how to use OpenTelemetry to trace MongoDB calls. OpenTelemetry provides client libraries for instrumentation of application code in major programming languages & technologies, including databases like MongoDB...
image: /img/blog/2022/06/opentelemetry_mongodb_cover.webp
keywords:
  - opentelemetry
  - mongoDB
  - opentelemetry mongodb
  - monitor mongodb
  - database monitoring
  - mongodb performance
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-mongodb/"/>
</head>

OpenTelemetry libraries can be used to monitor MongoDB interactions. In this tutorial, we will learn how we can monitor MongoDB with OpenTelemetry libraries to analyze query execution and identify performance bottlenecks. 

<!--truncate-->

![Cover Image](/img/blog/2022/06/opentelemetry_mongodb_cover.webp)

Most modern applications have distributed architecture thanks to cloud and containerization. In cloud-native applications, it is necessary to track user requests across services and components like databases. Distributed tracing is the technology that enables tracing of user requests across different components of your application.

But how do you enable distributed tracing for your application?

That’s where OpenTelemetry comes into the picture. It is an open-source project under the Cloud Native Computing Foundation (<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) that aims to standardize the generation and collection of telemetry data (logs, metrics, and traces).

OpenTelemetry has client libraries in all major programming languages. These client libraries can collect and emit telemetry data from application code, different web frameworks, and database components like MongoDB.

But OpenTelemetry is used only for the instrumentation layer. Once the telemetry data is collected, it needs to be sent to a backend analysis tool for storage and visualization. That’s where [SigNoz](https://signoz.io/) comes into the picture. SigNoz is a full-stack open-source observability tool. You can also choose other analysis tools, as OpenTelemetry is vendor-agnostic.

In this tutorial, let’s learn how to trace MongoDB calls with OpenTelemetry. We will illustrate it with the help of a sample Nodejs application. We also have a bonus section on enabling host metrics for monitoring the health of your MongoDB instances.

## Prerequisites

- SigNoz
- Sample Nodejs app<br></br>
You can find the code for sample nodejs express app with MongoDB <a href = "https://github.com/SigNoz/sample-nodejs-app/tree/mongodb" rel="noopener noreferrer nofollow" target="_blank">here</a>.  (Check out the MongoDB branch)

We will be using a sample Nodejs application to illustrate how to instrument MongoDB with OpenTelemetry. You will also need to install SigNoz to visualize the collected data from OpenTelemetry.

## Installing SigNoz

First, you need to install SigNoz so that OpenTelemetry can send the data to it.

SigNoz can be installed on macOS or Linux machines in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

## Instrumenting MongoDB with OpenTelemetry to enable tracing

We want to trace user requests from our Nodejs app to MongoDB in order to visualize the complete breakdown of user requests. OpenTelemetry provides language-specific implementations to enable tracing for MongoDB.

For a nodejs app, you need to add specific <a href = "https://www.npmjs.com/package/@opentelemetry/instrumentation-mongodb" rel="noopener noreferrer nofollow" target="_blank">MongoDb libraries</a> as a dependency in your application code.

Your Nodejs application will have a `tracing.js` file which is used to initiate a tracer. Import MongoDBInstrumentation and create an instance with relevant option parameters and append it to the instrumentations list:

```bash
+ const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');

...

const sdk = new opentelemetry.NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations(),
+  new MongoDBInstrumentation({
+    enhancedDatabaseReporting: true,
+  }),
	],
});
```

## Enabling MongoDB host metrics

Enabling MongoDB host metrics would provide detailed metrics about the health of your MongoDB instance.

**Step 1: Add mongodb-exporter service**

In order to enable host metrics collection, you need to add mongodb-exporter service in the docker-compose file of the sample application. You can find it <a href = "https://github.com/SigNoz/sample-nodejs-app/blob/mongodb/docker-compose.yml" rel="noopener noreferrer nofollow" target="_blank">here</a>.

```bash
services:
  mongo:
    container_name: mongo_db
    image: mongo
    restart: always
    ports:
      - 27017:27017
    
+  mongodb-exporter:
+    image: percona/mongodb_exporter:0.30
+    command: --mongodb.uri=mongodb://mongo:27017 --compatible-mode
+    ports:
+      - 9216:9216
+    depends_on:
+      - mongo
```

**Step 2: Add job metrics scraping job**

Add job metrics scraping job to the `otel-collector-config.yaml` file. You can find the file <a href = "https://github.com/SigNoz/signoz/blob/main/deploy/docker/clickhouse-setup/otel-collector-config.yaml" rel="noopener noreferrer nofollow" target="_blank">here</a>.

```bash
receivers:
  otlp:
    protocols:
      grpc:
      http:

  # Data sources: metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: "otel-collector"
          scrape_interval: 30s
          static_configs:
            - targets: ["otel-collector:8889"]
+        - job_name: "mongo-collector"
+          scrape_interval: 30s
+          static_configs:
+            - targets: ["host.docker.internal:9216"]
```

**Note:** Make sure that the port number of the mongodb-exporter service and the mongodb-collection in otel config are in sync.

**Step 3: Create custom dashboards using PromQL**

After the above steps, your MongoDB instance will emit host metrics that can be visualized using custom dashboards in SigNoz. You can create different charts using PromQL on the SigNoz dashboard.

Below are few sample PromQL queries:

- For database connections<br></br>
`mongodb_connections`

- For tracking instance uptime<br></br>
`mongodb_instance_uptime_seconds`

- For tracking total number of requests<br></br>
`mongodb_network_metrics_num_requests_total`

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/otel_mongodb_promql.webp" alt="You can write PromQL queries to create custom dashboards"/>
    <figcaption><i>Writing PromQL queries to create custom charts for MongoDB instances using SigNoz dashboards</i></figcaption>
</figure>

<br></br>

## Monitor your MongoDB database with SigNoz

SigNoz provides custom dashboards that you can use to set up charts with metrics that are most critical for your use cases. For MongoDB databases, things like the number of database connections, instance uptime, the total number of requests, and other metrics can be set up to be shown in a single view.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/mongodb_custom_dashboards.webp" alt="MongoDB custom dashboards showing metrics like total number of requests"/>
    <figcaption><i>Monitor your MongoDB instances with custom dashboard on SigNoz</i></figcaption>
</figure>

<br></br>

You can monitor important metrics about database calls from a specific service like requests per second and avg. call duration in the `Database Calls` tab.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/otel_mongodb_database_calls.webp" alt="Database calls tab on SigNoz dashboard showing important metrics about database calls from a specific services"/>
    <figcaption><i>Monitor important metrics about database calls from a specific service</i></figcaption>
</figure>

<br></br>

One of the most powerful features that OpenTelemetry enables is distributed tracing. With the tracing visualization on SigNoz dashboard, you can quickly identify performance bottlenecks.

Below are some examples of trace visualization on the SigNoz dashboard.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/otel_mongodb_trace_details.webp" alt="Trace visualization of MongoDB calls using Flamegraphs on SigNoz dashboard"/>
    <figcaption><i>Trace visualizing an `insert` operation in MongoDB. You can see how much time each operation took along with other details</i></figcaption>
</figure>

<br></br>

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/otel_mongodb_database_error.webp" alt="Trace visualization of MongoDB calls using Flamegraphs on SigNoz dashboard"/>
    <figcaption><i>Trace visualizing a database calls which results in error on SigNoz dashboard</i></figcaption>
</figure>

<br></br>

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/otel_mongodb_404.webp" alt="Trace visualization of MongoDB calls using Flamegraphs on SigNoz dashboard"/>
    <figcaption><i>Trace visualizing an API that returns a 404 error code.</i></figcaption>
</figure>

<br></br>

You can find the end-to-end instrumented sample nodejs express app with mongodb over <a href = "https://github.com/signoz/sample-nodejs-app/tree/mongodb" rel="noopener noreferrer nofollow" target="_blank">here</a>.

## More about OpenTelemetry MongoDB

OpenTelemetry provides language-specific implementation in multiple programming languages to trace MongoDB interactions. We used OpenTelemetry in a sample Nodejs app with MongoDB in the example above. But it can also be sued for other programming languages, like:

- Java<br></br>
[OpenTelemetry MongoDB library for Java applications](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/mongo)
- Python<br></br>
[OpenTelemetry MongoDB library for Python applications](https://opentelemetry-python-contrib.readthedocs.io/en/latest/instrumentation/pymongo/pymongo.html)

OpenTelemetry is the future for setting up observability for cloud-native apps. It is backed by a huge community and covers various technology and frameworks. Using OpenTelemetry, engineering teams can instrument polyglot and distributed applications with peace of mind.

After collecting telemetry data with OpenTelemetry, you can use a backend analysis tool like SigNoz. It is built natively to support OpenTelemetry and is also open-source. You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

## Further Reading

[Monitor your Nodejs application with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/nodejs/)

[SigNoz - an open-source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)
