---
id: java
title: Java
description: Send events from your Java application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>


Get up and running with OpenTelemetry in just a few quick steps! The setup process consists of two phases--getting OpenTelemetry installed and configured, and then validating that configuration to ensure that data is being sent as expected. This guide explains how to download, install, and run OpenTelemetry in Java.

We follow [OpenTelemetry java instrumentation library](https://github.com/open-telemetry/opentelemetry-java-instrumentation). **We shall be exporting data in OTLP format.**

### Getting Started

Download the [latest version](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar).

This package includes the instrumentation agent as well as instrumentations for all supported libraries and all available data exporters. The package provides a completely automatic, out-of-the-box experience.

Enable the instrumentation agent using the -javaagent flag to the JVM.

<p>&nbsp;</p>

### For Java applications packaged as JAR files

If you run your Java application as a JAR file, please follow the below instruction

<!-- <Tabs
  defaultValue="self-hosted"
  groupId="hosting-options"
  values={[
    { label: "Self Hosted", value: "self-hosted" },
    { label: "Cloud", value: "cloud" },
  ]}
>
  <TabItem value="self-hosted"> -->

```bash
OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> java -javaagent:/path/opentelemetry-javaagent.jar -jar  <myapp>.jar
```

where <app_name> is the name you want to set for your application. `path` should be updated to the path of downloaded Java JAR agent.

You can also specify environment variables in the following way

```bash
java -javaagent:/path/opentelemetry-javaagent.jar \
    -Dotel.metrics.exporter=none \
    -Dotel.exporter.otlp.endpoint=http://<IP of SigNoz Backend>:4317 \
    -Dotel.resource.attributes="service.name=<app_name>" \
    -jar <myapp>.jar
```

:::note
Remember to allow incoming requests to port 4317 of machine where SigNoz backend is hosted
:::

If you want to try out SigNoz with a sample Java application, visit this [GitHub repo](https://github.com/SigNoz/spring-petclinic).

<!-- </TabItem>
  <TabItem value="cloud">

```bash
OTEL_EXPORTER_OTLP_ENDPOINT="ingest.signoz.io:443" OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=<access_token>" java -javaagent:/path/to/opentelemetry-javaagent-all.jar -jar  <myapp>.jar
```

_<app_name>_ is the name you want to set for your application

_<access_token>_ can be found in your settings page as shown in below image

![access_token_settings_page](../../static/img/access_token_settings_page.png)
</TabItem>

</Tabs> -->

<p>&nbsp;</p>

### Tomcat Instrumentation

For Tomcat application, you need to make sure the following environment variables are set up.

If you run your `.war` package by putting in `webapps` folder, just add `setenv.sh` in your Tomcat `bin` folder.

This should set these environment variables and start sending telemetry data to SigNoz backend specified in the IP

```bash

export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/opentelemetry-javaagent.jar"
export OTEL_METRICS_EXPORTER=none
export OTEL_EXPORTER_OTLP_ENDPOINT=http://<IP of SigNoz Backend>:4317
export OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name>

```

where `app_name` is the name you want to set for your application
and `IP of SigNoz Backend` is the IP where SigNoz backend is accessible

<p>&nbsp;</p>


Here's a video on how to instrument Tomcat applications with SigNoz and a [blog](https://signoz.io/opentelemetry/tomcat/) with step by step instructions.

<LiteYoutubeEmbed id="4obQilMqU4E" mute={false} />

<p>&nbsp;</p>

### Troubleshooting your installation

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

