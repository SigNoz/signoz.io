---
title: 5 Steps to Integrate OpenTelemetry with Spring Boot Application
slug: opentelemetry-spring-boot
date: 2023-11-07
tags: [OpenTelemetry Instrumentation, Java]
authors: ankit_anand
description: End-to-end performance monitoring of Spring Boot application with OpenTelemetry. Set up distributed tracing, collect JVM metrics and logs from Spring Boot applications and visualize the collected data with open source APM - SigNoz.
image: /img/blog/2022/03/opentelemetry_spring_boot.jpeg
keywords:
  - OpenTelemetry
  - opentelemetry spring boot
  - OpenTelemetry java
  - Spring Boot
  - distributed tracing
  - jvm metrics
  - apm
  - application monitoring
---
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-spring-boot/"/>
</head>


OpenTelemetry can auto-instrument your Java Spring Boot application to capture telemetry data from a number of popular libraries and frameworks that your application might be using. It can be used to collect logs, metrics, and traces from your Spring Boot application. Let's learn how it works.

<!--truncate-->

![Cover Image](/img/blog/2023/11/opentelemetry-spring-boot-cover.webp)

OpenTelemetry is a vendor-agnostic instrumentation library that is used to generate telemetry data like logs, metrics, and traces. Using OpenTelemetry and SigNoz, you can collect logs, metrics, and traces and visualize everything under a single pane of glass. 

In this tutorial, you will auto-instrument a sample spring boot application for traces with OpenTelemetry Java Jar agent. You will also configure Micrometer and Spring Boot actuator to expose JVM metrics in Prometheus format. Lastly, we will also talk briefly about collecting logs from Spring Boot application using OpenTelemetry.

## What is OpenTelemetry?

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is a set of API, SDKs, libraries, and integrations aiming to standardize the generation, collection, and management of telemetry data(logs, metrics, and traces). OpenTelemetry is a Cloud Native Computing Foundation project created after the merger of OpenCensus(from Google) and OpenTracing(From Uber).

<br></br>

The data you collect with OpenTelemetry is vendor-agnostic and can be exported in many formats. Telemetry data has become critical to observe the state of distributed systems. With microservices and polyglot architectures, there was a need to have a global standard. OpenTelemetry aims to fill that space and is doing a great job at it thus far.

There are two important components in OpenTelemetry that comes in handy to collect telemetry data:

- **Client Libraries**<br></br>
    For Java applications, OpenTelemetry provides a JAR agent that can be attached to any Java 8+ application. It can detect a number of popular libraries and frameworks and instrument applications right out of the box for generating telemetry data.

- **OpenTelemetry Collector**<br></br>
    It is a stand-alone service provided by OpenTelemetry. It can be used as a telemetry-processing system with a lot of flexible configurations to collect and manage telemetry data.

Typically, here's how an application architecture instrumented with OpenTelemetry looks like.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/09/opentelemetry_architecture.webp" alt="OpenTelemetry Architecture"/>
    <figcaption><i>Architecture - How OpenTelemetry fits in an application architecture. OTel collector refers to OpenTelemetry Collector</i></figcaption>
</figure>

<br></br>

OpenTelemetry provides client libraries and agents for most of the popular programming languages. There are two types of instrumentation:

- **Auto-instrumentation**<br></br>
OpenTelmetry can collect data for many popular frameworks and libraries automatically. You don’t have to make any code changes.
- **Manual instrumentation**<br></br>
If you want more application-specific data, OpenTelemetry SDK provides you with the capabilities to capture that data using OpenTelemetry APIs and SDKs.


For Spring Boot applications, we can use the OpenTelemetry Java Jar agent. We just need to download the latest version of the Java Jar agent and run the application with it.


<figure data-zoomable align='center'>
    <img src="/img/docs/opentelemetry_java_instrument.webp" alt="OpenTelemetry helps to generate and collect telemetry data from your application which is then sent to an observability backend like SigNoz"/>
    <figcaption><i>OpenTelemetry helps generate and collect telemetry data from Spring Boot applications which can then be sent to SigNoz for storage, visualization, and analysis.</i></figcaption></figure>
