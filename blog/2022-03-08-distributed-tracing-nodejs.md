---
title: Implementing Distributed Tracing in a Nodejs application
slug: distributed-tracing-nodejs
date: 2022-10-10
tags: [OpenTelemetry Instrumentation, JavaScript, Distributed Tracing]
authors: [selva]
description: Distributed tracing provides insights into how a particular service is performing as part of the whole in a distributed system. In this article, we will implement distributed tracing for a nodejs application based on microservices architecture.
image: /img/blog/2022/02/distributed_tracing_nodejs.webp
hide_table_of_contents: false
keywords:
  - distributed tracing
  - nodejs
  - opentelemetry
  - opentelemetry nodejs
  - traces
  - open source
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/distributed-tracing-nodejs/"/>
</head>

In this article, we will implement distributed tracing for a nodejs application based on microservices architecture. To implement distributed tracing, we will be using open-source solutions - SigNoz and OpenTelemetry, so you can easily follow the tutorial.

<!--truncate-->

![Cover Image](/img/blog/2022/02/distributed_tracing_nodejs.webp)

In modern microservices-based applications, it is difficult to understand how requests are performing across multiple services, infrastructure, and protocols. As companies began moving to distributed systems, they realized they needed a way to track requests in their entirety for debugging applications. Distributed tracing is a technology that was born out of this need.
Let’s have a brief overview of distributed tracing.

## What is distributed tracing?

In a microservices architecture, a user request travels through hundreds, even thousands of services before serving the user what they need. Engineering teams often responsible for maintaining single services have no visibility over how the system performs as a whole.

