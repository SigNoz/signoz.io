---
title: Monitor your Spring Boot application with OpenTelemetry and SigNoz
slug: opentelemetry-spring-boot
date: 2022-09-01
tags: [OpenTelemetry Instrumentation, Java]
authors: ankit_anand
description: End-to-end performance monitoring of Spring Boot application with OpenTelemetry. Get your telemetry data visualized with SigNoz.
image: /img/blog/2022/03/opentelemetry_spring_boot.webp
keywords:
  - OpenTelemetry
  - OpenTelemetry java
  - Spring Boot
  - OpenTelemetry Spring Boot
  - application monitoring
---
import { LiteYoutubeEmbed } from "react-lite-yt-embed";


<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-spring-boot/"/>
</head>

OpenTelemetry can auto-instrument your Java Spring Boot application to capture telemetry data from a number of popular libraries and frameworks that your application might be using. Let's learn how it works.

<!--truncate-->

![Cover Image](/img/blog/2022/03/opentelemetry_spring_boot.webp)

OpenTelemetry is a vendor-agnostic instrumentation library. In this article, let's explore how you can auto-instrument your Java Spring Boot application with OpenTelemetry and get the data reported through SigNoz - an open-source APM and observability tool.

But before that, let's have a brief overview of OpenTelemetry.

## What is OpenTelemetry?
<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is a set of API, SDKs, libraries, and integrations aiming to standardize the generation, collection, and management of telemetry data(logs, metrics, and traces). OpenTelemetry is a Cloud Native Computing Foundation project created after the merger of OpenCensus(from Google) and OpenTracing(From Uber).

The data you collect with OpenTelemetry is vendor-agnostic and can be exported in many formats. Telemetry data has become critical to observe the state of distributed systems. With microservices and polyglot architectures, there was a need to have a global standard. OpenTelemetry aims to fill that space and is doing a great job at it thus far.

OpenTelemetry provides client libraries and agents for most of the popular programming languages. There are two types of implementation of OpenTelemetry libraries:

- **Auto-instrumentation**<br></br>
OpenTelmetry can collect data for many popular frameworks and libraries automatically. You don’t have to make any code changes.
- **Manual instrumentation**<br></br>
If you want more application-specific data, OpenTelemetry SDK provides you with the capabilities to capture that data using OpenTelemetry APIs and SDKs.

For Spring Boot applications, we can use the OpenTelemetry Java Jar agent. We just need to download the latest version of the Java Jar agent and run the application with it.

<figure data-zoomable>
    <img src="/img/blog/2022/03/opentelemetry_springboot.webp" alt="Spring Boot application with OpenTelemetry"/>
    <figcaption><i>OpenTelemetry provides a Java Jar agent that can auto-instrument Spring Boot applications</i></figcaption>
</figure>

<br></br>

OpenTelemetry does not provide storage and visualization layer for the collected data. The advantage of using OpenTelemetry is that it can export the collected data in many different formats. So you're free to choose your telemetry backend. Natively, OpenTelemetry supports a wire protocol known as `OTLP`. This protocol sends the data to OpenTelemetry Collector as shown in the diagram above.

In this tutorial, we will use [SigNoz](https://signoz.io/docs/), an open-source APM as the backend and visualization layer.

Steps to get started with OpenTelemetry for Spring Boot application:

- Installing SigNoz
- Installing sample Spring Boot app
- Auto instrumentation with OpenTelemetry and sending data to SigNoz

## Installing SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" >Docker Engine</a> before running the install script.

```bash
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=opentelemetry_springboot)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure data-zoomable>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

<!-- You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=springboot)

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package. -->

## Installing sample Spring Boot app

If you don't have Java installed, first install it from the <a href = "https://www.java.com/en/" rel="noopener noreferrer nofollow" target="_blank" >official website</a>.

For this tutorial, we will use a sample Spring Boot application built using Maven. You can find the code for the application at its <a href = "https://github.com/SigNoz/spring-petclinic" rel="noopener noreferrer nofollow" target="_blank" >GitHub repo</a>.

Steps to get the app set up and running:

1. **Git clone the repository and go to the root folder**

   ```jsx
   git clone https://github.com/SigNoz/spring-petclinic.git
   cd spring-petclinic
   ```


2. **Run the application using the following commands.**

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

## Auto instrumentation with OpenTelemetry and sending data to SigNoz

For instrumenting Java applications, OpenTelemetry has a very handy Java JAR agent that can be attached to any Java 8+ application. The JAR agent can detect a number of <a href = "https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md" rel="noopener noreferrer nofollow" target="_blank" >popular libraries and frameworks</a> and instrument it right out of the box. You don't need to add any code for that.


1. Download the [latest Java JAR agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar). You will need the path of this file, so note it down somewhere. You can also use the terminal to get this file using the following command:
   ```
   wget https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
   ```

2. Now you need to enable the instrumentation agent as well as run your sample application. You can do so by the following command:
   ```
   OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/path/opentelemetry-javaagent.jar -jar target/*.jar
   ```

   <br></br>As you are running this on your local host, you need to replace `IP of SigNoz` with `localhost`. You will also need to update the path for your downloaded Java JAR agent. You will replace following two things:

   - `IP of SigNoz` : `localhost`
   - `/path/to` :  `Users/cruxaki/Downloads` (For my local)
   
   Your final command will look like this:
   ```
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

Check out the Spring Pet Clinic app at: [http://localhost:8090/](http://localhost:8090/) and play around with it to generate some load. You can try refreshing the endpoint multiple times to generate load. It might take 1-2 minutes before it starts showing up in the SigNoz dashboard.

Below you can find your javaApp in the list of applications being monitored.

<figure data-zoomable>
    <img src="/img/blog/2022/03/java_app_signoz_dashboard.webp" alt="`Javaapp` appears in the list of applications monitored through SigNoz"/>
    <figcaption><i>javaApp in the list of applications monitored</i></figcaption>
</figure>

<br></br>

## Metrics and Traces of the Spring Boot application

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

## Conclusion

OpenTelemetry makes it very convenient to instrument your Spring Boot application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

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

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)


If your Spring Boot application is based on microservices architecture, check out this blog 👇

[Implementing Distributed Tracing in a Java application](https://signoz.io/blog/distributed-tracing-java/)
