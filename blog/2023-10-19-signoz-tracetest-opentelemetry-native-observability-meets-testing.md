---
title: "SigNoz + Tracetest: OpenTelemetry-Native Observability Meets Testing"
slug: signoz-tracetest-opentelemetry-native-observability-meets-testing
date: 2023-10-20
tags: [OpenTelemetry]
authors: adnanrahic
description: What is the hidden potential of OpenTelemetry? It goes beyond just tracing and monitoring your software. The OpenTelemetry project aims to standardize performance reporting and trace data propagation in microservice architectures. This context propagation is a valuable feature for those who use OpenTelemetry tracing. Tracetest and SigNoz provide testing and insights into the capabilities of OpenTelemetry.
image: /img/blog/2023/10/signoz-tracetest-cover.jpeg
hide_table_of_contents: false
keywords:
  - opentelemetry
  - signoz
  - observability
  - trace-based testing
  - tracetest
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/signoz-tracetest-opentelemetry-native-observability-meets-testing/"/>
</head>

What is the hidden potential of <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a>? It goes a lot further than the (awesome) application of tracing and monitoring your software. The OpenTelemetry project is an attempt to standardize how performance is reported **and** how trace data is passed around your microservice architecture. This context propagation is a superpower for those who adopt OpenTelemetry tracing. Tracetest promises to make this deep tracing a huge new asset in your testing landscape, and SigNoz helps all engineers get insight into what OpenTelemetry can see.
<!--truncate-->
![Cover Image](/img/blog/2023/10/signoz-tracetest-cover.webp)


