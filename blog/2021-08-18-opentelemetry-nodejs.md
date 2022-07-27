---
title: Monitor your Nodejs application with OpenTelemetry and SigNoz
slug: opentelemetry-nodejs
date: 2021-08-18
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: ankit_anand
description: In this article, learn how to setup application monitoring for Node.js apps with OpenTelemetry and SigNoz.
image: /img/blog/2021/08/opentelemetry_nodejs.webp
keywords:
  - opentelemetry
  - opentelemetry javascript
  - opentelemetry nodejs
  - distributed tracing
  - observability
  - nodejs monitoring
  - nodejs instrumentation
  - signoz
---

<head>
  <link rel="canonical" href="https://signoz.io/opentelemetry/nodejs/"/>
</head>

OpenTelemetry can auto-instrument many common modules for a Javascript application. The telemetry data captured can then be sent to SigNoz for analysis and visualization.

<!--truncate-->

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Monitor your Nodejs applications with SigNoz"
  height={500}
  src="/img/blog/common/signoz_charts_application_metrics.webp"
  width={700}
/>
OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). For any distributed system based on microservice architecture, it's an operational challenge to solve performance issues quickly.

Telemetry data helps engineering teams to troubleshoot issues across services and identify the root causes. In other words, telemetry data powers observability for your distributed applications.

Steps to get started with OpenTelemetry for a Nodejs application:

- Installing SigNoz
- Installing sample Nodejs app
- Set up OpenTelemetry and send data to SigNoz

## Installing SigNoz

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
  src="/img/blog/common/signoz_dashboard_homepage.webp"
  title="SigNoz dashboard"
  width={700}
/>


## Creating sample Nodejs application

You need to ensure that you have **Node.js version 12 or newer**. You can download the latest version of Node.js [here](https://nodejs.org/en/download/). For the sample application, let's create a basic 'hello world' express.js application.

If you do not want to follow these steps manually, you can directly check out the <a href="https://github.com/SigNoz/sample-nodejs-app" rel="noopener noreferrer nofollow" target="_blank">GitHub repo</a> of the sample application. You can run the app directly after cloning it. Check out the details of running the app from the last step in the set of instructions.

But, it would be better if you follow these steps to understand what's happening.

Check if node is installed on your machine by using the below command:

```jsx
node -v
```

Steps to get the app set up and running:

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

## Set up OpenTelemetry and send data to SigNoz

<!-- 1. In the same directory path at the terminal, install the OpenTelemetry launcher package with this command:

   ```
   npm install lightstep-opentelemetry-launcher-node
   ```

   The OpenTelemetry launcher makes getting started with OpenTelemetry easier by reducing configuration boilerplate.

2. To use OpenTelemetry, you need to start the OpenTelemetry SDK before loading your application. By initializing OpenTelemetry first, we enable OpenTelemetry to apply available instrumentation and auto-detect packages before the application starts to run. To do that, go to your directory and create a new file named, "server_init.js". This will act as the new entry point for your app. Paste the following code in the file:

   ```
   const {
    lightstep,
    opentelemetry,
   } = require('lightstep-opentelemetry-launcher-node');

   const sdk = lightstep.configureOpenTelemetry();

   sdk.start().then(() => {
    require('./server');
   });

   function shutdown() {
    sdk.shutdown().then(
      () => console.log("SDK shut down successfully"),
      (err) => console.log("Error shutting down SDK", err),
    ).finally(() => process.exit(0))
   };

   process.on('exit', shutdown);
   process.on('SIGINT', shutdown);
   process.on('SIGTERM', shutdown);
   ```

3. Once the file is created, you only need to run one last command at your terminal, which passes the necessary environment variables. Here, you also set SigNoz as your backend analysis tool.

   ```
   OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="http://<IP of SigNoz Backend>:55681/v1/trace" OTEL_METRICS_EXPORTER=none LS_SERVICE_NAME=<service name> node server_init.js
   ```

   Replacing the placeholders in the above command for local host:

   `IP of SigNoz Backend`: localhost (since we are running SigNoz on our local host)

   `service name` : sample_app (you can give whatever name that suits you)

   So the final command is:

   ```
   OTEL_EXPORTER_OTLP_SPAN_ENDPOINT="http://localhost:55681/v1/trace" OTEL_METRICS_EXPORTER=none LS_SERVICE_NAME=sample_app node server_init.js
   ```

And, congratulations! You have instrumented your sample Node.js app. You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301) to monitor your app for performance metrics. -->

1. **Install OpenTelemetry packages**<br></br>
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


2. **Create `tracing.js` file**<br></br>
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

3. **Run the sample application with OpenTelemetry and send data to SigNoz**<br></br>
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

And, congratulations! You have instrumented your sample Node.js app. You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301) to monitor your app for performance metrics.


<Screenshot
  alt="Sample nodejs app in the applications monitored"
  height={500}
  src="/img/blog/2022/01/node_sample_app.webp"
  title="Sample_app in the list of applications monitored"
  width={700}
/>

## Metrics and Traces of the Nodejs application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<Screenshot
  alt="Sample nodejs app in the applications monitored"
  height={500}
  src="/img/blog/common/signoz_charts_application_metrics.webp"
  title="Measure things like application latency, requests per sec, error percentage and see your top endpoints"
  width={700}
/>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<Screenshot
      alt="See traces, and apply powerful filters on trace data"
      height={500}
      src="/img/blog/common/signoz_list_of_traces_hc.webp"
      title="View of traces at a particular timestamp"
      width={700}
/>

You can use flamegraphs to exactly identify the issue causing the latency.

<Screenshot
      alt="Flamegraphs for distributed tracing"
      height={500}
      src="/img/blog/common/signoz_flamegraphs.webp"
      title="Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing"
      width={700}
/>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Nodejs application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇<br></br>

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you face any issues while trying out SigNoz, feel free to write to us at: support@signoz.io

If you want to read more about SigNoz 👇<br></br>

[Golang Application Performance Monitoring with SigNoz](https://signoz.io/blog/monitoring-your-go-application-with-signoz/)
