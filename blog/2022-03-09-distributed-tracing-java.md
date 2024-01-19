---
title: Implementing Distributed Tracing in a Java application
slug: distributed-tracing-java
date: 2023-02-28
tags: [OpenTelemetry Instrumentation, Java, Distributed Tracing]
authors: [selva]
description: Distributed tracing provides insights into how a particular service is performing as part of the whole in a distributed system. In this article, we will implement distributed tracing for a Java application based on microservices architecture.
image: /img/blog/2022/03/distributed_tracing_java.webp
hide_table_of_contents: false
keywords:
  - distributed tracing
  - java
  - spring boot
  - opentelemetry
  - opentelemetry java
  - traces
  - open source
  - signoz
---
<head>
  <link rel="canonical" href="https://signoz.io/blog/distributed-tracing-java/"/>
</head>

Monitoring and troubleshooting distributed systems like those built with microservices is challenging. Traditional monitoring tools struggle with distributed systems as they were made for a single component. Distributed tracing solves this problem by tracking a transaction across components. 

<!--truncate-->

![Cover Image](/img/blog/2022/03/distributed_tracing_java.webp)

In this article, we will implement distributed tracing for a Java Spring Boot application with three microservices. To implement distributed tracing, we will be using open-source solutions - SigNoz and OpenTelemetry, so you can easily follow the tutorial.

We will learn more about SigNoz and OpenTelemetry, but before that, let’s have a brief overview of distributed tracing.

## What is Distributed Tracing?

In a microservices architecture, a user request travels through hundreds, even thousands of services before serving the user what they need. Engineering teams often responsible for maintaining single services have no visibility over how the system performs as a whole.

