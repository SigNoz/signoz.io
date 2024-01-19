---
title: Monitor Tomcat Java application with OpenTelemetry and SigNoz
slug: tomcat
date: 2022-08-17
tags: [java-monitoring]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: In this article learn how to monitor Tomcat Java applications using OpenTelemetry and SigNoz. It is very easy to get started...
image: /img/blog/2021/08/opentelemetry_tomcat_cover-min.jpeg
keywords:
  - opentelemetry
  - opentelemetry tomcat
  - opentelemetry java
  - java instrumentation
  - java auto-instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

OpenTelemetry is a vendor-agnostic instrumentation library. In this article, let's explore how to auto-instrument a Tomcat Java application using OpenTelemetry Java JAR agent.

<!--truncate-->

![Cover image](/img/blog/2021/08/opentelemetry_tomcat_cover-min.webp)

After capturing telemetry data with OpenTelemetry, we will use SigNoz, an open-source full-stack observability tool, to visualize the data.

Steps to get started with OpenTelemetry for Tomcat Java application:

- Installing SigNoz
- Installing sample Tomcat Java application
- Auto Instrumentation with OpenTelemetry Java agent
- Getting metrics and traces for Tomcat application in SigNoz

## Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

We have installed SigNoz on a Ubuntu VM in Azure cloud. You can access SigNoz UI at `http://IP_of_SigNoz:3301`. You can access SigNoz UI at port: 3301 of any host that you choose. In case of local host just use: `http://localhost:3301`

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="SigNoz dashboard showing application list"
   height={500}
   src="/img/blog/2021/08/openetelemetry_tomcat_signoz_dashboard.webp"
   title="SigNoz Dashboard"
   width={700}
/>

## Installing sample Tomcat Java application

**Prerequisites:**<br></br>
Make sure you have Tomcat installed on your system. If not, then you can download it from <a href="https://tomcat.apache.org/index.html" rel="noopener noreferrer nofollow" target="_blank">Apache Tomcat website</a>. For this tutorial I have used Tomcat 10.0.8.

### Steps to install sample Tomcat Java application:

- Download an example app packaged as a war file provided at Apache Tomcat official website - <a href="https://tomcat.apache.org/tomcat-7.0-doc/appdev/sample/" rel="noopener noreferrer nofollow" target="_blank">Sample Tomcat app</a>
  ![Sample applicationlink](/img/blog/2021/08/opentelemetry_tomcat_sample_app-min.webp)

- The easiest way to run the sample app is to move it to webapps folder inside the Tomcat directory.

  ```
  cd Tomcat/webapps
  cp ~/Downloads/sample.war .
  ```

- Once you have copied the file in the webapps folder, get back to the Tomcat folder and run the app using the following command.

  ```
  cd ..
  bin/startup.sh
  ```

- Check if the sample app is running at: http://localhost:8080/sample/ . The sample should open up like below.

  ![Sample app running](/img/blog/2021/08/opentelemetry_tomcat_sample_app-min.webp)
  <!--- Sample Tomcat app --->

  By clicking on the links shown on the page, you can see that it makes dummy calls to a page as part of the Hello World application.

## Auto Instrumentation with OpenTelemetry Java agent

OpenTelemetry has a very handy Java JAR agent that can be attached to any Java 8+ application for instrumenting Java applications.. The JAR agent can detect a number of popular libraries and frameworks and instrument it right out of the box. You don't need to add any code for that.

1. Download the [latest Java JAR agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar).
2. For the Tomcat application, you need to setup a few environment variables. You need to create and add a new file `setenv.sh` in your Tomcat bin folder. The `./startup.sh` command which is used to run the Java app will check for `setenv.sh` file and run the commands accordingly.
3. In `setenv.sh` file, paste the following environment variables using a code editor:

   ```
   export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/opentelemetry-javaagent.jar"
   export OTEL_EXPORTER_OTLP_ENDPOINT=<IP of SigNoz Backend>:4317
   export OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name>
   ```

   In the `CATALINA_OPTS` environment variable, you need to replace `path` with the path of the folder location where you have saved the OpenTelemetry Java agent downloaded in step 1.

   The `OTEL_EXPORTER_OTLP_ENDPOINT` specifies the endpoint for SigNoz's backend. In place of IP of SigNoz backend, you need to put the IP of host machine where SigNoz is installed. Also, remember to allow incoming requests to port 4317 of the machine where SigNoz backend is hosted.

   `OTEL_RESOURCE_ATTRIBUTES` is used to specify the service name of the service being monitored. So the final environment variables will look like below. Note that:

   ```
   export CATALINA_OPTS="$CATALINA_OPTS -javaagent:/Users/cruxaki/Downloads/opentelemetry-javaagent.jar"
   export OTEL_EXPORTER_OTLP_ENDPOINT=http://40.76.59.122:4317
   export OTEL_RESOURCE_ATTRIBUTES=service.name=Tomcat-SigNoz
   ```

   Make sure that you have saved this file as `setenv.sh` and in your Tomcat bin folder, because when starting up, Catalina checks this file for environment variables.

4. Now we need to restart our Tomcat Java app with the OpenTelemetry Java agent attached to it. Make sure you're at your Tomcat home folder and then restart the Tomcat server using following commands:

   ```
   bin/shutdown.sh
   bin/startup.sh
   ```

   Check out the sample Tomcat app again at  [http://localhost:8080/sample/](http://localhost:8080/sample/) and play around with it to generate some load. It might take 1-2 minutes before it starts showing up in the SigNoz dashboard.

   Below you can find your `Tomcat-SigNoz` app in the list of applications being monitored.

   <Screenshot
      alt="Tomcat shows up in the list of applications monitored by SigNoz"
      height={500}
      src="/img/blog/2021/08/opentelemetry_tomcat_ui.webp"
      title="Tomcat-SigNoz shows up in the list of applications monitored by SigNoz"
      width={700}
   />

## Metrics and Traces of the Tomcat Java Application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<Screenshot
   alt="SigNoz UI showing charts"
   height={500}
   src="/img/blog/2021/08/opentelemetry_tomcat_signoz_charts.webp"
   title="SigNoz UI showing popular RED metrics of application performance"
   width={700}
/>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<Screenshot
   alt="View of traces at a particular timestamp"
   height={500}
   src="/img/blog/2021/08/opentelemetry_regex.webp"
   title="View of traces at a particular timestamp"
   width={700}
/>

You can use flamegraphs to identify the issue causing the latency.

<Screenshot
   alt="Flamegraphs"
   height={500}
   src="/img/blog/2021/08/opentelemetry_tomcat_flamegraphs.webp"
   title="Flamegraphs used for distributed tracing in SigNoz dashboard"
   width={700}
/>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Spring Boot application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇<br></br>
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the tutorial on how to monitor your Tomcat Java Application with OpenTelemetry and SigNoz below👇<br></br>

<p>&nbsp;</p>

<LiteYoutubeEmbed id="4obQilMqU4E" mute={false} />

<p>&nbsp;</p>

If you face any issues while trying out SigNoz, feel free to write to us at: support@signoz.io

If you want to read more about SigNoz 👇

[Golang Application Performance Monitoring with SigNoz](https://signoz.io/blog/monitoring-your-go-application-with-signoz/)

[Monitor your Spring Boot application with OpenTelemetry and SigNoz](https://signoz.io/blog/opentelemetry-spring-boot/)
