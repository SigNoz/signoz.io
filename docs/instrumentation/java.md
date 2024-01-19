---
id: java
title: Java OpenTelemetry Instrumentation
description: Send events from your Java application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'


This document contains instructions on how to set up OpenTelemetry instrumentation in your Java applications. OpenTelemetry, also known as OTel for short, is an open source observability framework that can help you generate and collect telemetry data - traces, metrics, and logs from your Java application.

OpenTelemetry Java is the language-specific implementation of OpenTelemetry in Java.

Once the telemetry data is collected, you can configure an exporter to send the data to SigNoz.

There are three major steps to using OpenTelemetry:

- Instrumenting your Java application with OpenTelemetry
- Configuring exporter to send data to SigNoz
- Validating that configuration to ensure that data is being sent as expected.

<figure data-zoomable align='center'>
    <img src="/img/docs/opentelemetry_java_instrument.webp" alt="OpenTelemetry helps to generate and collect telemetry data from your application which is then sent to an observability backend like SigNoz"/>
    <figcaption><i>OpenTelemetry helps generate and collect telemetry data from Java applications which can then be sent to SigNoz for storage, visualization, and analysis.</i></figcaption></figure>
<br></br>

There are two types of application instrumentation:

- **Auto Instrumentation**<br></br>
A completely automatic and out of box experience, with minimal code changes. For your Java application, we recommend getting started with auto instrumentation.

