---
title: Set up application monitoring for your Node JS app in 20 mins with open source - SigNoz
slug: nodejs-opensource-application-monitoring
date: 2021-05-24
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: ankit_anand
description: In this article, learn how to setup application monitoring for Node.js apps with our open-source solution, SigNoz.
image: /img/blog/2021/05/nodejs_with_signoz_cover.webp
keywords:
  - SigNoz Product Update
  - Open Source community
  - OSS
  - SigNoz
  - DataDog alternative
---

In this article, learn how to setup application monitoring for Node.js apps with our open-source solution, SigNoz.

<!--truncate-->

![Cover Image](/img/blog/2021/05/nodejs_with_signoz_cover.webp)

Node.js tops the list of most widely used frameworks by developers. Powered by Google's V8 javascript engine, its performance is incredible. Ryan Dahl, the creator of Node.js, wanted to create real-time websites with push capability. On Nov 8, 2009, Node.js was first demonstrated by Dahl at the inaugural European JSconf. Node.js has now become a critical component in the technology stack of large-scale enterprises. But like any technology, it has its own set of limitations.

Node.js is a dynamically typed single-threaded programming language. There is a lot of freedom for the interpreter and runtime to make decisions that can easily lead to memory leaks and high CPU loads. This can lead to performance issues, loss of resources, and potential downtime. Hence, it is crucial to monitor your Node.js apps for app performance metrics.

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

