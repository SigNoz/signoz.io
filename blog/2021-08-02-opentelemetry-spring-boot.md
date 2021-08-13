---
title: Monitor your Spring Boot application with OpenTelemetry and SigNoz
slug: opentelemetry-spring-boot
date: 2021-08-02
tags: [spring-boot, application-monitoring, java-monitoring]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: End-to-end performance monitoring of Spring Boot application with OpenTelemetry. Get your telemetry data visualized with SigNoz.
image: /img/blog/2021/08/opentelemetry_springboot_hc.png
keywords:
  - OpenTelemetry
  - OpenTelemetry java
  - Spring Boot
  - OpenTelemetry Spring Boot
  - application monitoring
---

OpenTelemetry can auto instrument your Spring Boot application to capture telemetry data from a number of popular libraries and frameworks. Let's learn how it works.

<!--truncate-->

![Cover Image](/img/blog/2021/08/opentelemetry_springboot_hc.png)

OpenTelemetry is a vendor-agnostic instrumentation library. In this article, let's explore how you can auto-instrument your Java Spring Boot application with OpenTelemetry and get the data reported through SigNoz - an open-source APM and observability tool.

Steps to get started with OpenTelemetry for Spring Boot application

- Installing SigNoz
- Installing sample Spring Boot app
- Auto instrumentation with OpenTelemetry and sending data to SigNoz

## Installing SigNoz

You can get started with SigNoz using just three commands at your terminal if you have Docker installed. You can read about other deployment options from [SigNoz documentation](https://signoz.io/docs/deployment/requirement/).

    git clone https://github.com/SigNoz/signoz.git
    cd signoz/deploy/
    ./install.sh

You will have an option to choose between ClickHouse or Kafka + Druid as a storage option. Trying out SigNoz with ClickHouse database takes less than 1.5GB of memory, and for this tutorial, we will use that option.

When you are done installing SigNoz, you can access the UI at: [http://localhost:3000](http://localhost:3000/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

![SigNoz dashboard showing application list](/img/blog/2021/08/signoz_dashboard_hc.png)

<!--- SigNoz dashboard --->


## Installing sample Spring Boot app

For this tutorial, we will use a sample Spring Boot application built using Maven. You can find the code for the application at its [GitHub repo](https://github.com/spring-projects/spring-petclinic).

Steps to get the app set up and running:

1. Git clone the repository and go to the root folder

   ```
   git clone https://github.com/spring-projects/spring-petclinic.git
   cd spring-petclinic
   ```


2. Update port
   This app runs on port `8080` by default. But port `8080` is used by SigNoz for its query service, so let's update the port number to something else.

   Open the `application.properties` file located at `spring-petclinic/src/main/resources` and update the server.port attribute.

   ```
   # database init, supports mysql too

   database=h2
   spring.datasource.schema=classpath*:db/${database}/schema.sql
   spring.datasource.data=classpath*:db/${database}/data.sql

   # Web

   spring.thymeleaf.mode=HTML
   server.port=8090

   # JPA

   spring.jpa.hibernate.ddl-auto=none
   spring.jpa.open-in-view=false

   # Internationalization

   spring.messages.basename=messages/messages

   # Actuator

   management.endpoints.web.exposure.include=\*

   # Logging

   logging.level.org.springframework=INFO

   # logging.level.org.springframework.web=DEBUG

   # logging.level.org.springframework.context.annotation=TRACE

   # Maximum time static resources should be cached

   spring.resources.cache.cachecontrol.max-age=12h
   ```

<!--- server.port=8090 --->

Also, update the port number in [petclinic_test_plan.jmx](https://github.com/SigNoz/spring-petclinic/blob/main/src/test/jmeter/petclinic_test_plan.jmx) located at `spring-petclinic/src/test/jmeter` to `port number: 8090`. It will appear under `PETCLINIC_PORT` elementProp.

3.  Run the application using the following commands.

```
 ./mvnw package
java -jar target/*.jar
```


You can now access the application UI here: [http://localhost:8090/](http://localhost:8080/)

![Spring PetClinic app accessed at port:8090](/img/blog/2021/08/spring_petclinic_hc.png)

<!--- Sample Spring Boot application running in your local host. --->

Once you ensure that your application runs fine, stop it with `ctrl + z` on mac, as we will be launching the application with the Java agent downloaded from OpenTelemetry.

## Auto instrumentation with OpenTelemetry and sending data to SigNoz

For instrumenting Java applications, OpenTelemetry has a very handy Java JAR agent that can be attached to any Java 8+ application. The JAR agent can detect a number of [ popular libraries and frameworks](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md) and instrument it right out of the box. You don't need to add any code for that.

1. Download the [latest Java JAR agent](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent-all.jar).
2. Now you need to enable the instrumentation agent as well as run your sample application. You can do so by the following command:

```
OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT="http://IP of SigNoz:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/path/to/opentelemetry-javaagent-all.jar -jar target/\*.jar
```

As you are running this on your local host, you need to replace `IP of SigNoz` with `localhost`. The path should be updated to where you have kept your downloaded Java JAR agent. Your final command will look like this:

    OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=javaApp java -javaagent:/Users/Downloads/opentelemetry-javaagent-all.jar -jar target/*.jar

Note the path is updated for my local environment.

Check out the Spring Pet Clinic app at: [http://localhost:8090/](http://localhost:8090/) and play around with it to generate some load. It might take 1-2 minutes before it starts showing up in the SigNoz dashboard.

Below you can find your `javaApp` in the list of applications being monitored.


![`Javaapp` appears in the list of applications monitored through SigNoz](/img/blog/2021/08/javaapp_boxed_hc.png)

<!--- `javaApp` in the list of applications monitored --->

## Metrics and Traces of the Spring Boot application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests


![SigNoz dashboard showing application latency, requests per sec, error percentage and top endpoints](/img/blog/2021/08/signoz_charts_hc.png)

Measure things like application latency, requests per sec, error percentage and see your top endpoints with SiGnoz.


You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

![List of traces shown on SigNoz dashboard](/img/blog/2021/08/signoz_visualization_hc.png)

<!--- View of traces at a particular timestamp --->

You can use flamegraphs to exactly identify the issue causing the latency.

![Flamegraphs and gantt charts to visualize time taken by requests](/img/blog/2021/08/signoz_flamegraphs_hc.png)

<!--- Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing --->


## Conclusion

OpenTelemetry makes it very convenient to instrument your Spring Boot application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇
[

SigNoz/signoz

SigNoz helps developers monitor their applications & troubleshoot problems, an open-source alternative to DataDog, NewRelic, etc. 🔥 🖥 - SigNoz/signoz

![](https://github.githubassets.com/favicons/favicon.svg)SigNozGitHub

![](https://repository-images.githubusercontent.com/326404870/e961a900-63c9-11eb-83f6-02913cf1b477)
](https://github.com/signoz/signoz)⭐️ SigNoz is open source now. Check it out & if you like it give us a star on GitHub! ⭐️
If you are someone who understands more from video, then you can watch the tutorial on how to use OpenTelemetry for Spring Boot application here 👇

If you want to read more about SigNoz 👇

[Golang Application Performance Monitoring with SigNoz](/blog/monitoring-your-go-application-with-signoz/)

[Nodejs Application Performance Monitoring with SigNoz](/blog/nodejs-opensource-application-monitoring/)
