---
id: jboss
title: JBoss OpenTelemetry Instrumentation
description: Instrument your JBoss application with OpenTelemetry and send data to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'


This document contains instructions on how to set up OpenTelemetry instrumentation in your JBoss applications. OpenTelemetry, also known as OTel for short, is an open source observability framework that can help you generate and collect telemetry data - traces, metrics, and logs from your JBoss application.

OpenTelemetry Java is the language-specific implementation of OpenTelemetry in Java that can be used to instrument JBoss applications.

Once the telemetry data is collected, you can configure an exporter to send the data to SigNoz.

There are three major steps to using OpenTelemetry:

- Instrumenting your JBoss application with OpenTelemetry
- Configuring exporter to send data to SigNoz
- Validating that configuration to ensure that data is being sent as expected.


<figure data-zoomable align='center'>
    <img src="/img/docs/opentelemetry_java_instrument.webp" alt="OpenTelemetry helps to generate and collect telemetry data from your application which is then sent to an observability backend like SigNoz"/>
    <figcaption><i>OpenTelemetry helps generate and collect telemetry data from JBoss applications which can then be sent to SigNoz for storage, visualization, and analysis.</i></figcaption></figure>
<br></br>

There are two types of application instrumentation:

- **Auto Instrumentation**<br></br>
A completely automatic and out of box experience, with minimal code changes. For your JBoss application, we recommend getting started with auto instrumentation.

- **Manual Instrumentation**<br></br>
It involves writing instrumentation using OpenTelemetry SDK and API manually. You would need to get a handle to an instance of the `OpenTelemetry` interface, acquire a tracer, and create spans manually.

Let’s understand how to download, install, and run OpenTelemetry in a JBoss application.


## Requirements

Java 8 or higher

## Traces

You can use OpenTelemetry Java to send your traces directly to SigNoz. OpenTelemetry provides a **handy Java JAR agent** that can be attached to any Java 8+ application and dynamically injects bytecode to capture telemetry from a number of popular libraries and frameworks. 

### Steps to auto-instrument JBoss applications for traces

OpenTelemetry Java auto-instrumentation supports collecting telemetry data from a huge number of libraries and frameworks. You can check out the full list [here](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md).

1. **Download the latest OpenTelemetry Java JAR agent**<br></br>
   Download the latest [Java JAR agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar). You can also use the terminal to get the file using the following command:
   
   ```bash
    wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
    ```

2. **Open the configuration file**<br></br>

   ```bash
   vim /opt/jboss-eap-7.1/bin/standalone.conf
   ```
    