[SigNoz](https://signoz.io/?utm_source=blog&utm_medium=article) is an open-source application monitoring and observability platform which can be installed within your infra. There's no need to go through any sales team or complex onboarding process to start monitoring your application with SigNoz. In this article, let's take a look at how it can be deployed with Docker in a sample Node.js application.

Let's divide this tutorial in 2 parts:

1. Installing SigNoz
2. Creating & setting up a sample Node.js app for monitoring


## Part 1 - Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=opentelemetry_nodejs)

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

<Screenshot
  alt="SigNoz dashboard"
  height={500}
  src="/img/blog/common/signoz_dashboard_homepage.png"
  title="SigNoz dashboard"
  width={700}
/>

<!-- ## Part 1 - Installing SigNoz

1. **Install Docker**<br></br>
   You can install Docker by following the steps listed on their website [here.](https://www.docker.com/get-started) For this tutorial, you can choose the Docker Desktop option based on the system you have.

   ![Getting started with Docker](/img/blog/2021/05/screenzy-1621623948044.webp)

2. **Clone SigNoz GitHub repository**<br></br>
   From your terminal use the following command to clone SigNoz's GitHub repository.

   ```
   git clone -b main https://github.com/SigNoz/signoz.git
   ```

3. **Update path to signoz/deploy and install SigNoz**<br></br>
   The deploy folder contains the files necessary for deploying SigNoz through Docker.

   ```
   cd signoz/deploy/
   ./install.sh
   ```

   You will be asked to select one of the 2 ways to proceed:

   1. ClickHouse as database (default)
   2. Kafka + Druid setup to handle scale (recommended for production use)

Trying out SigNoz with clickhouse database takes less than 1.5GB of memory and for this tutorial, we will use that option.

![Choose setup](/img/blog/2021/06/screenzy-1623086990810.webp)

You will get the following message once the installation is complete.

![Success message](/img/blog/2021/06/screenzy-1623086918860.webp)
Note that this setup is just for demo/testing purposes and you need to proceed with Kafka + Druid set up option in case you want to set up SigNoz for use in production.

Once `./install.sh` runs successfully, the UI should be accessible at port 3301. Wait for 2-3 mins for the data to be available to frontend.

![SigNoz UI](/img/blog/2021/05/screenzy-1621624012520.webp)

The applications shown in the dashboard are from a sample app called Hot R.O.D that comes with the installation bundle. It has 4 microservices being monitored: Frontend, Customer, Driver and Route. You can access the Hot R.O.D application UI at: [http://localhost:9000/](http://localhost:9000/) -->

Now comes the part where you can instrument your own sample app and get the metrics reported through SigNoz.

## Part 2 - Creating & setting up a sample Node.js app for monitoring

To start monitoring your application, you need to set up its instrumentation. Instrumentation is the process of implementing code instructions to monitor your application's performance.

SigNoz supports [OpenTelemetry](https://opentelemetry.io/) as the primary way for users to instrument their application. OpenTelemetry is a single, vendor-agnostic instrumentation library per language with support for both automatic and manual instrumentation. You don't need to worry about instrumentation in this tutorial. OpenTelemetry comes with all currently available [instrumentation](https://github.com/open-telemetry/opentelemetry-js#plugins).

But to see how SigNoz helps you in monitoring an app's performance, we need an app first.

You need to ensure that you have **Node.js version 12 or newer. **You can download the latest version of Node.js [here](https://nodejs.org/en/download/). For the sample application, let's create a basic 'hello world' express.js application.

If you do not want to follow these steps manually, you can directly check out the <a href="https://github.com/SigNoz/sample-nodejs-app" rel="noopener noreferrer nofollow" target="_blank">GitHub repo</a> of the sample application. You can run the app directly after cloning it. Check out the details of running the app from the last step in the set of instructions.

But, it would be better if you follow these steps to understand what's happening.

1. **Make a directory and install express**<br></br>
   Make a directory for your sample app on your machine. Then open up the terminal, navigate to the directory path and install express with the following command:
   ```
   npm i express
   ```
2. **Create index.js**<br></br>
   Create a file called `index.js` in your directory and with any text editor setup your 'Hello World' file with the code below:

   ```jsx
   const express = require('express');

   const app = express();

   app.get('/hello', (req, res) => {
   res.status(200).send('Hello World');
   });

   app.listen(9090);
   ```

3. **Check if your application is working**<br></br>
   Run your application by using the below command at your terminal.

   ```jsx
   node index.js
   ```

   You can check if your app is working by visiting: [http://localhost:9090/hello](http://localhost:9090/hello)

   Once you are finished checking, exit the application by using `Ctrl + C` on your terminal.

4. **Install OpenTelemetry packages**<br></br>
   You will need the following OpenTelemetry packages for this sample application.
   
   ```jsx
   npm install --save @opentelemetry/api
   npm install --save @opentelemetry/sdk-node
   npm install --save @opentelemetry/auto-instrumentations-node
   npm install --save @opentelemetry/exporter-otlp-grpc
   ```

   OpenTelemetry clients have two major components: the SDK and the API. The details of the packages used for the application are as follows:
   - `opentelemetry/api`<br></br>
      Defines data types and operations for generating and correlating tracing, metrics, and logging data. The API is what you use to instrument your code.

   - `opentelemetry/sdk-node`<br></br>
      Provides automated instrumentation and tracing for Node.js applications.

   - `opentelemetry/auto-instrumentations-node`<br></br>
      A meta-package from [opentelemetry-js-contrib](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node) that provides a simple way to initialize multiple Node.js instrumentations.

   - `opentelemetry/exporter-otlp-grpc`<br></br>
      Exports data via gRPC using [OTLP](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/otlp.md) format.

5. **Create `tracing.js` file**<br></br>
   Instantiate tracing by creating a `tracing.js` file and using the below code.

   ```jsx
   // tracing.js
   'use strict'
   const process = require('process');
   const opentelemetry = require('@opentelemetry/sdk-node');
   const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-grpc');
   // configure the SDK to export telemetry data to the console
   // enable all auto-instrumentations from the meta package
   const traceExporter = new OTLPTraceExporter();
   const sdk = new opentelemetry.NodeSDK({
     traceExporter,
     instrumentations: [getNodeAutoInstrumentations()]
     });
     
     // initialize the SDK and register with the OpenTelemetry API
     // this enables the API to record telemetry
     sdk.start()
     .then(() => console.log('Tracing initialized'))
     .catch((error) => console.log('Error initializing tracing', error));
     
     // gracefully shut down the SDK on process exit
     process.on('SIGTERM', () => {
       sdk.shutdown()
       .then(() => console.log('Tracing terminated'))
       .catch((error) => console.log('Error terminating tracing', error))
       .finally(() => process.exit(0));
       });
  ```

6. **Run the sample application with OpenTelemetry and send data to SigNoz**<br></br>
   Once the file is created, you only need to run one last command at your terminal, which passes the necessary environment variables. Here, you also set SigNoz as your backend analysis tool.

   ```jsx
   OTEL_EXPORTER_OTLP_ENDPOINT="<IP of SigNoz>:4317" \
   OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> \
   node -r ./tracing.js index.js
   ```

   Replacing the placeholders in the above command for local host:

   `IP of SigNoz Backend`: localhost (since we are running SigNoz on our local host)

   `service_name` : node_app (you can give whatever name that suits you)

   So the final command is:

   ```jsx
   OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" \
   OTEL_RESOURCE_ATTRIBUTES=service.name=node_app \
   node -r ./tracing.js index.js
   ```

   You can check your application running at [http://localhost:9090/hello](http://localhost:9090/hello). You need to generate some load in order to see data reported on SigNoz dashboard. Refresh the endpoint for 10-20 times, and wait for 2-3 mins.

And, congratulations! You have instrumented your sample Node.js app. You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301/) to monitor your app for performance metrics.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Sample nodejs app in the applications monitored"
  height={500}
  src="/img/blog/2022/01/node_sample_app.webp"
  title="Node app in the list of applications monitored"
  width={700}
/>

## Identifying events causing high latency in your app

Now that you have installed SigNoz, let's see how you can identify specific events causing high latency in your deployed applications.

In just 5 easy steps, our dashboard lets you drill down to events causing a delay in your deployed apps 👇

1. Choose your microservice
2. Choose the timestamp where latency is high
3. Click on view traces
4. Choose the trace ID with the highest latency
5. Zero in on the highest latency event and take action

Here's a glimpse of how you can drill down and identify specific issues:

If you need any help with trying out SigNoz, feel free to mail me at ankit.anand@signoz.io.

Check out our [documentation](https://signoz.io/docs/install/docker) for more installation guides and troubleshooting instructions.

They say, "If it's not monitored, then it's not in production." And with SigNoz you can start monitoring your Node.js applications now. Enabling your team to resolve issues quickly in production is critical to maintaining complex distributed systems in fine health.

At SigNoz, we are committed to making the best open-source, self-hosted tool for application performance monitoring. Feel free to check out our GitHub repo here:

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)
