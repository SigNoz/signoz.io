---
title: Distributed Tracing with OpenTelemetry - Part II
slug: opentelemetry-distributed-tracing-part-2
date: 2023-01-31
tags: [OpenTelemetry, Distributed Tracing]
authors: nitin
description: Distributed tracing is a method of tracking application requests as they flow from front-end devices to back-end services and databases in a distributed system. Using OpenTelemetry APIs and SDKs, you can implement distributed tracing in your software systems....
image: /img/blog/2023/01/otel_distributed_tracing_2-min.jpg
keywords:
  - opentelemetry distributed tracing
  - opentelemetry
  - distributed tracing
  - observability
  - signoz
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-distributed-tracing-part-2/"/>
</head>

In the [previous article](https://signoz.io/blog/opentelemetry-distributed-tracing-part-1/), we learned what distributed tracing is, why it is necessary, how to do tracing, encountered challenges with existing tracing tools, and finally discovered that there is a more mature option available for the industry to adopt in terms of telemetry and observability.

In this article, we will be trying to understand OpenTelemetry in more depth.

<!--truncate-->

![Cover Image](/img/blog/2023/01/otel_distributed_tracing_2.webp)

To begin, we will examine how OpenTelemetry addresses some of the issues confronting the observability ecosystem.

- OpenTelemetry provides specification standards for the industry to adopt for all three key signals, namely Traces, Metrics, and Logs.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/01/otel_specification_standards.webp" alt="OTEL defines standards for all three signals."/>
    <figcaption><i>OTEL defines standards for all three signals.</i></figcaption>
</figure>

<br></br>


- It provides a **reference implementation** of the specifications in multiple languages so that the adoption is easy for the developer community. It means developers across popular languages can instrument code using the Otel libraries which will produce signals in standard formats.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/01/otel_ref_implementations.webp" alt="OpenTelemetry Standard and Implementation Libraries support"/>
    <figcaption><i>OpenTelemetry Standard and Implementation Libraries support</i></figcaption>
</figure>

<br></br>

- It provides a more loosely coupled Observability stack architecture, which reduces coupling with vendor agents and allows consumers to change the tools as per their requirements.

- It provides a set of tools and SDKs to customize the instrumentation requirements for many languages. (check Understanding OpenTelemetry Libraries section below)

- It also provides Auto Instrumentation capability (which is a big win), wherein developers do not need to code any instrumentation logic, and all of it is done by the OpenTelemetry agent in a magical way.

**Auto Instrumentation,** also called as **Zero Code** Instrumentation, means without any additional code required by developers, OTEL can instrument by injecting bytecode if we use the language-supported auto-instrumentation library. There is support for Java, so it becomes easy to use without doing any additional code in your application.

This feature saves a huge amount of time in instrumenting your codebase.

- Provides **Rich Telemetry data** which is an important requirement for building greater insights into the system under observation.

- Provides a rich set of plugins (**receivers, exporters**) to help with incremental adoption by building adapters that can work with most of the visualization tools.

To give more color to these advantages and benefits, let's try to see a typical OpenTelemetry architecture.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/01/sample_otel_architecture.webp" alt="How OpenTelemetry fits in the entire application stack - OTel agent sends data to OTel collector from where you can export data to a backend of your choice"/>
    <figcaption><i>How OpenTelemetry fits in the entire application stack - OTel agent sends data to OTel collector from where you can export data to a backend of your choice</i></figcaption>
</figure>

<br></br>

In the diagram above, you can see following things:

- Instead of using proprietary agents of any **FOSS/Vendor tools** in microservices, we are now using **OpenTelemetry agents/libraries**. This keeps the client codebase free of any vendor or tool specific native instrumentation libraries.

- The signal data is communicated via **OTLP protocol** which is the standard OpenTelemetry uses.
- It also supports **GRPC, HTTP** as the medium of communication.

- All the signal data is sent to a **Collector** component which is considered to be the heart of the system. It is optional , but any matured and complex implementation will need an OpenTelemetry collector component in the architecture.

- All the data gets processed via the Collector and then sent to different observability backends. More on Collectors later, but collector is responsible to **receive, process and send** the signal data to the target visualization tool.

- Application telemetry data can now be exported to **multiple backends** , depending on the requirements. Also, note that you can plugin various out of box **exporters** for target backend.

For example - *Jaeger backend accepts both jaeger format as well as OTLP format.* 

*But Zipkin needs data in Zipkin format, so Zipkin exporter translates the trace data from OTLP to Zipkin native format. In the diagram , you can also see that we can configure the exporters directly from the agent library without routing the traces via collector, but such implementations are for simplified requirements only.*

You can also choose [SigNoz](https://signoz.io/) as your observability backend. SigNoz is an open source observability platform built to support OpenTelemetry natively. It provides metrics monitoring, ditributed tracing, and logs management under a single pane of glass. As SigNoz is open source, it can be self hosted, and the installation comes packed with an [OpenTelemetry Collector](https://signoz.io/docs/).

Once your application is instrumented with OTel libraries, you can configure the exporter to send telemetry data directly to SigNoz.

## Understanding OpenTelemetry Libraries

#### Core libraries of OpenTelemetry

**The API** is the bare-bones interface for instrumentation and does not provide any implementation. Third-party libraries or vendors can instrument their code using the API.

**The SDK** is a complete language library that provides implementations of the API so we can instrument our code manually ( if required). It is what we pull directly into our applications. It doesn’t implement exporters, which are separate libraries that have a dependency on the SDK.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/01/api_sdk_thrid_party_library.webp" alt="API, SDK and Third-party Library design"/>
    <figcaption>API, SDK and Third-party Library design (<a href="https://opentelemetry.io/docs/specs/otel/library-guidelines/" rel="noopener noreferrer nofollow" target="_blank">Pic Ref</a>)</figcaption>
</figure>

<br></br>

**Exporters** are components that are an extension of the OpenTelemetry package. Exporters are libraries that send the instrumented telemetry data to backends. Vendors may be required to provide an implementation in order to convert data from OTLP to its native format. Ideally, most vendors should start working with the OTLP format in the long run for best portability.

## What is Auto Instrumentation ?

And here the magic of OpenTelemetry unfolds. Developers will typically need to write instrumentation code to instrument their application code which can be hard and laborious.  This is where Open Telemetry's Auto Instrumentation shines. It is basically a telemetry collection method that do not require the end user to modify the application’s source code. Methods vary by programming language, and examples include code manipulation (during compilation or at runtime), monkey patching, or running eBPF programs. 

For most typical use cases, you won’t need to write instrumentation code yourself. You can use the language-specific Auto Instrumentation library and relax!

But it may happen that if you need to add custom span information or custom data attributes to spans, then you can use the manual instrumentation approach (i.e., using the API and SDK ) to write your own instrumentation logic. 

---

## Demo of Distributed Tracing with OpenTelemetry in a Spring Boot application

Let's work with an example to see OpenTelemetry in Action. 

The sample Spring Boot Java application will have three microservices and a service registry

- user-service
- orders-service
- payment-service
- discovery-service (eureka server - service registry)

Here’s the architecture of the sample Java application along with OpenTelemetry and SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/java_app_architecture_opentelemetry_signoz.webp" alt="Application architecture along with SigNoz and OpenTelemetry(OTel Collector)"/>
    <figcaption><i>Application architecture along with SigNoz and OpenTelemetry(OTel Collector)</i></figcaption>
</figure>

<br></br>

#### Pre-requisites

- Java 8 or newer
- MySql 8
- SigNoz
- Maven

#### Installing SigNoz

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install [Docker Engine](https://docs.docker.com/engine/install/) before running the install script.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit our documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/02/signoz_dashboard.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

#### Installing MySql

Download MySQL community version from [here](https://dev.mysql.com/downloads/mysql/) based on your operating system.

Once installation is complete, run the below commands to create a database for our sample nodejs app.

```jsx
➜  ~ mysql -u root
mysql> create database signoz;
mysql> use signoz;
```

#### Installing Maven

To install maven follow below steps:

```java
cd ~
mkdir maven
cd maven
curl -L https://dlcdn.apache.org/maven/maven-3/3.8.4/binaries/apache-maven-3.8.4-bin.zip -o maven.zip
unzip maven.zip
echo -n '\n export PATH=~/maven/apache-maven-3.8.4/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

Verify maven using below command `mvn -version`

#### Running sample application

Below are the steps to run the sample Java application with OpenTelemetry:

1. **Clone the sample Spring Boot app**<br></br>
   We will be using a sample java app at this [GitHub repo](https://github.com/SigNoz/distributed-tracing-java-sample).
   
   ```jsx
   git clone --single-branch --depth 1 https://github.com/SigNoz/distributed-tracing-java-sample.git
   cd distributed-tracing-java-sample
   ```

2. **Run service discovery with Eureka Server**<br></br>
    
    ```java
    cd discovery-server
    mvn clean install -Dmaven.test.skip
    docker build -t discovery-service:1.0.1 .
    docker run -d --name discovery-service -p 8761:8761 discovery-service:1.0.1
    ```
    
    You can go to  [http://localhost:8761/](http://localhost:8761/) and make sure your discover service registry with Eureka server is up and running.

    <figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/service_discovery_eureka.webp" alt="Eureka server up and running"/>
    <figcaption><i>Eureka server is up and running</i></figcaption>
    </figure>
    
    <br></br>
    
    
3. **Setting up Opentelemetry agent**<br></br>
   For instrumenting Java applications, OpenTelemetry has a very handy Java JAR agent that can be attached to any Java 8+ application. The JAR agent can detect a number of [popular libraries and frameworks](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md) and instrument it right out of the box. You don't need to add any code for that.
    
    Download the [latest version](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar) of the Java JAR agent, and copy jar agent file in your application code. We have placed the agent under the folder named `agents`.

    <figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/opentelemetry_java_jar_agent.webp" alt="OTel Java jar agent"/>
    <figcaption><i>Placed OpenTelemetry Java Jar agent under a folder named agents</i></figcaption>
    </figure>
    <br></br>
    
4. **Setting up SigNoz as the OpenTelemetry backend**<br></br>
    
    To set up OpenTelemetry to collect and export telemetry data, you need to specify OTLP (OpenTelemetry Protocol) endpoint. It consists of the IP of the machine where SigNoz is installed and the port number at which SigNoz listens.
    OTLP endpoint for SigNoz - `<IP of the machine>:4317`
    
    If you have installed SigNoz on your local machine, then your endpoint is `127.0.0.1:4317`**.**
    
    Create a [start.sh](https://github.com/ganny26/distributed-tracing-java-sample/blob/main/user-service/scripts/start.sh) script with below environment variables and move it to scripts folder. Notice that we have updated the OTLP endpoint under `-Dotel.exporter.otlp.traces.endpoint=http://localhost:4317`.
    
    ```java
    JAVA_OPTS="${JAVA_OPTS} \
       -Xms${JAVA_XMS} \
       -Xmx${JAVA_XMX} \
       -Dapplication.name=user-service-java \
       -Dotel.traces.exporter=otlp \
       -Dotel.resource.attributes=service.name=user-service-java \
       -Dotel.exporter.otlp.traces.endpoint=http://localhost:4317 \
       -Dotel.service.name=user-service-java \
       -Dotel.javaagent.debug=false \
       -javaagent:../agents/opentelemetry-javaagent.jar"
    ```

    <figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/scripts_sh_file.webp" alt="Code in scripts file"/>
    <figcaption><i>Code in scripts.sh file</i></figcaption>
    </figure>
    <br></br>

    <figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/scripts_folder.webp" alt="Scripts folder"/>
    <figcaption><i>Scritps.sh file under scripts folder</i></figcaption>
    </figure>
    <br></br>
    
    
    

5. **Run the microservices**<br></br>
   Now you need to run your microservices. Run `users-service`:
    ```java
    cd user-service
    mvn clean install -Dmaven.test.skip # Build user-service jar
    cd scripts
    sh ./start.sh # Run user-service with OTEL java agent
    ```

   Open a new tab of your terminal, and run `payment-service`:
   
   ```java
   cd payment-service
   mvn clean install -Dmaven.test.skip 
   cd scripts
   sh ./start.sh 
   ```
   
   Open a new tab of your terminal, and run `order-service`:
   
   ```java
   cd order-service
   mvn clean install -Dmaven.test.skip 
   cd scripts
   sh ./start.sh 
   ```

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/eureka_running_all_services.webp" alt="Running microservices on different ports using service registry"/>
    <figcaption><i>Running microservices on different ports using service registry</i></figcaption>
</figure>

<br></br>



6. **Confirm table creation**<br></br>
   After running the services, check if the tables `ORDERS` and `USERS` are created using the commands below:
   
   ```java
   mysql> use signoz;
   mysql> show tables;
   ```
   
   <figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/confirm_table_creation.webp" alt="Checking creation of tables"/>
    <figcaption>Checking creation of tables after running microservices</figcaption>
    </figure>
    
    <br></br>
    
    

## Visualizing traces data with SigNoz dashboards

To visualize the traces data with SigNoz, we first need to generate some user data by interacting with the spring boot application.

#### Generating user data by interacting with the sample app

You need to generate some user data to see how it appears in the SigNoz dashboard. The sample application comes with an UI to interact with the app. Use the below command in the root folder to launch the UI:

```java
npm install -g serve
serve -l 5000 u
```

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/serve_ui_port.webp" alt="Running sample app UI"/>
    <figcaption><i>Running sample app UI</i></figcaption>
</figure>

<br></br>

Use the buttons to interact with the app and generate some data. For example, click `Create User` button to create a new user in the MySQL db.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/create_new_user_java.webp" alt="Create a new user"/>
    <figcaption><i>Create a new user</i></figcaption>
</figure>

<br></br>

Now go to SigNoz dashboard, you will notice the list of service names that we configured:

- user-service
- order-service
- payment-service

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/java_microservices_list.webp" alt="Microservices in our Java app being monitored in the SigNoz dashboard"/>
    <figcaption><i>Microservices in our Java app being monitored in the SigNoz dashboard</i></figcaption>
</figure>

<br></br>

You can play around with the dashboard to see what data is captured. Below is a handy guide on how to use the SigNoz dashboard to see the captured data.

## How to use SigNoz dashboard to analyze traces

The traces tab of the SigNoz dashboard provides powerful filters to analyze the traces data. You can use a number of filters to see traces data across many dimensions. For example:

**See the count of requests by service and HTTP Status code**

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/java_count_of_requests.webp" alt="Count of requests"/>
    <figcaption><i>Use advanced filters to see count of requests by service and HTTP status code</i></figcaption>
</figure>

<br></br>

**Run aggregates on your tracing data**<br></br>

You can run aggregates like avg, max, min, 50th percentile, 90th percentile on your tracing data to get analyze performance issues in your application.


<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/run_aggregates.webp" alt="Run aggregates using the dropdown on your traces data quickly"/>
    <figcaption><i>Run aggregates using the dropdown on your traces data quickly</i></figcaption>
    </figure>
    
    <br></br> 
    
    

**Get more granular details by grouping traces data**<br></br>

You can also see these aggregates in more granular detail by grouping them by service name, operation, HTTP URL, HTTP method, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/group_aggregates.webp" alt="Group Aggregates"/>
    <figcaption>Group aggregates across a list of dimensions</figcaption>
    </figure>
    
    <br></br>
    

**Identify latency issues with Flamegraphs and Gantt charts**<br></br>

You can inspect each span in the table with Flamegraphs and Gantt charts to see a complete breakdown of the request. Establishing a sequential flow of the user request along with info on time taken by each part of the request can help identify latency issues quickly. Let’s see how it works in the case of our sample Spring Boot app.

Go to operation filter on the left navigation and apply two filters `/payment/transfer/id/{id}/amount/{amount}` and service name `payment-service` . Click on the single event listed in the table as shown below:

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/span_specific_filter.webp" alt="Use filters to inspect spans that you want to investigate further"/>
    <figcaption><i>Use filters to inspect spans that you want to investigate further</i></figcaption>
</figure>

<br></br>
    
You will be able to see the Flamegraph of the selected span which shows how the request traveled between the `payment-service` and the `user-service`. You can also use the Gantt chart to analyze each event in detail.
    

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/java_payment_service_traces.webp" alt="Flamegraphs and Gantt charts"/>
    <figcaption><i>Flamegraph and Gantt chart for the selected event showing payment service traces with HTTP semantics</i></figcaption>
</figure>

<br></br>

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/03/db_traces.webp" alt="Database traces"/>
    <figcaption>Databases traces which show semantics related to mysql db and query details</figcaption>
</figure>

<br></br>
    

SigNoz also provides a detailed view of common [semantic conventions](https://github.com/open-telemetry/semantic-conventions) like HTTP, network, and other attributes. The end-to-end tracing of user requests can help you to identify latency issues quickly.
    

## Conclusion

Distributed tracing is a powerful and critical toolkit for developers creating applications based on microservices architecture. Using OpenTelemetry, you can implement distributed tracing easily for your distributed application. It also makes your instrumentation future proof, as you avoid any vendor lock-in.

OpenTelemetry and SigNoz provide a great open-source solution to implement distributed tracing for your applications. You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)


---

**Related Posts**

[OpenTelemetry Collector - Complete Guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)