[Read our complete guide on Distributed Tracing](http://signoz.io/distributed-tracing/)

Distributed tracing gives insights into how a particular service performs as part of the whole in a distributed software system. It involves passing a trace context with each user request which is then passed across hosts, services, and protocols to track the user request. The technique enables the reconstruction of the whole path of the request, which is called a trace.

A trace allows application owners to see how their entire system processed a request and identify improvement areas.

## SigNoz and OpenTelemetry

[OpenTelemetry](https://opentelemetry.io/) is a vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications. It is a project under [CNCF](https://www.cncf.io/) with huge community backing.

OpenTelemetry provides the instrumentation layer to generate and export your telemetry data to a backend. Then, you need to choose a backend tool that will provide the data storage and visualization for your telemetry data. That’s where SigNoz comes into the picture.

[SigNoz](https://signoz.io/) is a full-stack open-source APM tool that provides metrics monitoring and distributed tracing.

We will demonstrate implementing distributed tracing in a Java application in two sections:

- Running a sample Java application with OpenTelemetry
- Visualizing traces data with SigNoz dashboards

## Running a sample Spring Boot Java application with OpenTelemetry

The sample Spring Boot Java application will have three microservices and a service registry 

- user-service
- orders-service
- payment-service
- discovery-service (eureka server - service registry)

Here’s the architecture of the sample Java application along with OpenTelemetry and SigNoz.

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="Sample Java app application architecture with SigNoz and OpenTelemetry"
   height={500}
   src="/img/blog/2022/03/java_app_architecture_opentelemetry_signoz.webp"
   title="Application architecture along with SigNoz and OpenTelemetry(OTel Collector)"
   width={700}
/>

### Pre-requisites

- Java 8 or newer
- MySql 8
- SigNoz
- Maven

### Installing SigNoz

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

<Screenshot
   alt="SigNoz dashboard"
   height={500}
   src="/img/blog/2022/02/signoz_dashboard.webp"
   title="SigNoz dashboard - It shows services from a sample app that comes bundled with the application"
   width={700}
/>

### Installing MySql

Download MySQL community version from [here](https://dev.mysql.com/downloads/mysql/) based on your operating system.

Once installation is complete, run the below commands to create a database for our sample java app.

```jsx
➜  ~ mysql -u root
mysql> create database signoz;
mysql> use signoz;
```

### Installing Maven

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

### Running sample application

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
    
    <Screenshot
    alt="SigNoz dashboard"
    height={500}
    src="/img/blog/2022/03/service_discovery_eureka.webp"
    title="Eureka server is up and running"
    width={700}
    />
    
    
3. **Setting up Opentelemetry agent**<br></br>
   For instrumenting Java applications, OpenTelemetry has a very handy Java JAR agent that can be attached to any Java 8+ application. The JAR agent can detect a number of [popular libraries and frameworks](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/supported-libraries.md) and instrument it right out of the box. You don't need to add any code for that.
    
    Download the [latest version](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar) of the Java JAR agent, and copy jar agent file in your application code. We have placed the agent under the folder named `agents`.

    <Screenshot
    alt="SigNoz dashboard"
    height={200}
    src="/img/blog/2022/03/opentelemetry_java_jar_agent.webp"
    title="Placed OpenTelemetry Java Jar agent under a folder named agents"
    width={400}
    />
    
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

    <Screenshot
    alt="Code in scripts file"
    height={500}
    src="/img/blog/2022/03/scripts_sh_file.webp"
    title="Code in scripts.sh file"
    width={700}
    />

<Screenshot
    alt="Scripts folder"
    height={500}
    src="/img/blog/2022/03/scripts_folder.webp"
    title="Scritps.sh file under scripts folder"
    width={700}
    />
    
    
    

5. **Run the microservices**<br></br>
   Now you need to run your microservices. Run `users-service`:
   
   ```
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
<!-- <Screenshot
alt="Running user service"
height={500}
src="/img/blog/2022/03/running_user_service.webp"
title="Running user service"
width={700}
/> -->
    


<!-- <Screenshot
alt="Running all microservices"
height={500}
src="/img/blog/2022/03/running_all_microservices.webp"
title="Running all microservices using different tabs in the terminal"
width={700}
/> -->

<Screenshot
alt="Running microservices on different ports using service registry"
height={500}
src="/img/blog/2022/03/eureka_running_all_services.webp"
title="Running microservices on different ports using service registry"
width={700}
/>



6. **Confirm table creation**<br></br>
   After running the services, check if the tables `ORDERS` and `USERS` are created using the commands below:
   
   ```java
   mysql> use signoz;
   mysql> show tables;
   ```

<Screenshot
    alt="Checking creation of tables"
    height={500}
    src="/img/blog/2022/03/confirm_table_creation.webp"
    title="Checking creation of tables after running microservices"
    width={700}
    />
    
    

## Visualizing traces data with SigNoz dashboards

To visualize the traces data with SigNoz, we first need to generate some user data by interacting with the spring boot application.

### Generating user data by interacting with the sample app

You need to generate some user data to see how it appears in the SigNoz dashboard. The sample application comes with an UI to interact with the app. Use the below command in the root folder to launch the UI:

```java
npm install -g serve
serve -l 5000 u
```

<Screenshot
   alt="Running sample app UI"
   height={500}
   src="/img/blog/2022/03/serve_ui_port.webp"
   title="Running sample app UI"
   width={700}
/>

Use the buttons to interact with the app and generate some data. For example, click `Create User` button to create a new user in the MySQL db.

<Screenshot
   alt="Create a new user"
   height={250}
   src="/img/blog/2022/03/create_new_user_java.webp"
   title="Create a new user"
   width={450}
/>

Now go to SigNoz dashboard, you will notice the list of service names that we configured:

- user-service
- order-service
- payment-service

<Screenshot
   alt="Microservices in our Java app being monitored in the SigNoz dashboard"
   height={500}
   src="/img/blog/2022/03/java_microservices_list.webp"
   title="Microservices in our Java app being monitored in the SigNoz dashboard"
   width={700}
/>

You can play around with the dashboard to see what data is captured. Below is a handy guide on how to use the SigNoz dashboard to see the captured data.

## How to use SigNoz dashboard to analyze traces

The traces tab of the SigNoz dashboard provides powerful filters to analyze the traces data. You can use a number of filters to see traces data across many dimensions. For example:

1. **See the count of requests by service and HTTP Status code**

<Screenshot
alt="Count of requests"
height={500}
src="/img/blog/2022/03/java_count_of_requests.webp"
title="Use advanced filters to see count of requests by service and HTTP status code"
width={700}
/>

2. **Run aggregates on your tracing data**<br></br>
   You can run aggregates like avg, max, min, 50th percentile, 90th percentile on your tracing data to get analyze performance issues in your application.
    
<Screenshot
    alt="Run aggregates"
    height={500}
    src="/img/blog/2022/03/run_aggregates.webp"
    title="Run aggregates using the dropdown on your traces data quickly"
    width={700}
    />
    
    
    

3. **Get more granular details by grouping traces data**<br></br>
   You can also see these aggregates in more granular detail by grouping them by service name, operation, HTTP URL, HTTP method, etc.
    
<Screenshot
    alt="Group aggregates"
    height={500}
    src="/img/blog/2022/03/group_aggregates.webp"
    title="Group aggregates across a list of dimensions"
    width={700}
    />
    

4. **Identify latency issues with Flamegraphs and Gantt charts**<br></br>
    
    You can inspect each span in the table with Flamegraphs and Gantt charts to see a complete breakdown of the request. Establishing a sequential flow of the user request along with info on time taken by each part of the request can help identify latency issues quickly. Let’s see how it works in the case of our sample Spring Boot app.

    Go to operation filter on the left navigation and apply two filters `/payment/transfer/id/{id}/amount/{amount}` and service name `payment-service` . Click on the single event listed in the table as shown below:

<Screenshot
alt="Use filters to inspect spans that you want to investigate further"
height={500}
src="/img/blog/2022/03/span_specific_filter.webp"
title="Use filters to inspect spans that you want to investigate further"
width={700}
/>
    
   You will be able to see the Flamegraph of the selected span which shows how the request traveled between the `payment-service` and the `user-service`. You can also use the Gantt chart to analyze each event in detail.
    
<Screenshot
alt="Flamegraphs and Gantt charts"
height={500}
src="/img/blog/2022/03/java_payment_service_traces.webp"
title="Flamegraph and Gantt chart for the selected event showing payment service traces with HTTP semantics"
width={700}
/>


<Screenshot
alt="Database traces"
height={500}
src="/img/blog/2022/03/db_traces.webp"
title="Databases traces which show semantics related to mysql db and query details"
width={700}
/>
    

SigNoz also provides a detailed view of common [semantic conventions](https://github.com/open-telemetry/semantic-conventions) like HTTP, network, and other attributes. The end-to-end tracing of user requests can help you to identify latency issues quickly.
    

## Conclusion

Distributed tracing is a powerful and critical toolkit for developers creating applications based on microservices architecture. For Java Spring  Boot applications based on microservices architecture, distributed tracing can enable a central overview of how requests are performing across microservices.

This lets application owners reconstruct the whole path of the request and see how individual components performed as part of the entire user request.

OpenTelemetry and SigNoz provide a great open-source solution to implement distributed tracing for your applications. You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---
Read more about distributed tracing from SigNoz blog 👇

[Implementing distributed tracing in a nodejs application](https://signoz.io/blog/distributed-tracing-nodejs/)

[Spans - a key concept of distributed tracing](https://signoz.io/blog/distributed-tracing-span/)
