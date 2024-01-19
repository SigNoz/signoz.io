---
title: Monitoring your Express application using OpenTelemetry
slug: opentelemetry-express
date: 2023-10-18
tags: [OpenTelemetry Instrumentation, JavaScript]
authors: ankit_anand
description: OpenTelemetry is a vendor-agnostic isntrumentation library. In this article, learn how to set up monitoring for an Express application using OpenTelemetry.
image: /img/blog/2021/11/monitor_express_cover.webp
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry javascript
  - opentelemetry express
  - distributed tracing
  - observability
  - express monitoring
  - express instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

import VersionPin from '../docs/shared/nodejs-version-pin.md'

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-express/"/>
</head>

Nodejs is a popular Javascript runtime environment that executes Javascript code outside of a web browser. Express is the most popular web frameworks that sits on top of Nodejs and adds functionalities like middleware, routing, etc. to Nodejs.

<!--truncate-->

![Cover Image](/img/blog/2021/11/monitor_express_cover.webp)

You can monitor your express application using OpenTelemetry and a tracing backend of your choice. OpenTelemetry is the leading open-source standard under the Cloud Native Computing Foundation that aims to standardize the process of instrumentation across multiple languages.
 
In this article, we will be using [SigNoz](https://signoz.io/) to store and visualize the telemetry data collected by OpenTelemetry from a sample Expressjs application.

## Running an Express application with OpenTelemetry

OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces).

### Install SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="SigNoz dashboard home"
    height={500}
    src="/img/blog/common/signoz_dashboard_homepage.webp"
    title="List of applications shown as an example on SigNoz dashboard"
    width={700}
/>

### Creating a sample express application

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

      <VersionPin />


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

<Screenshot
    alt="Express app in the list of applications"
    height={500}
    src="/img/blog/2021/11/express_list_apps.webp"
    title="Express app in the list of applications"
    width={700}
/>


SigNoz is open-source, and a full-stack APM. It comes with charts of RED metrics and a seamless transition from metrics to traces.

## Open-source tool to visualize telemetry data
SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<Screenshot
    alt="SigNoz charts and metrics"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    title="Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz."
    width={700}
/>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<Screenshot
    alt="List of traces on SigNoz dashboard"
    height={500}
    src="/img/blog/common/signoz_list_of_traces_hc.webp"
    title="View of traces at a particular timestamp"
    width={700}
/>

You can use flamegraphs to exactly identify the issue causing the latency.

<Screenshot
    alt="Flamegraphs used to visualize spans of distributed tracing in SigNoz UI"
    height={500}
    src="/img/blog/common/signoz_flamegraphs.webp"
    title="View of traces at a particular timestamp"
    width={700}
/>

You can also build custom metrics dashboard for your infrastructure.

<Screenshot
    alt="Custom metrics dashboard"
    height={500}
    src="/img/blog/common/signoz_custom_dashboard-min.webp"
    title="You can also build a custom metrics dashboard for your infrastructure"
    width={700}
/>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Express application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="AKu1rlP6j_w" mute={false} />

<p>&nbsp;</p>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - full guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)





