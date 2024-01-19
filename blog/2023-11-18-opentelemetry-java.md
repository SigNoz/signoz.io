---
title: OpenTelemetry Java Tutorial | Auto-Instrument Java App with OpenTelemetry
slug: opentelemetry-java
date: 2023-11-18
tags: [OpenTelemetry]
authors: daniel
description: OpenTelemetry Java SDKs can be used to monitor a Java application for performance. You can use OpenTelemetry instrumentation libraries to generate traces. OpenTelemetry collector can help you collect JVM metrics...
image: /img/blog/2023/11/opentelemetry-java-cover.jpeg
hide_table_of_contents: true
keywords:
  - opentelemetry
  - signoz
  - java
  - observability
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-java/"/>
</head>

OpenTelemetry stands at the forefront of modern observability practices, revolutionizing how developers gain insights into their applications' performance and behavior. As a powerful distributed tracing framework, it empowers engineers to effortlessly instrument their applications, providing comprehensive visibility into the intricacies of microservices architectures.

<!--truncate-->

![Cover Image](/img/blog/2023/11/opentelemetry-java-cover.webp)


This tutorial discusses how OpenTelemetry can be used to get insights from a Java application.

## What is OpenTelemetry?

OpenTelemetry is an open-source collection of tools, APIs, and SDKs that aims to standardize the way we generate and collect telemetry data. It follows a specification-driven development. The <a href = "https://github.com/open-telemetry/opentelemetry-specification" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry specification</a> has design and implementation guidelines for how the instrumentation libraries should be implemented. In addition, it provides client libraries in all the major programming languages that follow the specification.

OpenTelemetry was formed after the merger of two open-source projects - OpenCensus and OpenTracing in 2019. Since then, it has been the go-to open-source standard for instrumenting cloud-native applications.

The specification is designed into distinct types of telemetry known as signals. Presently, OpenTelemetry has specifications for these three signals:

- Logs
- Metrics and
- Traces