3. **Update `JAVA_OPTS` environment variable**<br></br>
   Update `JAVA_OPTS` environment variable with configurations required for OpenTelemetry in your configuration file.
   
   ```bash
   JAVA_OPTS="-javaagent:/path/opentelemetry-javaagent.jar
   -Dotel.exporter.otlp.endpoint=http://<IP of SigNoz Backend>:4317
   -Dotel.resource.attributes="service.name=<app_name>""
   ```
   You need to replace the following things based on your environment:<br></br>
   `path` - Update it to the path of your downloaded Java JAR agent.<br></br>
   `IP of SigNoz Backend` - This is the endpoint of the machine where SigNoz is installed.<br></br>
   `app_name` - Replace it with your app name. It will show up under the list of `Services` in SigNoz.

   Here’s a handy [grid](https://signoz.io/docs/instrumentation/troubleshoot-instrumentation/) to figure out which address to use to send data to SigNoz.
   
4. **[Optional] Write the output/logs of standalone.sh script to a file nohup.out as a background thread**<br></br>
   
   ```bash
   /opt/jboss-eap-7.1/bin/standalone.sh > /opt/jboss-eap-7.1/bin/nohup.out &
   ```
    
:::note
💡 Remember to allow incoming requests to port 4317 of the machine where SigNoz backend is hosted.
:::

### Validating instrumentation by checking for traces

With your application running, you can verify that you’ve instrumented your application with OpenTelemetry correctly by confirming that tracing data is being reported to SigNoz.

To do this, you need to ensure that your application generates some data. Applications will not produce traces unless they are being interacted with, and OpenTelemetry will often buffer data before sending. So you need to interact with your application and wait for some time to see your tracing data in SigNoz.

Validate your traces in SigNoz:

1. Trigger an action in your app that generates a web request. Hit the endpoint a number of times to generate some data. Then, wait for some time.
2. In SigNoz, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`.
3. Go to the `Traces` tab, and apply relevant filters to see your application’s traces.

You might see other dummy applications if you’re using SigNoz for the first time. You can remove it by following the docs [here](https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application).

<figure data-zoomable align='center'>
    <img src="/img/docs/java_app_services_list.webp" alt="Java Application in the list of services being monitored in SigNoz"/>
    <figcaption><i>Java Application in the list of services being monitored in SigNoz</i></figcaption></figure>
<br></br>

### Configuring the agent

The agent is highly configurable. You can check out all the configuration options available [here](https://opentelemetry.io/docs/instrumentation/java/automatic/agent-config/).

### Disabled instrumentations

Some instrumentations can produce too many spans and make traces very noisy. For this reason, the following instrumentations are disabled by default:

- `jdbc-datasource` which creates spans whenever the `java.sql.DataSource#getConnection` method is called.
- `dropwizard-metrics`, which might create very low-quality metrics data because of the lack of label/attribute support in the Dropwizard metrics API.

To enable them, add the `otel.instrumentation.<name>.enabled` system property: `-Dotel.instrumentation.jdbc-datasource.enabled=true`

### Manual Instrumentation

For manual instrumentation of Java application, refer to the docs [here](https://opentelemetry.io/docs/instrumentation/java/manual/).


<!-- Get up and running with OpenTelemetry in just a few quick steps! The setup process consists of two phases--getting OpenTelemetry installed and configured, and then validating that configuration to ensure that data is being sent as expected. This guide explains how to download, install, and run OpenTelemetry in Java.

We follow [OpenTelemetry java instrumentation library](https://github.com/open-telemetry/opentelemetry-java-instrumentation). **We shall be exporting data in OTLP format.**

### Getting Started

Download the [latest version](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar).

This package includes the instrumentation agent as well as instrumentations for all supported libraries and all available data exporters. The package provides a completely automatic, out-of-the-box experience.

Enable the instrumentation agent using the -javaagent flag to the JVM.

<p>&nbsp;</p>

### For Java applications packaged as JAR files

If you run your Java application as a JAR file, please follow the below instruction


```bash
OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> java -javaagent:/path/opentelemetry-javaagent.jar -jar  <myapp>.jar
```

where <app_name> is the name you want to set for your application. `path` should be updated to the path of downloaded Java JAR agent.

You can also specify environment variables in the following way

```bash
java -javaagent:/path/opentelemetry-javaagent.jar \
    -Dotel.metrics.exporter=none \
    -Dotel.exporter.otlp.endpoint=http://<IP of SigNoz Backend>:4317 \
    -Dotel.resource.attributes=service.name=<app_name> \
    -jar <myapp>.jar
```

:::note
Remember to allow incoming requests to port 4317 of machine where SigNoz backend is hosted
:::

If you want to try out SigNoz with a sample Java application, visit this [GitHub repo](https://github.com/SigNoz/spring-petclinic).

 -->

## Troubleshooting your installation

If spans are not being reported to SigNoz, try running in debug mode by setting `OTEL_LOG_LEVEL=debug`:

The debug log level will print out the configuration information. It will also emit every span to the console, which should look something like:

```bash

Span {
  attributes: {},
  links: [],
  events: [],
  status: { code: 0 },
  endTime: [ 1597810686, 885498645 ],
  _ended: true,
  _duration: [ 0, 43333 ],
  name: 'bar',
  spanContext: {
    traceId: 'eca3cc297720bd705e734f4941bca45a',
    spanId: '891016e5f8c134ad',
    traceFlags: 1,
    traceState: undefined
  },
  parentSpanId: 'cff3a2c6bfd4bbef',
  kind: 0,
  startTime: [ 1597810686, 885455312 ],
  resource: Resource { labels: [Object] },
  instrumentationLibrary: { name: 'example', version: '*' },
  _logger: ConsoleLogger {
    debug: [Function],
    info: [Function],
    warn: [Function],
    error: [Function]
  },
  _traceParams: {
    numberOfAttributesPerSpan: 32,
    numberOfLinksPerSpan: 32,
    numberOfEventsPerSpan: 128
  },
  _spanProcessor: MultiSpanProcessor { _spanProcessors: [Array] }
},
```

<p>&nbsp;</p>

<InstrumentationFAQ />