<br></br>

OpenTelemetry does not provide storage and visualization layer for the collected data. The advantage of using OpenTelemetry is that it can export the collected data in many different formats. So you're free to choose your telemetry backend. Natively, OpenTelemetry supports a wire protocol known as `OTLP`. This protocol sends the data to OpenTelemetry Collector as shown in the diagram above.

In this tutorial, we will use [SigNoz](https://signoz.io/docs/), an open-source APM as the backend and visualization layer.

Steps to get started with OpenTelemetry for Spring Boot application:

- Installing SigNoz
- Installing sample Spring Boot app
- Auto instrumentation with OpenTelemetry and sending data to SigNoz

## Step 1 - Installing SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our [documentation](https://signoz.io/docs/install/) for instructions on how to install SigNoz using various methods.

You can also sign up for [SigNoz cloud](https://signoz.io/teams/). The cloud version gives you access to some paid-only features as well as customer support. You can try SigNoz cloud for free for 30 days.

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure data-zoomable>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

## Step 2 - Installing Sample Spring Boot application

If you don't have Java installed, first install it from the <a href = "https://www.java.com/en/" rel="noopener noreferrer nofollow" target="_blank" >official website</a>.

For this tutorial, we will use a sample Spring Boot application built using Maven. You can find the code for the application at its <a href = "https://github.com/SigNoz/spring-petclinic" rel="noopener noreferrer nofollow" target="_blank" >GitHub repo</a>.

**Git clone the repository and go to the root folder**

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/spring-petclinic.git
cd spring-petclinic
```


**Run the application using the following commands.**

```
./mvnw package
java -jar target/*.jar
```

You can now access the application UI here: [http://localhost:8090/](http://localhost:8090/)

<figure data-zoomable>
    <img src="/img/blog/2022/03/spring_boot_app.webp" alt="Spring PetClinic app accessed at port:8090"/>
    <figcaption><i>Sample Spring Boot application running in your local host.</i></figcaption>
</figure>

<br></br>

Once you ensure that your application runs fine, stop it with `ctrl + c` on mac, as we will be launching the application with the Java agent downloaded from OpenTelemetry.

## Step 3 - Downloading OpenTelemetry Java Jar agent

Download the [latest Java JAR agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar). You will need the path of this file, so note it down somewhere. You can also use the terminal to get this file using the following command:

```
wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

OpenTelemetry Java JAR agent can be attached to any Java 8+ application. The JAR agent can detect a number of <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md" rel="noopener noreferrer nofollow" target="_blank" >popular libraries and frameworks</a> and instrument it right out of the box. You don't need to add any code for that.

The auto-instrumentation takes care of generating traces from the application. SigNoz uses the trace data to report key application metrics like p99 latency, request rates, and error rates with out-of-box charts and visualization. Let's learn how to enable auto-instrumentation.

## Step 4 - Running the application with relevant environment variables

Now you need to enable the instrumentation agent as well as run your sample application. You can do so by the following command:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/path/opentelemetry-javaagent.jar -jar target/*.jar
```

<br></br>As you are running this on your local host, you need to replace `IP of SigNoz` with `localhost`. You will also need to update the path for your downloaded Java JAR agent. You will replace following two things:

- `IP of SigNoz` : `localhost`
- `/path/to` :  `Users/cruxaki/Downloads` (For my local)

Your final command will look like this:
```bash
OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/Users/cruxaki/Downloads/opentelemetry-javaagent.jar -jar target/*.jar
```

<br></br>Note the path is updated for my local environment. If you are using a virtual machine, you need to update the IP accordingly. You also need to have the Java JAR agent on the same machine.

You can also use `-D` option to install the java agent.

```bash
java -javaagent:/path/opentelemetry-javaagent.jar \
-Dotel.exporter.otlp.endpoint=http://<IP of SigNoz>:4317 \
-Dotel.resource.attributes=service.name=<service_name> \
-jar target/*.jar
```

## Step 5 - Monitoing your Spring Boot Application in SigNoz

Check out the Spring Pet Clinic app at: [http://localhost:8090/](http://localhost:8090/) and play around with it to generate some load. You can try refreshing the endpoint multiple times to generate load. Now you open the `Services` tab of SigNoz dashboard to see your Spring Boot Application being monitored.

Below you can find your javaApp in the list of applications being monitored.

<figure data-zoomable>
    <img src="/img/blog/2022/03/java_app_signoz_dashboard.webp" alt="`Javaapp` appears in the list of applications monitored through SigNoz"/>
    <figcaption><i>javaApp in the list of applications monitored</i></figcaption>
</figure>

<br></br>

## Application Metrics and Traces of the Spring Boot application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<figure data-zoomable>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz dashboard showing application latency, requests per sec, error percentage and top endpoints"/>
    <figcaption><i>Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz.</i></figcaption>
</figure>

<br></br>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<figure data-zoomable>
    <img src="/img/blog/common/signoz_list_of_traces_hc.webp" alt="List of traces shown on SigNoz dashboard"/>
    <figcaption><i>View of traces at a particular timestamp</i></figcaption>
</figure>

<br></br>

You can use flamegraphs to exactly identify the issue causing the latency.

<figure data-zoomable>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Flamegraphs and gantt charts to visualize time taken by requests"/>
    <figcaption><i>Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing</i></figcaption>
</figure>

<br></br>

You can also build custom metrics dashboard for your infrastructure.

<figure data-zoomable>
    <img src="/img/blog/common/signoz_custom_dashboard-min.webp" alt="SigNoz custom metrics dashboard"/>
    <figcaption><i>You can also build a custom metrics dashboard for your infrastructure</i></figcaption>
</figure>

<br></br>


## Collecting JVM metrics from your Spring Boot application


This section shows you how you can visualise JVM metrics from Spring Boot applications in SigNoz.

We use Micrometer and Spring Boot actuator to expose JVM metrics in Prometheus format. Then we update OpenTelemetry collector  which comes pre-installed with SigNoz to be able to scrape these metrics.

You can then plot the JVM metrics relevant for your team by creating custom dashboards in SigNoz.

You can use a sample Spring Boot application at this <a href = "https://github.com/SigNoz/spring-petclinic" rel="noopener noreferrer nofollow" target="_blank" >GitHub repo</a>.

### Steps to monitor JVM metrics

### Changes required in your Spring Boot application

1. **Add the following code in `pom.xml`**
   
   ```jsx
   <dependency>
			<groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
      <groupId>io.micrometer</groupId>
      <artifactId>micrometer-registry-prometheus</artifactId>
      <scope>runtime</scope>
    </dependency>
    ```

2. **Add the following code in application.properties file located at `src/main/resources/application.properties`**

   ```jsx
   management.endpoints.web.exposure.include=*
   management.endpoints.web.exposure.include=prometheus,health,info,metric

   management.health.probes.enabled=true
   management.endpoint.health.show-details=always
   management.endpoint.prometheus.enabled=true
   ```

   <br></br>

   <a href = "https://github.com/SigNoz/spring-petclinic/commit/5c4d041d43c5b1b0d07ea3bc9f0ad9a3a8b49526" rel="noopener noreferrer nofollow" target="_blank" >Sample Spring Boot app with needed changes</a>

3. **Build the Spring Boot application again**


You can read more on how to expose Prometheus metric from <a href = "https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.metrics.export.prometheus" rel="noopener noreferrer nofollow" target="_blank" >Spring Boot docs</a>.

### Configure SigNoz otel-collector to scrape Prometheus metrics

1. **Add the following code in `otel-collector-config.yaml` file**
   
   <a href = "https://github.com/SigNoz/signoz/blob/main/deploy/docker/clickhouse-setup/otel-collector-config.yaml" rel="noopener noreferrer nofollow" target="_blank" >SigNoz Otel collector yaml file</a><br></br>

   :::note
   Target should be updated to the IP and port where Spring Boot app is exposing metrics.
   :::

   ```jsx
   prometheus:
    config:
      scrape_configs:
        - job_name: "otel-collector"
          scrape_interval: 60s
          static_configs:
            - targets: ["otel-collector:8889"]
        - job_name: "jvm-metrics"
          scrape_interval: 10s
          metrics_path: "/actuator/prometheus"
          static_configs:
            - targets: ["<IP of the machine:8090>"]

    ```

    For e.g. if SigNoz is running on same machine as Spring Boot application, you can replace `IP of SigNoz` with `host.docker.internal`.

2. **Restart otel-collector metrics using the following command**
   
   ```jsx
   sudo docker compose -f docker-compose.yaml restart otel-collector
   ```

3. **Go to SigNoz dashboard and plot metrics you want**

   [Creating metrics dashboard in SigNoz](https://signoz.io/docs/userguide/dashboards/)


### Available metrics that you can monitor

Below is the list of available JVM metrics that you can monitor with the help of SigNoz:

```jsx
http_server_requests_seconds_sum
jvm_memory_committed_bytes
jdbc_connections_min
hikaricp_connections_min
jvm_threads_states_threads
jvm_classes_unloaded_classes_total
jvm_buffer_count_buffers
logback_events_total
jvm_memory_used_bytes
jvm_gc_pause_seconds_sum
jvm_memory_max_bytes
jdbc_connections_active
jvm_classes_loaded_classes
jvm_gc_pause_seconds_count
jdbc_connections_idle
jvm_threads_live_threads
jvm_gc_memory_promoted_bytes_total
jvm_gc_memory_allocated_bytes_total
cache_gets_total
jvm_buffer_memory_used_bytes
jvm_buffer_total_capacity_bytes
jvm_gc_live_data_size_bytes
tomcat_sessions_alive_max_seconds
hikaricp_connections_usage_seconds_count
jvm_threads_daemon_threads
hikaricp_connections_creation_seconds_sum
process_cpu_usage
jvm_gc_pause_seconds_max
process_start_time_seconds
tomcat_sessions_active_max_sessions
hikaricp_connections_acquire_seconds_count
hikaricp_connections_acquire_seconds_sum
system_load_average_1m
hikaricp_connections_usage_seconds_sum
system_cpu_usage
jvm_threads_peak_threads
tomcat_sessions_expired_sessions_total
cache_removals
tomcat_sessions_created_sessions_total
hikaricp_connections_idle
tomcat_sessions_active_current_sessions
process_uptime_seconds
hikaricp_connections_acquire_seconds_max
```

## Collecting logs from your Spring Boot application

OpenTelemetry also supports collecting logs from your Spring Boot application. SigNoz provides logs, metrics, and traces under a single pane of glass. OpenTelemetry aims to support legacy logging pipelines and you can connect your existing log pipeline to OpenTelemetry collector to send your logs to SigNoz. Read our [logs documentation](https://signoz.io/docs/userguide/logs/) to get started.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log management in SigNoz"/>
    <figcaption><i>Log management in SigNoz</i></figcaption>
</figure>

<br></br>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Spring Boot application and collect telemetry data like logs, metrics, and traces. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇

<div class="text--center">

[![SigNoz repo](/img/blog/common/signoz_github.webp)](https://github.com/signoz/signoz)

</div>

<br></br>
If you are someone who understands more from video, then you can watch the tutorial on how to use OpenTelemetry for Spring Boot application here 👇

<p>&nbsp;</p>

<LiteYoutubeEmbed id="YxZb17_LYwQ" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)


If your Spring Boot application is based on microservices architecture, check out this blog 👇

[Implementing Distributed Tracing in a Java application](https://signoz.io/blog/distributed-tracing-java/)