> _Check out this [hands-on Demo example](https://github.com/kubeshop/tracetest/tree/main/examples/tracetest-signoz-pokeshop) of how Tracetest works with SigNoz! Or, if you like watching videos more, view a [demo of Tracetest in the SigNoz Community call](https://www.youtube.com/watch?v=a4OpEPoQTaE)._

## What is SigNoz?

[​​SigNoz](https://signoz.io/) is an open-source, OpenTelemetry-native observability tool that helps you monitor your applications and troubleshoot problems. It provides <a href = "https://signoz.io/docs/instrumentation/overview/" rel="noopener noreferrer nofollow" target="_blank">traces</a>, [metrics](https://signoz.io/docs/userguide/navigate-user-interface/), and <a href = "https://signoz.io/docs/userguide/logs/" rel="noopener noreferrer nofollow" target="_blank">logs</a> under a single pane of glass.

It collects data using OpenTelemetry, an open-source observability solution. OpenTelemetry is backed by the Cloud Native Computing Foundation. The project aims to standardize how we instrument our applications for generating telemetry data (traces, metrics, and logs).

With SigNoz, you can:

* Visualize Traces, Metrics, and Logs in a single pane of glass.
* Monitor application metrics like p99 latency, error rates for your services, external API calls, and individual endpoints.
* Find the root cause of the problem by going to the exact traces that are causing the problem and see detailed flame graphs of individual request traces.
* Run aggregates on trace data to get business-relevant metrics.
* Filter and query logs, build dashboards and alerts based on attributes in logs.
* Monitor infrastructure metrics such as CPU utilization or memory usage.
* Record exceptions automatically in Python, Java, Ruby, and Javascript.
* Easily set alerts with DIY query builder.

## What is Tracetest?

<a href = "https://tracetest.io/" rel="noopener noreferrer nofollow" target="_blank">Tracetest</a> is a tool for trace-based testing. It’s <a href = "https://github.com/kubeshop/tracetest" rel="noopener noreferrer nofollow" target="_blank">open source</a> and part of the CNCF landscape.

Tracetest uses your existing <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> traces to power trace-based testing with assertions against your trace data at every point of the request transaction. You only need to point Tracetest to your existing trace data source or send traces to Tracetest directly!

Tracetest makes it possible to:

* <a href = "https://docs.tracetest.io/concepts/assertions" rel="noopener noreferrer nofollow" target="_blank">Define tests and assertions</a> against every single microservice a trace goes through.
* Build tests based on your already instrumented system.
* <a href = "https://docs.tracetest.io/analyzer/concepts" rel="noopener noreferrer nofollow" target="_blank">Improve your OpenTelemetry instrumentation</a> by ensuring rules and semantic convention standards are met.
* Define multiple transaction triggers, such as a GET against an API endpoint, a GRPC request, a [Kafka message queue](https://docs.tracetest.io/examples-tutorials/recipes/testing-kafka-go-api-with-opentelemetry-tracetest), etc.
* Define assertions against both the response and trace data, ensuring both your response and the underlying processes worked as intended.
* Save and run the tests manually or via CI build jobs with the Tracetest CLI.

## Tracetest Now Works with SigNoz!

[Tracetest now works with SigNoz](https://docs.tracetest.io/configuration/connecting-to-data-stores/signoz), allowing you to bring the combined power of Tracetest and SigNoz to your developer workflows, and write trace-based tests with Tracetest!

If you already have OpenTelemetry instrumentation configured in your code and are using an OpenTelemetry Collector with SigNoz, adding Tracetest to your infrastructure can enable you to write detailed trace-based tests.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697716957/Blogposts/signoz-integration/new/Untitled-2023-05-22-1321_m03lvk.webp" alt="architecture"/>
<figcaption><i>Image 1: Application architecture.</i></figcaption></figure>


When running integration tests, it's hard to pinpoint where an HTTP transaction fails in a network of microservices. Tracetest solves this by letting you run tests with assertions using existing trace data across all services. These tests can then be seamlessly integrated into your CI/CD process to ensure your system works well and to catch any regressions.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715804/Blogposts/signoz-integration/new/image_51_ctrfnj.webp" alt="test spec sample"/>
<figcaption><i>Image 2: In this example, within the Tracetest UI you can see that test assertions for trace spans succeeded.</i></figcaption></figure>


Elevate your testing approach by harnessing Tracetest for test creation and SigNoz for analyzing test results. SigNoz empowers you to monitor test executions, establish connections between relevant services across different time frames and gain valuable perspectives on system performance. This combination enables you to understand system behavior, gives you insights into system performance and highlights the impact of changes on performance.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715804/Blogposts/signoz-integration/new/image_52_hqyisz.webp" alt="tracetest tests triggered and visualized in signoz"/>
<figcaption><i>Image 3: Traces triggered by Tracetest surfaced in SigNoz.</i></figcaption></figure>


When using Tracetest, you can find problems by checking trace data over time in SigNoz. Any problems you encounter can become new tests or points to check in Tracetest. This gives you a quick feedback loop for continuous improvement.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715807/Blogposts/signoz-integration/new/image_53_ms9rcw.webp" alt="Image 4: Here you see a trace drilldown of a test in the SigNoz front end."/>
<figcaption><i>Image 4: Here you see a trace drilldown of a test in the SigNoz front end.</i></figcaption></figure>


## Try Tracetest with SigNoz

Install SigNoz on-prem or sign up for a <a href = "https://signoz.io/teams/" rel="noopener noreferrer nofollow" target="_blank">free trial</a>, then configure your OpenTelemetry collector to send traces to SigNoz (see below).

Tracetest is open-source and easy to install. Start by installing the Tracetest CLI:

```bash
brew install kubeshop/tracetest/tracetest
```

From here, follow the [official documentation](https://docs.tracetest.io/getting-started/installation) to install the Tracetest server. Once the server is installed, open the Tracetest Web UI in the browser and follow the instructions for connecting the <a href = "https://opentelemetry.io/docs/collector/" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry Collector</a> with Tracetest.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715806/Blogposts/signoz-integration/new/image_54_ymupdj.webp" alt="Image 5: Selecting SigNoz in the Tracetest settings."/>
<figcaption><i>Image 5: Selecting SigNoz in the Tracetest settings.</i></figcaption></figure>


The <a href = "https://opentelemetry.io/docs/collector/" rel="noopener noreferrer nofollow" target="_blank">Collector</a> is the recommended way to send OpenTelemetry data to an observability back-end. It is a highly configurable binary that allows you to ingest, process, and export OpenTelemetry data.

Enabling the SigNoz integration in Tracetest is as simple as configuring your OpenTelemetry collector to send spans to both Tracetest and SigNoz.

Copy this OpenTelemetry Collector configuration and paste it into your own configuration file.

```yaml
# collector.config.yaml

# If you already have receivers declared, you can just ignore
# this one and still use yours instead.
receivers:
  otlp:
    protocols:
      grpc:
      http:

processors:
  batch:
    timeout: 100ms

exporters:
  logging:
    logLevel: debug
  # OTLP for Tracetest
  otlp/tracetest:
    endpoint: tracetest:4317 # Send traces to Tracetest.
    tls:
      insecure: true
  # OTLP for Signoz
  otlp/signoz:
    endpoint: address-to-your-signoz-server:4317
    # Send traces to Signoz.
    tls:
      insecure: true

service:
  pipelines:
    traces/tracetest: # Pipeline to send data to Tracetest
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, otlp/tracetest]
    traces/signoz: # Pipeline to send data to Signoz
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, otlp/signoz]
```

Next, edit the config to add your SigNoz endpoint.

## Create a Trace-based Test in Tracetest

For this example, we’ll use the official example app for Tracetest and SigNoz. To quickly access the example, run the following:

```bash
git clone --single-branch --depth 1 https://github.com/kubeshop/tracetest.git
cd tracetest/examples/tracetest-signoz-pokeshop/
docker compose up --build
```

To create a test in Tracetest, start by clicking Create > Create New Test > HTTP Request > Next > Add a name for your test > Next > The URL field should be `http://demo-api:8081/pokemon/import` and a POST request, where the body should contain `{"id":6}` > Create and Run.

This will trigger the test and display a distributed trace in the Trace tab. You’ll also see the results of the Trace Analyzer. These results show rules and conventions to adhere to while writing code instrumentation.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715808/Blogposts/signoz-integration/new/image_55_mk5mi1.webp" alt="Image 6: Trace Analyzer in the Tracetest Web UI. Validate the quality of the code instrumentation."/>
<figcaption><i>Image 6: Trace Analyzer in the Tracetest Web UI. Validate the quality of the code instrumentation.</i></figcaption></figure>


Proceed to add a test spec to assert that all HTTP requests return status code 200. Click the Test tab and proceed to click the Add Test Spec button.

In the span selector, add this selector:

```css
span[tracetest.span.type="http"]
```

It will select the HTTP spans.

In the assertion field, add:

```css
attr:http.status_code = 200
```

Save the test spec and publish the test.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715808/Blogposts/signoz-integration/new/image_56_rua1fi.webp" alt="Image 7: Adding assertions to a test in the Tracetest Web UI."/>
<figcaption><i>Image 7: Adding assertions to a test in the Tracetest Web UI.</i></figcaption></figure>


If an HTTP span is returning anything other than a 200 status code it will be labeled in red. This is an example of a trace-based test that can assert against every single part of an HTTP transaction, including Kafka streams, and external API calls. (See image 2)

However, Tracetest cannot give you a historical overview of all test runs and distributed traces. Let's show how SigNoz makes it possible.

## Monitor Trace-based Tests Over Time with SigNoz

Because you are using two pipelines in the OpenTelemetry Collector, all distributed traces generated will be stored in SigNoz. Additionally, if you configure the Tracetest server with <a href = "https://docs.tracetest.io/configuration/telemetry" rel="noopener noreferrer nofollow" target="_blank">Internal Telemetry</a>, you will see the traces the Tracetest server generates in SigNoz. Using the example above, traces from the services in the Pokeshop API will be stored in SigNoz with a defined **Service Name** property, while the traces from Tracetest will be stored with the “tracetest” **Service Name**.

Data in the Tracetest service will give you insight into every test run. Start by running this query in the Tracetest service to filter all Tracetest test runs.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715807/Blogposts/signoz-integration/new/image_57_lzugvy.webp" alt="Image 8: Filter “Tracetest trigger” traces."/>
<figcaption><i>Image 8: Filter “Tracetest trigger” traces.</i></figcaption></figure>


The distributed traces chart will be filtered and display performance over time.

<figure data-zoomable align='center'>
<img src="https://res.cloudinary.com/djwdcmwdz/image/upload/v1697715805/Blogposts/signoz-integration/new/image_58_tlqtqa.webp" alt="Image 9: Show the results of the filter above. View the chart to see performance and select a distinct trace to drill down."/>
<figcaption><i>Image 9: Show the results of the filter above. View the chart to see performance and select a distinct trace to drill down.</i></figcaption></figure>


From here, you can drill down into the specific trace to troubleshoot. Open the **Tracetest trigger** trace. Choose a trace that is slow. Once open, the trace waterfall within SigNoz can help you pinpoint exactly which span is causing an issue. (Shown in Image 4, above)

## What's next?

Would you like to learn more about Tracetest and what it brings to the table? Check the [docs](https://docs.tracetest.io/examples-tutorials/recipes/running-tracetest-with-dynatrace) and try it out today by <a href = "https://tracetest.io/download" rel="noopener noreferrer nofollow" target="_blank">downloading</a> it today!

Also, please feel free to support <a href = "https://github.com/signoz/signoz" rel="noopener noreferrer nofollow" target="_blank">SigNoz</a> and <a href = "https://github.com/kubeshop/tracetest" rel="noopener noreferrer nofollow" target="_blank">Tracetest</a> by giving both a star on GitHub. ⭐
