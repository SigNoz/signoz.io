---
title: Implementing OpenTelemetry in a Rust application for performance monitoring 
slug: opentelemetry-rust
date: 2023-10-11
tags: [OpenTelemetry Instrumentation, Rust]
authors: [srikanth]
description: OpenTelemetry can be used to instrument Rust applications in production for performance monitoring. OpenTelemetry provides libraries, APIs, and SDKs to collect telemetry data(logs, metrics, and traces), using which you can monitor and debug your Rust application for...
image: /img/blog/2022/05/opentelemetry_rust_cover.webp
keywords:
  - opentelemetry
  - rust
  - opentelemetry rust
  - apm tools
  - application performance monitoring
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-rust/"/>
</head>

OpenTelemetry can be used to trace Rust applications for performance issues and bugs. OpenTelemetry is an open-source project under the Cloud Native Computing Foundation (<a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) that aims to standardize the generation and collection of telemetry data. Telemetry data includes logs, metrics, and traces.

<!--truncate-->

![Cover Image](/img/blog/2022/05/opentelemetry_rust_cover.webp)

Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency. In this tutorial, we will demonstrate how to use the OpenTelemetry to generate end-to-end tracing.

Before we demonstrate how to implement the OpenTelemetry libraries, let’s have a brief overview of OpenTelemetry.

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> is an open-source vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

The telemetry data is then sent to an observability tool for storage and visualization.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/09/opentelemetry_architecture.webp" alt="OpenTelemetry Architecture"/>
    <figcaption><i>OpenTelemetry libraries instrument application code to generate telemetry data that is then sent to an observability tool for storage & visualization</i></figcaption>
</figure>

<br></br>

OpenTelemetry is the bedrock for setting up an observability framework. It also provides you the freedom to choose a backend analysis tool of your choice.

## OpenTelemetry and SigNoz

In this tutorial, we will use [SigNoz](https://signoz.io/) as our backend analysis tool. SigNoz is a full-stack open-source APM tool that can be used for storing and visualizing the telemetry data collected with OpenTelemetry. It is built natively on OpenTelemetry and works on the OTLP data formats.

SigNoz provides query and visualization capabilities for the end-user and comes with out-of-box charts for application metrics, logs and traces.

Now let’s get down to how to implement OpenTelemetry in Rust applications and then visualize the collected data in SigNoz.

## Running Rust application with OpenTelemetry

**Step 1: Install SigNoz**<br></br>

First, you need to install SigNoz so that OpenTelemetry can send the data to it.

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank">Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the installation</i></figcaption>
</figure>

<br></br>

**Step 2: Get sample Rust application**<br></br>
If you have your own Rust application, follow along the steps mentioned below. We have prepared a <a href = "https://github.com/SigNoz/sample-rust-app" rel="noopener noreferrer nofollow" target="_blank">sample Rust application</a> which is already instrumented with OpenTelemetry.

**Step 3:  Instrument your application with OpenTelemetry**<br></br>
To configure your application to send data we will need a function to initialize OpenTelemetry. Add the following snippet of code in your `main.rs` file.

```jsx
use opentelemetry::sdk::Resource;
use opentelemetry::trace::TraceError;
use opentelemetry::{global, sdk::trace as sdktrace};
use opentelemetry::{trace::Tracer};
use opentelemetry_otlp::WithExportConfig;


fn init_tracer() -> Result<sdktrace::Tracer, TraceError> {
    opentelemetry_otlp::new_pipeline()
        .tracing()
        .with_exporter(opentelemetry_otlp::new_exporter().tonic().with_env())
        .with_trace_config(
            sdktrace::config().with_resource(Resource::default()),
        )
        .install_batch(opentelemetry::runtime::Tokio)
}
```

**Step 4:  Initialize the tracer in main.rs**<br></br>
Modify the main function to initialise the tracer  in `main.rs`

```jsx
#[tokio::main]
async fn main() -> Result<(), Box<dyn Error + Send + Sync + 'static>> {
    let _ = init_tracer()?;

    ...
}
```

**Step 5:  Add the OpenTelemetry instrumentation for your sample Rust app**<br></br>

```jsx
    let parent_cx = global::get_text_map_propagator(|propagator| {
        propagator.extract(&HeaderExtractor(req.headers()))
    });
    tracer.start_with_context("fibonacci", &parent_cx);
```

**Step 6: Set environment variables and run your Rust application**<br></br>
Now that you have instrumented your Rust application with OpenTelemetry, you need to set some environment variables to send data to SigNoz backend:

`OTEL_RESOURCE_ATTRIBUTES`: service.name=rust-app (you can name it whatever you want)

`OTEL_EXPORTER_OTLP_ENDPOINT`: http://localhost:4317

Since, we have installed SigNoz on our local machine, we use the above IP. If you install SigNoz on a different machine, you can update it with the relevant IP.

Hence, the final run command looks like this:

```jsx
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317 OTEL_RESOURCE_ATTRIBUTES=service.name=rust-app cargo run
```

**Step 7:** **Generate some data**<br></br>
In order to monitor your Rust application with SigNoz, you first need to generate some data.

Visit home page of your Rust application at [http://localhost:1337](http://localhost:1337) and enter some details. Alternatively you can just send curl request

```jsx
curl -d "name=Baymax&number=42" \
-H "Content-Type: application/x-www-form-urlencoded" \
-X POST http://localhost:1337/post
```
        

**Step 8: Visualize the collected data in SigNoz**<br></br>
Access the signoz UI on [http://localhost:3301/application](http://localhost:3301/application). You will find your sample Rust application in the list of applications being monitored by SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/rust_application_signoz_dashboard.webp" alt="Rust app being monitored on SigNoz dashboard"/>
    <figcaption><i>Rust application being monitored on the SigNoz dashboard. The other applications are sample apps that come bundled with SigNoz installation.</i></figcaption>
</figure>

<br></br>

Go to `Traces` and choose `rust-app` from the list of services to see the tracing data of your application. Tracing data can help you visualize how user requests perform across services in a multi-service application.

In the `Traces` tab of SigNoz, you can analyze the tracing data using filters based on tags, status codes, service names, operations, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/rust_application_traces_tab.webp" alt="Traces tab of SigNoz dashboard"/>
    <figcaption><i>Use powerful filters to analyze the tracing data of your Rust application</i></figcaption>
</figure>

<br></br>

You can see a complete breakdown of the request with Flamegraphs and Gantt charts. You can click on any span in the spans table to access it.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/05/rust_application_flamegraphs.webp" alt="Flamegraphs and Gantt charts in SigNoz dashboard"/>
    <figcaption><i>You can see the complete breakdown of your requests with details like how much time each operation took, span attributes, etc</i></figcaption>
</figure>

<br></br>

## Conclusion

Using OpenTelemetry libraries, you can instrument your Rust applications for end-to-end tracing. You can then use an open-source APM tool like SigNoz to ensure the smooth performance of your applications.

OpenTelemetry is the future for setting up observability for cloud-native apps. It is backed by a huge community and covers a wide variety of technology and frameworks. Using OpenTelemetry, engineering teams can instrument polyglot and distributed applications with peace of mind.

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="yPt1Pc3_tls" mute={false} />

<p>&nbsp;</p>


## Getting started with SigNoz

SigNoz is an open-source observability tool that comes with a SaaS-like experience. SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

---

## Further Reading

**[OpenTelemetry Collector - Complete Guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)**<br></br>
**[OpenTelemetry Tracing - things you need to know](https://signoz.io/blog/opentelemetry-tracing/)**<br></br>