Together, these three signals form the three pillars of observability. OpenTelemetry is the bedrock for setting up an observability framework. The application code is instrumented using OpenTelemetry client libraries, which enables the generation of telemetry data. Once the telemetry data is generated and collected, you need to configure the OpenTelemetry exporter to send data to a backed analysis tool like [SigNoz](https://signoz.io/).

## Instrumenting a sample Java app for traces

In this section, you will learn to instrument a Java application with OpenTelemetry to get traces.

### Prerequisite

- A [SigNoz Cloud](https://signoz.io/teams/) account
- Java 8 or newer (full JDK, not a JRE)
- <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry Jar agent</a>, latest version.

You need a backend to which you can send the collected data for monitoring and visualization. [SigNoz](https://signoz.io/) is an OpenTelemetry-native APM that is well-suited for visualizing OpenTelemetry data.

SigNoz cloud is the easiest way to run SigNoz. You can sign up [here](https://signoz.io/teams/) for a free account and get 30 days of free uncapped usage.

You can also install and self-host SigNoz yourself. Check out the [docs](https://signoz.io/docs/install/) for installing self-host SigNoz.

### Install the OpenTelemetry Jar agent

To instrument your Java application, the OpenTelemetry Java Jar agent will be utilized. The JAR agent can be attached to any Java 8+ application. It can detect a number of <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md" rel="noopener noreferrer nofollow" target="_blank">popular libraries and frameworks</a> and instrument them right out of the box. You don't need to add any code for that.


To download the Java Jar agent, run the below command in your terminal:

```
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

**Note:** The path to where the Jar file was downloaded will be used later, so note it down somewhere. 

### Set up the Java application

A sample Java application has been provided. Run the below commands to set it up:

```jsx
# Clone the Spring PetClinic repository from SigNoz's GitHub
git clone --single-branch --depth 1 https://github.com/SigNoz/spring-petclinic

# Change into the cloned directory
cd spring-petclinic

# Use Maven Wrapper to package the Spring PetClinic application
./mvnw package

# Run the Spring PetClinic application using the generated JAR file
java -jar target/*.jar
```

You can access the running app at [localhost:8090](http://localhost:8090) 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/petclinic-welcome.webp" alt="petclinic welcome screen"/>
    <figcaption><i></i></figcaption>
</figure>


### Setting up auto-instrumentation for Java application

To auto-instrument the application, the Jar agent for instrumentation needs to be enabled. This helps in generating traces from the application, and the generated traces need to be sent to a backend for visualization. Here, the SigNoz cloud will serve as the backend for visualization.

To enable auto instrumentation, run the below command:

```jsx
OTEL_LOGS_EXPORTER=otlp OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.{region}.signoz.cloud:443" OTEL_EXPORTER_OTLP_HEADERS=signoz-access-token={your-ingestion-key} OTEL_RESOURCE_ATTRIBUTES=service.name=java-app java -javaagent:/path/opentelemetry-javaagent.jar -jar target/*.jar
```

Note:

- Replace `/path/opentelemetry-javaagent.jar` with the path from which the OpenTelemetry Java Jar agent was downloaded.
- Replace `{region}` with the region you selected when creating your SigNoz Cloud account.
- Replace `{your-ingestion-key}` with the ingestion key sent to your email address after the creation of your SigNoz Cloud account.

| Region | Endpoint |
| --- | --- |
| US | ingest.us.signoz.cloud:443 |
| IN | ingest.in.signoz.cloud:443 |
| EU | ingest.eu.signoz.cloud:443 |

You can also find the ingestion details in SigNoz dashboard under the `Settings` tab.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/ingestion-key-details.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>


The application will be started again on the same address, localhost:8090, but this time, it will be able to send telemetry data to your SigNoz cloud account.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/java_app_running.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>


To see the application running in SigNoz, load the URL provided in the email sent to you during your SigNoz cloud account creation.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/java_service_list.webp" alt="java-app application being monitored in SigNoz"/>
    <figcaption><i>java-app application being monitored in SigNoz</i></figcaption>
</figure>
<br />

From the left side bar, click on the “Traces” tab to see traces from the application. Click on the “Try new Traces Explorer” button to use the new Traces Explorer.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/new_trace_explorer_button.webp" alt="Old Traces Explorer Page"/>
    <figcaption><i>Old Traces Explorer Page</i></figcaption>
</figure>
<br />


With this, you can run queries against your traces using the query builder.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/new_trace_explorer.webp" alt="New Traces Explorer Page"/>
    <figcaption><i>New Traces Explorer Page</i></figcaption>
</figure>
<br />

In the ‘Search Filter” input box, set your filter to ‘httpMethod=GET’ with the duration at 1hr and run the query. This will return every GET request that was generated within the last 1hr.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/query_builder_screen.webp" alt="Query being run using the query builder"/>
    <figcaption><i>Query being run using the query builder</i></figcaption>
</figure>
<br />

From the above image, no GET request was returned. This is because the Java application hasn’t been accessed at [localhost:8090](http://localhost:8090) yet. To generate an HTTP GET request, visit the application at [localhost:8090](http://localhost:8090) and try to refresh it one or two times. After that, on your SigNoz dashboard, still on the Traces Explorer page, change the duration to the ‘Last 5 min’, give it some time, and then run the same query again. You should see the GET requests you generated.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/traces_GET_request.webp" alt="GET requests returned from query"/>
    <figcaption><i>GET requests returned from query</i></figcaption>
</figure>
<br />

Click on the ‘Trace ID’ of any of the traces. From the below image, at the top, you can see the ‘Trace Details’ of that particular trace, showing that it has three spans, which were the GET requests.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/flamegraph_java_app.webp" alt="Flamegraph for a trace in SigNoz dashboard"/>
    <figcaption><i>Flamegraph for a trace in SigNoz dashboard</i></figcaption>
</figure>
<br />

Click on the ‘drop-down’ arrow to see each span and the duration.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/drop_down_more_spans.webp" alt="Drop down arrow to see the spans"/>
    <figcaption><i>Drop down arrow to see the spans</i></figcaption>
</figure>
<br />

To get more information from a span,  you can click on it. This provides you with the name of the Service that the span came from, the operation, and resource attributes.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/span_info.webp" alt="Information from spans"/>
    <figcaption><i>Information from spans</i></figcaption>
</figure>
<br />

SigNoz also uses the trace data to report key application metrics like p99 latency, request rates, and error rates with out-of-box charts and visualization.

## Conclusion

In this article, you learned to instrument a Java application with OpenTelemetry and visualize traces from the application using SigNoz, a full-stack observability backend solution.
SigNoz stands out as an excellent choice for robust observability needs, providing powerful tools to visualize telemetry data and address various observability requirements seamlessly.

Some of the things SigNoz can help you track:

- Application overview metrics like RPS, 50th/90th/99th Percentile latencies, and Error Rate
- Slowest endpoints in your application
- See exact request trace to figure out issues in downstream services, slow DB queries, call to 3rd party services like payment gateways, etc.
- Filter traces by service name, operation, latency, error, tags/annotations.
- Run aggregates on trace data
- Unified UI for both metrics and traces

---
## Further Reading

[SigNoz - An OpenTelemetry-native APM](https://signoz.io/blog/opentelemetry-apm/)

[Complete Guide to OpenTelemetry Logs](https://signoz.io/blog/opentelemetry-logs/)
