---
title: OpenTelemetry Java auto-instrumentation - Everything you need to know
slug: java-auto-instrumentation
date: 2021-08-17
tags: [java-monitoring]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: OpenTelemetry can be used to instrument Java apps automatically through a Java JAR agent. The agent recognizes popular libraries and frameworks and injects bytecode dynamically to instrument the code...
image: /img/blog/2021/08/opentelemetry_java_auto_instrumentation-min.png
keywords:
  - opentelemetry
  - opentelemetry tomcat
  - opentelemetry java
  - java instrumentation
  - java auto-instrumentation
  - signoz
---

OpenTelemetry auto instrumentation libraries are the best option for someone who doesn't want to modify their application code for generating telemetry data(logs, metrics, and traces). In this article, let's see what options does OpenTelemetry provides for auto-instrumenting your Java apps.

<!--truncate-->

![Cover image](/img/blog/2021/08/opentelemetry_java_auto_instrumentation-min.png)

OpenTelemetry is a set of tools, APIs, and SDKs which enables you to create and manage the telemetry data for your services and applications.

> **What is instrumentation?**
>
> Instrumentation means the ability to measure the performance and to diagnose errors in your application code. Instrumenting a piece of software means generating relevant data like logs, metrics, and traces to gauge the software's performance.

## What is OpenTelemetry Java auto instrumentation?

OpenTelemetry provides three repositories to instrument applications. The <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation" rel="noopener noreferrer nofollow" target="_blank" ><b>opentelemetry-java-instrumentation</b></a> repo contains the code for auto-instrumentation of Java applications.

The other two repos are:

- <a href = "https://github.com/open-telemetry/opentelemetry-java" rel="noopener noreferrer nofollow" target="_blank" ><b>opentelemetry-java</b></a> - contains components for manual instrumentation as well as the API and SDK.
- <a href = "https://github.com/open-telemetry/opentelemetry-java-contrib" rel="noopener noreferrer nofollow" target="_blank" ><b>opentelemetry-java-contrib</b></a> - contains libraries for standalone utilities which don't fit the scope of the other two projects.

The OpenTelemetry Java auto instrumentation repo provides a Java JAR agent that can be downloaded and attached to Java 8+ applications. The agent recognizes popular libraries and frameworks and injects bytecode dynamically to instrument the code.

## Steps to auto-instrument your Java application

The auto-instrumentation of Java applications by OpenTelemetry is achieved with the help of Java agents. The JVM provides a standard way for modifying code at runtime by using a java agent. Java agents come as part of the Java instrumentation API. It basically allows you to modify code at runtime without touching your code.

You can attach the Java agent to your application through your terminal (-javaagent). Java agents are fundamentally java classes following certain conventions. When the agents are attached to the application at runtime, JVM makes sure to execute it to modify what it specifies.

Now that you know how Java agent works, let's see how to use the Java agent provided by OpenTelemetry for auto-instrumentation.

1. Download the [latest Java Jar agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar).
2. Prepare environment variables needed for the Java agent. The common ones include a service name for the service being monitored, traces and metrics exporter format specifier, and an endpoint for collecting the captured data.
3. You need to export the captured data to an endpoint. You can use a full-stack open-source observability tool like [SigNoz](https://signoz.io/) as a backend to capture the data.

Examples of some of the environment variables to take care of:

```
OTEL_TRACES_EXPORTER=otlp
OTEL_EXPORTER_OTLP_ENDPOINT=<IP of SigNoz Backend>:4317
OTEL_RESOURCE_ATTRIBUTES="service.name=SERVICE_NAME"
```

Along with these environment variables, you need to attached the Java JAR agent downloaded. If you're running the app from your terminal, you can use the following command:

```
java -javaagent:/path/to/opentelemetry-javaagent-all.jar -jar target/*.jar
```

The path needs to be replaced with the address of the location where you have downloaded the saved the Java agent file. So the final command from terminal will look like this:

```
OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317"
OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp
java -javaagent:/Users/Downloads/to/opentelemetry-javaagent-all.jar -jar target/*.jar
```

If you want to read how to auto-instrument a sample Spring Boot application, and get the data reported with SigNoz, check out this article 👇 <br></br>
[Monitor your Spring Boot application with OpenTelemetry and SigNoz](https://signoz.io/blog/opentelemetry-spring-boot/)