:::info

  If you are on K8s, you should checkout [opentelemetry operators](/docs/tutorial/opentelemetry-operator-usage/#opentelemetry-auto-instrumentation-injection) which enable auto instrumenting Java applications very easily.

:::

- **Manual Instrumentation**<br></br>
It involves writing instrumentation using OpenTelemetry SDK and API manually. You would need to get a handle to an instance of the `OpenTelemetry` interface, acquire a tracer, and create spans manually. Manual isntrumentation might also be used along with auto instrumentation.

Let’s understand how to download, install, and run OpenTelemetry in Java. If you're using SigNoz cloud, refer to this [section](#send-traces-to-signoz-cloud). If you're using self-hosted SigNoz refer to this [section](#send-traces-to-self-hosted-signoz).

## Requirements

Java 8 or higher

## Send Traces to SigNoz Cloud

OpenTelemetry provides a handy Java JAR agent that can be attached to any Java 8+ application and dynamically injects bytecode to capture telemetry from a number of popular libraries and frameworks.

Based on your application environment, you can choose the setup below to send traces to SigNoz Cloud.

<Tabs>
<TabItem value="vm" label="VM" default>

From VMs, there are two ways to send data to SigNoz Cloud.

- [Send traces directly to SigNoz Cloud](#send-traces-directly-to-signoz-cloud)
- [Send traces via OTel Collector binary](#send-traces-via-otel-collector-binary) (recommended)

#### **Send traces directly to SigNoz Cloud**
OpenTelemetry Java agent can send traces directly to SigNoz Cloud.
  
Step 1. Download otel java binary agent

```bash
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

Step 2. Run your application

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> \
OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=SIGNOZ_INGESTION_KEY" \
OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.{region}.signoz.cloud:443 \
java -javaagent:$PWD/opentelemetry-javaagent.jar -jar <my-app>.jar
```
- `<app_name>` is the name for your application
- `SIGNOZ_INGESTION_KEY` is the API token provided by SigNoz. You can find your ingestion key from SigNoz cloud account details sent on your email.

Depending on the choice of your region for SigNoz cloud, the ingest endpoint will vary according to this table.

| Region | Endpoint |
| --- | --- |
| US |	ingest.us.signoz.cloud:443 |
| IN |	ingest.in.signoz.cloud:443 |
| EU | ingest.eu.signoz.cloud:443 |

In case you encounter an issue where all applications do not get listed in the services section then please refer to the [troubleshooting section](#troubleshooting-your-installation).

---

#### **Send traces via OTel Collector binary**

OTel Collector binary helps to collect logs, hostmetrics, resource and infra attributes. It is recommended to install Otel Collector binary to collect and send traces to SigNoz cloud. You can correlate signals and have rich contextual data through this way.

You can find instructions to install OTel Collector binary [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) in your VM. Once you are done setting up your OTel Collector binary, you can follow the below steps for instrumenting your Java application.

Step 1. Download OTel java binary agent<br></br>
```bash
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

Step 2. Run your application<br></br>

```bash
java -javaagent:$PWD/opentelemetry-javaagent.jar -jar <myapp>.jar
```

- `<myapp>` is the name of your application jar file
- In case you download `opentelemetry-javaagent.jar` file in different directory than that of the project, replace `$PWD` with the path of the otel jar file.

In case you encounter an issue where all applications do not get listed in the services section then please refer to the [troubleshooting section](#troubleshooting-your-installation).
  
</TabItem>
<TabItem value="k8s" label="Kubernetes">

For Java application deployed on Kubernetes, you need to install OTel Collector agent in your k8s infra to collect and send traces to SigNoz Cloud. You can find the instructions to install OTel Collector agent [here](/docs/tutorial/kubernetes-infra-metrics/).

Once you have set up OTel Collector agent, you can proceed with OpenTelemetry java instrumentation by following the below steps:

1. Download otel java binary<br></br>

   ```bash
   wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
   ```

2. Run your application<br></br>
   
   ```bash
   java -javaagent:$PWD/opentelemetry-javaagent.jar -jar <myapp>.jar
   ```

   - `<myapp>` is the name of your application jar file
   - In case you download `opentelemetry-javaagent.jar` file in different directory than that of the project, replace `$PWD` with the path of the otel jar file.

3. Make sure to dockerise your application along with OpenTelemetry instrumentation.

You can validate if your application is sending traces to SigNoz cloud by following the instructions [here](#validating-instrumentation-by-checking-for-traces).

In case you encounter an issue where all applications do not get listed in the services section then please refer to the [troubleshooting section](#troubleshooting-your-installation).
  
</TabItem>
</Tabs>

## Send Traces to Self-Hosted SigNoz

You can use OpenTelemetry Java to send your traces directly to SigNoz. OpenTelemetry provides a **handy Java JAR agent** that can be attached to any Java 8+ application and dynamically injects bytecode to capture telemetry from a number of popular libraries and frameworks. 

### Steps to auto-instrument Java applications for traces

OpenTelemetry Java auto-instrumentation supports collecting telemetry data from a huge number of libraries and frameworks. You can check out the full list [here](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md).

1. **Download the latest OpenTelemetry Java JAR agent**<br></br>
   Download the latest [Java JAR agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar). You can also use the terminal to get the file using the following command:
   
   ```bash
    wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
    ```
    

2. **Enable the instrumentation agent and run your application**<br></br>
   If you run your Java application as a JAR file, run your application using the following command:
    
    ```bash
    OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> java -javaagent:/path/to/opentelemetry-javaagent.jar -jar  <myapp>.jar
    ```
    
    where <app_name> is the name you want to set for your application. `path` should be updated to the path of the downloaded Java JAR agent.<br></br>
    
    
    In the above command, we are configuring the exporter to send data to SigNoz backend. By default, OpenTelemetry Java agent uses [OTLP exporter](https://github.com/open-telemetry/opentelemetry-java/tree/main/exporters/otlp) configured to send data.<br></br>
    
    Two things to note about the command:<br></br>

    `OTEL_EXPORTER_OTLP_ENDPOINT` - This is the endpoint of the machine where SigNoz is installed.

    `path/to` -  Update it to the path of your downloaded Java JAR agent.<br></br>
    
    If you have installed SigNoz on your `localhost` and your Java JAR agent is saved at `/Users/john/Downloads/`, then the final command looks like:<br></br>
    
    ```bash
    OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/Users/john/Downloads/opentelemetry-javaagent.jar -jar target/*.jar
    ```
    
    Here’s a handy [grid](https://signoz.io/docs/instrumentation/troubleshoot-instrumentation/) to figure out which address to use to send data to SigNoz.
    
    You can also specify environment variables in the following way:
    
    ```bash
    java -javaagent:/path/opentelemetry-javaagent.jar \
        -Dotel.exporter.otlp.endpoint=http://<IP of SigNoz Backend>:4317 \
        -Dotel.resource.attributes=service.name=<app_name> \
        -jar <myapp>.jar
    ```
    

:::note
💡 Remember to allow incoming requests to port 4317 of the machine where SigNoz backend is hosted.
:::

In case you encounter an issue where all applications do not get listed in the services section then please refer to the [troubleshooting section](#troubleshooting-your-installation).

## Validating instrumentation by checking for traces

With your application running, you can verify that you’ve instrumented your application with OpenTelemetry correctly by confirming that tracing data is being reported to SigNoz.

To do this, you need to ensure that your application generates some data. Applications will not produce traces unless they are being interacted with, and OpenTelemetry will often buffer data before sending. So you need to interact with your application and wait for some time to see your tracing data in SigNoz.

Validate your traces in SigNoz:

1. Trigger an action in your app that generates a web request. Hit the endpoint a number of times to generate some data. Then, wait for some time.
2. In SigNoz, open the `Services` tab. Hit the `Refresh` button on the top right corner, and your application should appear in the list of `Applications`. Ensure that you're checking data for the `time range filter` applied in the top right corner.
3. Go to the `Traces` tab, and apply relevant filters to see your application’s traces.

You might see other dummy applications if you’re using self-hosted SigNoz for the first time. You can remove it by following the docs [here](https://signoz.io/docs/operate/docker-standalone/#remove-the-sample-application).

<figure data-zoomable align='center'>
    <img src="/img/docs/java_app_services_list.webp" alt="Java Application in the list of services being monitored in SigNoz"/>
    <figcaption><i>Java Application in the list of services being monitored in SigNoz</i></figcaption></figure>
<br></br>

If you don't see your application reported in the list of services, try our [troubleshooting](https://signoz.io/docs/install/troubleshooting/) guide.

## Configuring the agent

The agent is highly configurable. You can check out all the configuration options available [here](https://opentelemetry.io/docs/instrumentation/java/automatic/agent-config/).

## Disabled instrumentations

Some instrumentations can produce too many spans and make traces very noisy. For this reason, the following instrumentations are disabled by default:

- `jdbc-datasource` which creates spans whenever the `java.sql.DataSource#getConnection` method is called.
- `dropwizard-metrics`, which might create very low-quality metrics data because of the lack of label/attribute support in the Dropwizard metrics API.

To enable them, add the `otel.instrumentation.<name>.enabled` system property: `-Dotel.instrumentation.jdbc-datasource.enabled=true`

## Manual Instrumentation

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
OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> java -javaagent:/path/opentelemetry-javaagent.jar -jar  <myapp>.jar
```

where <app_name> is the name you want to set for your application. `path` should be updated to the path of downloaded Java JAR agent.

You can also specify environment variables in the following way

```bash
java -javaagent:/path/opentelemetry-javaagent.jar \
    -Dotel.exporter.otlp.endpoint=http://<IP of SigNoz Backend>:4317 \
    -Dotel.resource.attributes=service.name=<app_name> \
    -jar <myapp>.jar
```

:::note
Remember to allow incoming requests to port 4317 of machine where SigNoz backend is hosted
:::

If you want to try out SigNoz with a sample Java application, visit this [GitHub repo](https://github.com/SigNoz/spring-petclinic).

 -->

<!-- ## Tomcat Instrumentation

For Tomcat application, you need to make sure the following environment variables are set up.

If you run your `.war` package by putting in `webapps` folder, just add `setenv.sh` in your Tomcat `bin` folder.

This should set these environment variables and start sending telemetry data to SigNoz backend specified in the IP

```bash

export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/opentelemetry-javaagent.jar"
export OTEL_EXPORTER_OTLP_ENDPOINT=http://<IP of SigNoz Backend>:4317
export OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name>

```

where `app_name` is the name you want to set for your application
and `IP of SigNoz Backend` is the IP where SigNoz backend is accessible

<p>&nbsp;</p>


Here's a video on how to instrument Tomcat applications with SigNoz and a [blog](https://signoz.io/opentelemetry/tomcat/) with step by step instructions.

<LiteYoutubeEmbed id="4obQilMqU4E" mute={false} />

<p>&nbsp;</p> -->


## Instrumentation using Otel buildpack (paketo) for Java

1. **Clone OTel buildpack repo:**<br></br>
     
     ```bash
     git clone --single-branch --depth 1 https://github.com/paketo-buildpacks/opentelemetry.git
     ```

2. **Switch to config-binding branch:**<br></br>
   
   ```bash
   git checkout config-binding
   ```

3. **Run the following command:**<br></br>
   
   ```bash
   scripts/build.sh
   ```

4. **Now run below command to build a pack:**<br></br>
    
    ```bash
    pack build paketo-demo-app \
      --path /Users/makeavish/samples/java/maven \
      --buildpack paketo-buildpacks/java \
      --buildpack . \
      --builder paketobuildpacks/builder:base \
      --verbose --trust-builder \
      -e BP_JVM_VERSION=17 -e BP_OPENTELEMETRY_ENABLED=true
    ```
    
5. Pass environment variables to enable java agent `OTEL_JAVAAGENT_ENABLED=true` set exporter endpoint `OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317` and set service name `OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp`

6. Other otel configurations can be updated by passing more environment variables. Refer to <a href = "https://opentelemetry.io/docs/instrumentation/java/automatic/agent-config/" rel="noopener noreferrer nofollow" target="_blank" >official docs</a> for more such configurations.

7. Run docker command:
    
    ```bash
    docker run -d -p 8080:8080 -e PORT=8080 -e OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317 -e OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp -e OTEL_JAVAAGENT_ENABLED=true paketo-demo-app
    ```

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

## Sample Java Application

- We have included a sample Java application with README.md at [Sample Java App Github Repo.](https://github.com/SigNoz/distributed-tracing-java-sample)

<InstrumentationFAQ />
