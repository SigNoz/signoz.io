---
title: OpenTelemetry Setup in a Nodejs Application
slug: nodejs
date: 2023-11-20
tags: [javascript-monitoring]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: In this article, learn how to setup application monitoring for Node.js apps with OpenTelemetry and SigNoz.
image: /img/blog/2023/11/opentelemetry-nodejs-cover-min.jpg
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

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/opentelemetry-nodejs-cover.webp" alt="Monitor your Nodejs applications with SigNoz"/>
</figure>

<br></br>


OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). For any distributed system based on microservice architecture, it's an operational challenge to solve performance issues quickly.

Telemetry data helps engineering teams to troubleshoot issues across services and identify the root causes. In other words, telemetry data powers observability for your distributed applications.

Steps to get started with OpenTelemetry for a Nodejs application:

- Installing SigNoz
- Creating sample Nodejs app
- Set up OpenTelemetry and send data to SigNoz

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

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt="SigNoz Dashboard"/>
    <figcaption><i>SigNoz dashboard</i></figcaption>
</figure>

<br></br>

## Creating sample Nodejs application

You need to ensure that you have **Node.js version 12 or newer**. You can download the latest version of Node.js [here](https://nodejs.org/en/download/). For the sample application, let's create a basic 'hello world' express.js application.

If you do not want to follow these steps manually, you can directly check out the <a href="https://github.com/SigNoz/sample-nodejs-app" rel="noopener noreferrer nofollow" target="_blank">GitHub repo</a> of the sample application. You can run the app directly after cloning it and start sending data to SigNoz. The code is already instrumented with OpenTelemetry libraries.

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
   const express = require("express");
   const cors = require('cors')
   const PORT = process.env.PORT || "5555";
   const app = express();
   
   app.use(cors());
   app.use(express.json())
   
   app.all("/", (req, res) => {
    res.json({ method: req.method, message: "Hello World", ...req.body });
    });
    
    app.get('/404', (req, res) => {
    res.sendStatus(404);
    })
    
    app.listen(parseInt(PORT, 10), () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
    })
   ```

3. **Check if your application is working**<br></br>
   Run your application by using the below command at your terminal.

   ```jsx
   node index.js
   ```

   You can check if your app is working by visiting: [http://localhost:5555/](http://localhost:5555/)

   Once you are finished checking, exit the application by using `Ctrl + C` on your terminal.

## Set up OpenTelemetry and send data to SigNoz

1. **Install OpenTelemetry packages**<br></br>
   You will need the following OpenTelemetry packages for this sample application.
   
   ```jsx
   npm install --save @opentelemetry/sdk-node
   npm install --save @opentelemetry/auto-instrumentations-node
   npm install --save @opentelemetry/exporter-trace-otlp-http
   ```

   The dependencies included are briefly explained below:<br></br>

    `@opentelemetry/sdk-node` - This package provides the full OpenTelemetry SDK for Node.js including tracing and metrics.<br></br>
    
    `@opentelemetry/auto-instrumentations-node` - This module provides a simple way to initialize multiple Node instrumentations.<br></br>
    
    `@opentelemetry/exporter-trace-otlp-http` - This module provides the exporter to be used with OTLP (`http/json`) compatible receivers.<br></br>


2. **Create `tracing.js` file**<br></br>
   Instantiate tracing by creating a `tracing.js` file and using the below code.

   ```jsx
   // tracing.js
   'use strict'
   const process = require('process');
   const opentelemetry = require('@opentelemetry/sdk-node');
   const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
   const { Resource } = require('@opentelemetry/resources');
   const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
   
   const exporterOptions = {
      url: 'http://localhost:4318/v1/traces'
      }
      
   const traceExporter = new OTLPTraceExporter(exporterOptions);
   const sdk = new opentelemetry.NodeSDK({
      traceExporter,
      instrumentations: [getNodeAutoInstrumentations()],
      resource: new Resource({
         [SemanticResourceAttributes.SERVICE_NAME]: 'node_app'
         })
   });
   
   // initialize the SDK and register with the OpenTelemetry API
   // this enables the API to record telemetry
   
   sdk.start()
   
   // gracefully shut down the SDK on process exit
   process.on('SIGTERM', () => {
      sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
    });
   
   ```
   
   OpenTelemetry Node SDK currently does not detect the `OTEL_RESOURCE_ATTRIBUTES` from `.env` files as of today. That’s why we need to include the variables in the `tracing.js` file itself.

   About environment variables:

   `service_name`: name of the service you want to monitor

   `environment`: dev, prod, staging, etc.

   `http://localhost:4318/v1/traces` is the default url for sending your tracing data. We are assuming you have installed SigNoz on your `localhost`. Based on your environment, you can update it accordingly. It should be in the following format:
      
   `http://<IP of SigNoz backend>:4318/v1/traces`

   :::note
   Remember to allow incoming requests to port 4318 of machine where SigNoz backend is hosted.
   :::

3. **Run your application**<br></br>
   Now when you run your application, OpenTelemetry captures telemetry data from it and send it to SigNoz.

   ```jsx
   node -r ./tracing.js index.js
   ```

   You can check your application running at [http://localhost:5555/](http://localhost:5555/). You need to generate some load in order to see data reported on SigNoz dashboard. Refresh the endpoint for 10-20 times, and wait for 2-3 mins.

And, congratulations! You have instrumented your sample Node.js app. You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301) to monitor your app for performance metrics.

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/01/node_sample_app.webp" alt="Sample nodejs app in the applications monitored"/>
    <figcaption><i>Sample_app in the list of applications monitored</i></figcaption>
</figure>

<br></br>

## Metrics, Traces and Logs of the Nodejs application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="Sample nodejs app in the applications monitored"/>
    <figcaption><i>Measure things like application latency, requests per sec, error percentage and see your top endpoints</i></figcaption>
</figure>

<br></br>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_list_of_traces_hc.webp" alt="See traces, and apply powerful filters on trace data"/>
    <figcaption><i>View of traces at a particular timestamp</i></figcaption>
</figure>

<br></br>

You can use flamegraphs to exactly identify the issue causing the latency.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Flamegraphs for distributed tracing"/>
    <figcaption><i>Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing</i></figcaption>
</figure>

<br></br>

You can also use SigNoz for log management. For Nodejs applications, you can use the [winston logger](https://signoz.io/blog/winston-logger/) to send logs to SigNoz.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Logs management in SigNoz"/>
    <figcaption><i>Logs management in SigNoz</i></figcaption>
</figure>

<br></br>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Nodejs application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇<br></br>

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you face any issues while trying out SigNoz, feel free to write to us at: support@signoz.io

If you want to read more about SigNoz 👇<br></br>

[Golang Application Performance Monitoring with SigNoz](https://signoz.io/blog/monitoring-your-go-application-with-signoz/)