[Read our complete guide on Distributed Tracing](http://signoz.io/distributed-tracing/)

Distributed tracing gives insights into how a particular service is performing as part of the whole in a distributed software system. It involves passing a trace context with each user request which is then passed across hosts, services, and protocols to track the user request.

In this article, we will use OpenTelemetry and SigNoz to enable distributed tracing in a sample nodejs application.

## OpenTelemetry and SigNoz

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is a vendor-agnostic set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

OpenTelemetry provides the instrumentation layer to generate and export your telemetry data to a backend. Then, you need to choose a backend tool that will provide the data storage and visualization for your telemetry data. That’s where SigNoz comes into the picture.

[SigNoz](https://signoz.io/) is a full-stack open-source APM tool that provides metrics monitoring and distributed tracing.

We will demonstrate implementing distributed tracing in a nodejs application in two sections:

- Running a sample nodejs application with OpenTelemetry
- Visualizing traces data with SigNoz dashboards

## Running a sample nodejs application with OpenTelemetry

The sample nodejs application will have three microservices:

- user-service
- orders-service
- payment-service



Here’s the architecture of the sample application along with OpenTelemetry and SigNoz.

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="Sample nodejs app application architecture"
   height={500}
   src="/img/blog/2022/02/nodejs_app_flow.webp"
   title="Application architecture along with SigNoz and OpenTelemetry(OTel Collector)"
   width={700}
/>

### Pre-requisites

- Node JS 14 or newer<br></br>
Download the [latest version](https://nodejs.org/en/download/).
- MySql 8
- SigNoz

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

Once installation is complete, run the below commands to create a database for our sample nodejs app.

```jsx
➜  ~ mysql -u root
mysql> create database signoz;
mysql> use signoz;
```
If you have MySQL already installed and is configured with a password, you might need to update the password in the sample app [here](https://github.com/SigNoz/distributed-tracing-nodejs-sample/blob/d34e63d3bf6c996c020a58a05d84a39132934e5d/src/model/index.ts#L6).

### Running sample application

Below are the steps to run the sample nodejs application with OpenTelemetry:

1. **Clone sample nodejs app repository and go to the root folder**<br></br>
   We will be using a sample nodejs app at this [GitHub repo](https://github.com/SigNoz/distributed-tracing-nodejs-sample).
    
    ```jsx
    git clone git@github.com:SigNoz/distributed-tracing-nodejs-sample.git
    cd distributed-tracing-nodejs-sample
    ```
    

2. **Install the required dependencies**<br></br>
   You can check out the depencies required from `package.json` file. Install all the required dependencies for the sample application using `npm`. Also, install typescript and ts-node-dev globally.
   
   ```jsx
   npm install
   npm install -g typescript
   npm install -g ts-node-dev
   ```
   
   OpenTelemetry needs the following packages to instrument the nodejs app.
   
   `@opentelemetry/sdk-node` - This package provides the full OpenTelemetry SDK for Node.js including tracing and metrics.<br></br>
   
   `@opentelemetry/auto-instrumentations-node` - This module provides a simple way to initialize multiple Node instrumentations.<br></br>
   
   `@opentelemetry/exporter-trace-otlp-http` - This module provides the exporter to be used with OTLP (`http/json`) compatible receivers.<br></br>


    

3. **`tracer.ts` file**<br></br>
   In order to instrument our services, we will create a single `tracer.ts` file and use it to instrument all three services.
   
   We need to initialize OpenTelemetry before our application gets loaded. If your application begins requiring packages before OpenTelemetry is set up, it can create issues. You can initialize OpenTelemetry by using the code as shown below:
   
   ```jsx
   import init from './tracer'
   const { sdk } = init('order-service') // provide service name to view in signoz dashboard
   ```
   
   You can check out the code sample [here](https://github.com/SigNoz/distributed-tracing-nodejs-sample/blob/main/src/tracer.ts).
    
4. **Setting up SigNoz as the OpenTelemetry backend**<br></br>
   We have set up environment variables required by OpenTelemetry in the `scripts` section of `package.json`.
   To set up OpenTelemetry to collect and export telemetry data, you need to specify OTLP (OpenTelemetry Protocol) endpoint. It consists of the IP of the machine where SigNoz is installed and the port number at which SigNoz listens.
   
   OTLP endpoint for SigNoz - `<IP of the machine>:4318`

   Here's the `scripts` section to run the microservices:
   ```jsx
   "scripts": {
    "payment": "OTEL_EXPORTER_OTLP_ENDPOINT=127.0.0.1:4318 OTEL_RESOURCE_ATTRIBUTES=service.name=PaymentService ts-node-dev -r ./src/tracer.ts ./src/payment-service.ts",
    "users": "OTEL_EXPORTER_OTLP_ENDPOINT=127.0.0.1:4318 OTEL_RESOURCE_ATTRIBUTES=service.name=UserService ts-node-dev -r ./src/tracer.ts ./src/user-service.ts",
    "orders": "OTEL_EXPORTER_OTLP_ENDPOINT=127.0.0.1:4318 OTEL_RESOURCE_ATTRIBUTES=service.name=OrderService ts-node-dev -r ./src/tracer.ts ./src/order-service.ts"
    },
    ...
    ```
   You can check the file [here](https://github.com/SigNoz/distributed-tracing-nodejs-sample/blob/main/package.json).
   
   If you have installed SigNoz on your local machine, then your endpoint is `127.0.0.1:4318`.

   If you have installed SigNoz on some domain, then your endpoint is `http://test.com:4318`
   
    
3. **Run the microservices**<br></br>
   From the root folder of your application on your terminal, run each microservice. 
   
   ```bash
   npm run users
   npm run payment
   npm run orders
   ```
   
   Ensure that the microservices are running on different ports. As earlier mentioned, you can set ports using the
   `.env` file. Your microservices ports are setup in the `.env` file as shown below:
   
   ```jsx
   ORDER_PORT=8082
   USERS_PORT=8081
   PAYMENT_PORT=8080
   ```
   You can check the [file](https://github.com/SigNoz/distributed-tracing-nodejs-sample/blob/main/.env) in the cloned repo.

   <Screenshot
   alt="Screenshot of terminal showing mircroservices running on different ports"
   height={500}
   src="/img/blog/2022/02/running_microservices.webp"
   title="Running microservices on different ports"
   width={700}
   />
    
4. **Confirm table creation**<br></br>
   After running the services, check if the tables `ORDERS` and `USERS` are created using the commands below:
   
   ```jsx
   mysql> use signoz;
   mysql> show tables;
   ```

   <Screenshot
   alt="Checking creation of tables"
   height={500}
   src="/img/blog/2022/02/mysql_show_tables.webp"
   title="Checking creation of tables after running microservices"
   width={700}
   />
    

## Visualizing traces data with SigNoz dashboards

To visualize the traces data with SigNoz, we first need to generate some user data by interacting with the sample nodejs application.

### Generating user data by interacting with the sample app

You need to generate some user data to see how it appears in the SigNoz dashboard. The sample application comes with an UI to interact with the app. Use the below command in the root folder to launch the UI:

```jsx
npm install -g serve
serve -l 5000 ui
```
This will run the app UI on port 5000. Open the UI at [http://localhost:5000/](http://localhost:5000/).

<Screenshot
   alt="Running sample app UI"
   height={500}
   src="/img/blog/2022/03/serve_ui_port.webp"
   title="Running sample app UI"
   width={700}
/>

1. **Create a new user**<br></br>
   Click `Create User` button to create a new user in the MySQL db.

   <Screenshot
   alt="Create new user"
   height={400}
   src="/img/blog/2022/03/create_user.webp"
   title="Create new user"
   width={600}
   />

2. **Transfer some amount**<br></br>
   Transfer some amount by clicking `Transfer Fund` button.

   <Screenshot
   alt="Transfer some fund"
   height={400}
   src="/img/blog/2022/03/transfer_fund.webp"
   title="Transfer some fund"
   width={600}
   />

3. **Place an order**<br></br>
   Place an order by selecting a product from dropdown.
   
   <Screenshot
   alt="Place an order"
   height={400}
   src="/img/blog/2022/03/place_order.webp"
   title="Place an order"
   width={600}
   />




<!-- 1. **Create a new user**<br></br>
   Call the below endpoint to create a new user in the MySQL db with autogenerated id. Make a note of the id.
   
   ```jsx
   curl --location --request POST 'localhost:8081/user/create' \
   --header 'Content-Type: application/json' \
   --data-raw '{
    	"USER_NAME": "Abishek",
    	"ACCOUNT": "ABC12345"
        }'
    ```
    
    This will create a user in our `users` table. Make a note of the ID as you will need it for further API calls.
    
  <Screenshot
   alt="ID of the user"
   height={500}
   src="/img/blog/2022/02/users_table_id.webp"
   width={700}
   />
    
2. **Transfer some amount**<br></br>
   Transfer some amount by calling the below API. The `param id` is the `userid` that was generated from the previous service.
   
   ```jsx
   curl --location --request GET 'localhost:8080/payment/transfer/id/2?amount=5000'
   ```
    
3. **Place an order**<br></br>
   Place an order using below API:
   
   ```jsx
   curl --location --request POST 'localhost:8082/order/create' \
   --header 'Content-Type: application/json' \
   --data-raw '{
       "USER_ID":2,
       "PRODUCT_NAME":"Mac Mini",
       "PRICE":"1299"
       }'
    ``` -->

Now go to SigNoz dashboard, wait for sometime and refresh the dashboard. You will notice the list of service names that we configured:

- user-service
- order-service
- payment-service

<Screenshot
   alt="Sample app microservices monitored on the SigNoz dashboard"
   height={500}
   src="/img/blog/2022/02/nodejs_microservices_on_signoz.webp"
   title="Microservices in our nodejs app being monitored in the SigNoz dashboard"
   width={700}
/>


You can play around with the dashboard to see what data is captured. Below is a handy guide on how to use the SigNoz dashboard to see the captured data.

### Capturing MySQL traces
To view MySQL traces add below opentelemetry package:

```jsx
npm install @opentelemetry/instrumentation-mysql2
```

Now, make the following changes in your `tracer.ts` file:

```jsx
const { MySQL2Instrumentation } = require('@opentelemetry/instrumentation-mysql2')

.....
const sdk = new opentelemetry.NodeSDK({
    traceExporter,
    instrumentations: [
			getNodeAutoInstrumentations(), 
      new MySQL2Instrumentation()
	 ],
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  })
.....
```

Restart the microservices, and generate new usage data in order to see traces related to MySQL events.


## How to use SigNoz dashboard to analyze traces

The traces tab of SigNoz dashboard provides powerful filters to analyze the traces data. You can use a number of filters to see traces data across many dimensions.

1. **See the count of requests by service and HTTP Status code**

<Screenshot
   alt="Count of requests in traces filter tab"
   height={500}
   src="/img/blog/2022/02/nodejs_count_of_requests.webp"
   title="Count of requests by service and HTTP status code"
   width={700}
/>


2. **Identify latency issues with Flamegraphs and Gantt charts**<br></br>
   You can inspect each event in the table with flamegraphs and Gantt charts to see a complete breakdown of the request. Establishing a sequential flow of the user request along with info on time taken by each part of the request can help identify latency issues quickly. Let’s see how it works in case of our sample nodejs app.
   
   Go to operation filter on the left navigation apply two filters `GET /payment/transfer/:id` and service name `payment-service` . Click on the single event listed in the table as shown below:

   <Screenshot
   alt="Events table in traces filter tab"
   height={500}
   src="/img/blog/2022/02/distributed_tracing_nodejs_traces_filter_tab.webp"
   title="Use filters to inspect events that you want to investigate further."
   width={700}
   />
   
   You will be able to see the flamegraph of the selected event which shows how the request traveled between the `payment` and the `user-service`. You can also use the Gantt chart to analyze each event in detail.
   

   <Screenshot
   alt="Flamegraph and Gantt chart for the selected event"
   height={500}
   src="/img/blog/2022/02/flamegraphs_gantt_charts.webp"
   title="Flamegraph and Gantt chart for the selected event"
   width={700}
   />
   
   SigNoz also provides a detailed view of common <a href = "https://github.com/open-telemetry/semantic-conventions" rel="noopener noreferrer nofollow" target="_blank" >semantic conventions</a> like HTTP, network, and other attributes.
   
   The end-to-end tracing of user requests can help you to identify latency issues quickly.

## Conclusion

Distributed tracing is a powerful and critical toolkit for developers creating applications based on microservices architecture. For nodejs applications based on microservices architecture, distributed tracing can enable a central overview of how requests are performing across services which is needed for quick debugging.

OpenTelemetry and SigNoz provide a great open-source combo to implement distributed tracing for your nodejs applications. You can check out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="CgByZJeuRZY" mute={false} />

<p>&nbsp;</p>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---
Read more about distributed tracing from SigNoz blog 👇

[Spans - a key concept of distributed tracing](https://signoz.io/blog/distributed-tracing-span/)

[Context Propagation in distributed tracing](https://signoz.io/blog/context-propagation-in-distributed-tracing/)
